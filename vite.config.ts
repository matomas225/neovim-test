import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/neovim-test',
  css: {
    postcss: './postcss.config.cjs',
  }
})
