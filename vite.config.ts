import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
    plugins: [svelte()],
    build: {
        minify: false,
        lib: {
            entry: './src/lib/index.ts',
            name: 'index',
            fileName: 'index'
        },
        rollupOptions: {
            external: [
                './app'
            ]
        }
    }
})

