/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

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
            eslintrc: {
                enabled: true,
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true,
            },
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
            '@': '/src',
        },
    },
    build: {
        cssCodeSplit: true, // 启用 CSS 代码分割
        minify: true,       // 启用代码压缩
        sourcemap: true,    // 生成 sourcemap 文件，方便调试
        chunkSizeWarningLimit: 1000, // 设置 chunk 大小警告限制（单位：KB）
    },
    test: {
        globals: true, // 启用全局测试函数，如 describe、it 等
        environment: 'jsdom', // 设置测试环境为 jsdom
        coverage: {
            provider: 'v8', // 使用 V8 引擎进行代码覆盖率收集
            all: true,      // 收集所有文件的覆盖率
            enabled: true,  // 启用代码覆盖率
            reporter: ['lcov', 'html'], // 生成 lcov 和 html 格式的报告
            extension: ['.vue'], // 包括 .vue 文件的覆盖率
        },
        include: ['**/test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], // 指定测试文件的匹配模式
        exclude: ['**/node_modules/**', '**/dist/**'], // 排除不需要测试的文件
        passWithNoTests: true, // 如果没有测试文件，仍然通过
        outputFile: './coverage/junit.xml', // 生成的测试报告文件路径
    },
});