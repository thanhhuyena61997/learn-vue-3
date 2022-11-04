import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/styles/styles.scss';

// style antd
import './assets/styles/ant-design/theme.less';
// import { registerAntDesignComponents } from './utils/register-antd-components';

createApp(App).mount('#app');
