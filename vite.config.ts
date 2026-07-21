import {resolve} from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: "https://hughnguyen82.github.io/msalsample/",

  build : {
    rolldownOptions : {
      input : {
        main : resolve(import.meta.dirname, 'index.html'),
        redirect : resolve(import.meta.dirname, 'redirect.html'),
      },
    },
  },
})


