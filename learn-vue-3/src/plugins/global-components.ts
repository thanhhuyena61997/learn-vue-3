import type { App } from 'vue';
import BaseIcon from '@/components/BaseIcon/index.vue';

const registerComponents = (app: App<Element>): void => {
  app.component('SBaseIcon', BaseIcon);
};

export default registerComponents;
