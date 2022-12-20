import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import svgLoader from 'vite-svg-loader';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'component'
    }),
    vueI18n({
      include: path.resolve(__dirname, './path/to/src/locales/**'),
      compositionOnly: false
    })
  ],

  server: {
    port: 3000,
    watch: {
      usePolling: true
    }
  },

  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: /^~/, replacement: '' }
    ]
  },

  build: {
    /** If you set esmExternals to true, this plugins assumes that 
      all external dependencies are ES modules */

    commonjsOptions: {
      esmExternals: true
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
