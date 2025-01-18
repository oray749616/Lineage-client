import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ArcoResolver} from 'unplugin-vue-components/resolvers'

export default defineConfig({
    plugins: [
        vue(),
        // 配置 unplugin-auto-import
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'pinia',
            ],
            dts: 'src/auto-imports.d.ts',
        }),
        // 配置 unplugin-vue-components
        Components({
            dts: 'src/components.d.ts',
            resolvers: [
                ArcoResolver(),
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': '/src,'
        },
    },
    build: {
        cssCodeSplit: true, // 启用 CSS 代码分割
        minify: true,   // 启用代码压缩
    }
})
