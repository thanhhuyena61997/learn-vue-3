import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/styles/styles.scss';
import i18n from './locales/i18n.js';

// style antd
import './assets/styles/ant-design/theme.less';
import { registerAntDesignComponents } from './utils/register-antd-components';
import { registerGlobalComponents } from './utils/import-layout';
import registerComponents from './plugins/global-components';
import router from './router';
import { createPinia } from 'pinia';
// import { registerAntDesignComponents } from './utils/register-antd-components';

const app = createApp(App);
// store
const pinia = createPinia();

registerAntDesignComponents(app);

registerGlobalComponents(app);

registerComponents(app);

app.use(router).use(i18n).use(pinia).mount('#app');

export { app };
