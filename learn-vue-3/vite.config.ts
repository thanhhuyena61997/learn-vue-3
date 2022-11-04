import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  server: {
    port: 3000,
    watch: {
      usePolling: true
    }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  css: {
    preprocessorOptions: {
      // scss: {
      //   additionalData: '@import "./src/assets/styles/styles.scss";'
      // },
      less: {
        javascriptEnabled: true,
        additionalData: '@import "./src/assets/styles/ant-design/theme.less";'
      }
    }
  }
});
