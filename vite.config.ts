import * as path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://whatsgram2-0-back.onrender.com",
        changeOrigin: true, // Ensures correct Host header is sent to the API server
      },
    },
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173, // Use Render's PORT environment variable
    host: "0.0.0.0", // Listen on all network interfaces (required by Render)
  },
});
