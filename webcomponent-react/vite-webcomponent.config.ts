// Use vite-config.ts for Development!
// This config is used when building a web-component bundle

import {resolve} from "node:path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {}
  },
  base: "http://localhost:5000/",
  build: {
    rollupOptions: {
    },
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/webcomponent.tsx"),
      formats: [
        "es"
      ],
    },
    target: "modules",
    sourcemap: true
  },
})
