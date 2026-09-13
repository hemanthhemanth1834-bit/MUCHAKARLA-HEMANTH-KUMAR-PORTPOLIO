import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Required for GitHub Pages project-site deployment:
  // the site is served from /MUCHAKARLA-HEMANTH-KUMAR-PORTPOLIO/
  base: '/MUCHAKARLA-HEMANTH-KUMAR-PORTPOLIO/',
  plugins: [react()],
})
