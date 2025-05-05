// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    proxy: {
      // Forward all /api/* calls to your Flask backend
      "/api": {
        // If you’re running via Docker Compose, use the service name:
        target: "http://backend:5000",
        // If you’re running Flask locally instead, use:
        // target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path,
      },
      "/file": {
        target: "http://backend:5000",
        changeOrigin: true,
        rewrite: path => path,
      },
    },
  },
});
