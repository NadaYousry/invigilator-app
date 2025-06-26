import { fileURLToPath } from "url";
import * as path from "path";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import tailwindcss from "@tailwindcss/vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default defineConfig({
  plugins: [plugin(), svgr(), mkcert(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@interceptors": path.resolve(__dirname, "src/interceptors"),
      "@store": path.resolve(__dirname, "src/store"),
      "@appTypes": path.resolve(__dirname, "src/appTypes"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@layout": path.resolve(__dirname, "src/layout"),
      "@network": path.resolve(__dirname, "src/network"),
    },
  },
  server: {
    cors: true,
    proxy: {
      // Proxy requests starting with /api to your json-server
      "/api": {
        target: "http://localhost:3001", // Your json-server URL
        changeOrigin: true, // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove /api prefix when forwarding
      },
    },
    port: 3000,
    watch: {
      ignored: ["**/db.json"], // 👈 Ignore db.json changes
    },
  },
});
