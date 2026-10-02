import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import newsHandler from "./api/news.js";

// Serve /api/news no `npm run dev` e no `npm run preview` com o mesmo handler
// da função serverless da Vercel
const newsApi = () => ({
  name: "news-api",
  configureServer(server) {
    server.middlewares.use("/api/news", newsHandler);
  },
  configurePreviewServer(server) {
    server.middlewares.use("/api/news", newsHandler);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // GNEWS_API_KEY não tem prefixo VITE_ de propósito: fica só no servidor.
  // Na Vercel ela vem das Environment Variables; localmente, do .env.
  process.env.GNEWS_API_KEY ??= loadEnv(mode, process.cwd(), "").GNEWS_API_KEY;

  return {
    plugins: [react(), tailwindcss(), newsApi()],
    base: "/",
    server: {
      host: "0.0.0.0",
      port: 5173,
    },
  };
});
