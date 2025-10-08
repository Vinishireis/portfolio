import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/vinishireis",
  server: {
    host: "0.0.0.0", // permite acesso externo (qualquer IP da rede)
    port: 5173,      // você pode mudar a porta se precisar
  },
});
