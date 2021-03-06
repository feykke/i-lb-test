import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, './src/index.js'),
            name: 'ILbTest',
            fileName: 'dist'
        },
        minify: 'esbuild',
        sourcemap: true
    }
})