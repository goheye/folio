import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// 纯静态 SPA：React + Tailwind v4，开发端口沿用 3000
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: { plugins: [tailwindcss()] },
  },
  server: { port: 3000 },
});
