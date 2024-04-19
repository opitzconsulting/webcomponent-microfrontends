// Use vite-config.ts for Development!
// This config is used when building a web-component bundle

import {resolve} from "node:path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    "process.env": {}
  },
  base: "http://localhost:5002/",
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/webcomponent.ts"),
      formats: [
        "es"
      ],
      fileName: "webcomponent"
    },
    target: "modules",
    sourcemap: true
  },
})
