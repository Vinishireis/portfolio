import { useEffect, useState } from "react";

const CACHE_KEY = "tech-news-cache-v1";
const CACHE_TTL = 1000 * 60 * 30; // 30 min, o servidor já faz cache; aqui só evita refetch a cada visita

const readCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { savedAt, data } = JSON.parse(raw);
    if (Date.now() - savedAt > CACHE_TTL) return null;
    return data;
  } catch {
    return null;
  }
};

const writeCache = (data) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    /* armazenamento indisponível (modo privado etc.), segue sem cache */
  }
};

/**
 * Notícias de IA, tecnologia, desenvolvimento, web e mobile vindas da GNews
 * através da rota /api/news (a chave da API fica só no servidor).
 */
export function useTechNews() {
  const [data, setData] = useState(() => readCache());
  const [status, setStatus] = useState(data ? "success" : "loading");

  useEffect(() => {
    // O estado inicial já vem do cache; só busca na API se não houver cache válido
    if (readCache()) return;

    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch("/api/news", { signal: controller.signal });
        if (!res.ok) throw new Error(`News API: ${res.status}`);
        const json = await res.json();

        if (!json.articles?.length) throw new Error("News API: sem notícias");
        if (!json.partial) writeCache(json);
        setData(json);
        setStatus("success");
      } catch (err) {
        if (err.name !== "AbortError") setStatus("error");
      }
    })();

    return () => controller.abort();
  }, []);

  return {
    topics: data?.topics ?? [],
    articles: data?.articles ?? [],
    updatedAt: data?.updatedAt,
    status,
  };
}
