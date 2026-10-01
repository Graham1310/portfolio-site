import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 47321,
    strictPort: true,
  },
  preview: {
    port: 47322,
    strictPort: true,
  },
  build: {
    sourcemap: false,
    outDir: "dist",
  },
})
