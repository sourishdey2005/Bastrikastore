import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
// Reload triggered at: 2026-02-17T19:48:00
export default defineConfig({
    plugins: [react()],
    base: '/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true
    }
})
