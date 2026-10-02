// Integração com a GNews (https://docs.gnews.io). Roda só no servidor: a chave
// nunca vai para o bundle do navegador — e o plano gratuito nem permite CORS
// fora de localhost, então chamar a API direto do front quebraria em produção.
// Arquivos com "_" na pasta api/ não viram rota na Vercel.

const SEARCH_URL = "https://gnews.io/api/v4/search";
const MAX_PER_TOPIC = 10; // máximo do plano gratuito
const REQUEST_GAP_MS = 1200; // o plano gratuito devolve 429 para requisições coladas
const CACHE_TTL_MS = 1000 * 60 * 60 * 3; // 3h — cada atualização gasta 5 das 100 req/dia

// Consultas calibradas contra resultados reais: termos ambíguos em português
// ("navegador", "programação", "celular", "IA" solto) trazem velejador, grade
// de TV e notícia policial, por isso ficaram de fora.
export const TOPICS = [
  {
    id: "ia",
    label: "IA",
    country: "br",
    q: '"inteligência artificial" OR "IA generativa" OR "agentes de IA" OR "modelos de IA" OR ChatGPT OR OpenAI OR LLM',
  },
  {
    id: "tecnologia",
    label: "Tecnologia",
    country: "br",
    q: '"big techs" OR Nvidia OR semicondutores OR "computação em nuvem" OR cibersegurança OR "computação quântica" OR startups OR "vazamento de dados"',
  },
  {
    id: "desenvolvimento",
    label: "Desenvolvimento",
    country: "br",
    q: 'programadores OR "desenvolvimento de software" OR "linguagem de programação" OR GitHub OR "código aberto" OR Python OR "engenharia de software" OR (desenvolvedores AND software)',
  },
  {
    // Sem filtro de país: só com veículos do Brasil sobram poucas notícias de web
    id: "web",
    label: "Web",
    q: 'Chrome OR Firefox OR "navegador web" OR "desenvolvimento web" OR JavaScript OR WebAssembly OR "front-end" OR "criação de sites"',
  },
  {
    id: "mobile",
    label: "Mobile",
    country: "br",
    q: '(Android OR iOS OR iPhone OR smartphone OR "React Native" OR Flutter OR "App Store" OR "Play Store") AND NOT promoção AND NOT oferta AND NOT seleção',
  },
];

// Posts de "achadinhos" (promoções da Amazon etc.) que escapam das consultas
const DEALS_RE = /promoç|em oferta|cupo[mn]|black friday|selecionamos|seleção (de|com)/i;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const titleKey = (title) => title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();

async function searchTopic(topic, apiKey, retried = false) {
  const params = new URLSearchParams({
    q: topic.q,
    lang: "pt",
    max: String(MAX_PER_TOPIC),
    sortby: "publishedAt",
    apikey: apiKey,
  });
  if (topic.country) params.set("country", topic.country);

  const res = await fetch(`${SEARCH_URL}?${params}`);
  if (res.status === 429 && !retried) {
    // Espera as demais requisições escalonadas saírem antes de tentar de novo
    await sleep(REQUEST_GAP_MS * TOPICS.length);
    return searchTopic(topic, apiKey, true);
  }

  const body = await res.json().catch(() => ({}));
  // A mensagem de erro nunca inclui a URL, que carrega a chave
  if (!res.ok) throw new Error(`GNews ${res.status} (${topic.id}): ${body.errors?.join(" ") ?? ""}`);
  return body.articles ?? [];
}

async function fetchAllTopics(apiKey) {
  // Dispara as consultas escalonadas para respeitar o limite por segundo
  const results = await Promise.allSettled(
    TOPICS.map((topic, i) => sleep(i * REQUEST_GAP_MS).then(() => searchTopic(topic, apiKey)))
  );

  const byTitle = new Map();
  const failed = [];

  results.forEach((result, i) => {
    const topicId = TOPICS[i].id;
    if (result.status === "rejected") {
      failed.push(topicId);
      console.error("[gnews]", result.reason.message);
      return;
    }

    for (const a of result.value) {
      if (!a.title || !a.url || DEALS_RE.test(a.title)) continue;

      // A mesma matéria pode vir em mais de um tópico (ou duplicada na fonte):
      // mantém uma só e acumula os tópicos
      const key = titleKey(a.title);
      const existing = byTitle.get(key);
      if (existing) {
        if (!existing.topics.includes(topicId)) existing.topics.push(topicId);
        continue;
      }

      byTitle.set(key, {
        id: a.id ?? a.url,
        title: a.title,
        description: a.description,
        url: a.url,
        image: a.image,
        publishedAt: a.publishedAt,
        source: a.source?.name ?? "GNews",
        topics: [topicId],
      });
    }
  });

  if (failed.length === TOPICS.length) {
    throw new Error("Nenhuma consulta à GNews teve sucesso.");
  }

  const articles = [...byTitle.values()].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );

  return {
    topics: TOPICS.map(({ id, label }) => ({ id, label })),
    articles,
    partial: failed.length > 0,
    updatedAt: new Date().toISOString(),
  };
}

let cache = null; // { savedAt, data }
let inFlight = null;

/**
 * Notícias de IA, tecnologia, desenvolvimento, web e mobile, já deduplicadas.
 * Cache em memória + deduplicação de chamadas simultâneas (o StrictMode do
 * React dispara o fetch duas vezes em dev), para não queimar a cota diária.
 */
export async function getTechNews(apiKey) {
  if (!apiKey) throw new Error("GNEWS_API_KEY não configurada.");

  if (cache && Date.now() - cache.savedAt < CACHE_TTL_MS) return cache.data;
  if (inFlight) return inFlight;

  inFlight = fetchAllTopics(apiKey)
    .then((data) => {
      // Resultado parcial não fica em cache: a próxima visita tenta completar
      if (!data.partial) cache = { savedAt: Date.now(), data };
      return data;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}
