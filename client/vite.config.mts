import react from "@vitejs/plugin-react";
import path from "path";
import Unfonts from "unplugin-fonts/vite";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    Unfonts({
      google: {
        families: [
          {
            name: "PT Mono",
            defer: false // Browser issue with windows and mobile
          },
          {
            name: "Bebas Neue",
            defer: false // Browser issue with windows and mobile
          }
        ]
      }
    })
  ],

  build: {
    target: "esnext",
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    outDir: "./dist",
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/")
    }
  },
  server: {
    port: Number(process.env.PORT) || 3000
  }
});
