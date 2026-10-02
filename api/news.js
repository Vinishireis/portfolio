import { getTechNews } from "./_gnews.js";

// GET /api/news — função serverless na Vercel; em dev/preview o Vite serve a
// mesma rota (ver vite.config.js). Usa só a API nativa do Node (statusCode,
// setHeader, end) para funcionar igual nos dois ambientes.
export default async function handler(_req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  try {
    const data = await getTechNews(process.env.GNEWS_API_KEY);
    // O CDN da Vercel segura a resposta por 3h (10 min se veio parcial) e
    // continua servindo a versão antiga enquanto revalida em segundo plano
    const maxAge = data.partial ? 600 : 10800;
    res.setHeader(
      "Cache-Control",
      `public, s-maxage=${maxAge}, stale-while-revalidate=86400`
    );
    res.statusCode = 200;
    res.end(JSON.stringify(data));
  } catch (err) {
    console.error("[api/news]", err.message);
    res.setHeader("Cache-Control", "no-store");
    res.statusCode = 502;
    res.end(JSON.stringify({ error: "Não foi possível carregar as notícias agora." }));
  }
}
