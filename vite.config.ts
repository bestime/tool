import { fileURLToPath, URL } from 'node:url';
import path from 'path';
// @ts-ignore
import rollupPluginHtmlTemplate from './build-utils/rollup-plugin-html-template.cjs';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import dayjs from 'dayjs';
import dts from 'vite-plugin-dts'

// 变量存放目录
const envDir = 'env';

// 路径转换
function resolve(relativePath: string) {
  return path.resolve(__dirname, relativePath);
}

// https://vitejs.dev/config/
export default defineConfig(function ({ mode }) {
  const env = loadEnv(mode, resolve(envDir));
  console.log('环境变量', resolve(envDir), env);

  return {
    server: {
      host: '0.0.0.0',
      strictPort: true,
      open: false,
      port: 1842
    },
    envDir,
    base: env.VITE_ROUTER_BASE,
    plugins: [
      rollupPluginHtmlTemplate({
        author: 'bestime',
        buildTimestamp: +new Date(),
        buildDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }),
      vue(),
      dts({
        outDir: 'dist/types',
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      target: 'modules',
      copyPublicDir: false,
      lib: {
        formats: ['es'],
        entry: './src/packages/index.ts',
        fileName: 'index.esm'
        
      },
      rollupOptions: {
        external: ['vue', '@bestime/utils_base', '@bestime/utils_browser', 'lodash-es', 'echarts'],
        output: {
          globals: {
            vue: 'Vue',
            jUtilsBase: '@bestime/utils_browser',
            jUtilsBrowser: '@bestime/utils_browser',
          }
        }
      },
    },
  };
});
