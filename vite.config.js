import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: mode === 'v2' ? './dist/dupla12' : './dist'
    }
  }
});