import { App, defineAsyncComponent } from 'vue';

export function registerGlobalComponents(app: App<Element>) {
  app.component(
    'auth-layout',
    defineAsyncComponent(() => import('@/layouts/auth.vue'))
  );
  app.component(
    'default-layout',
    defineAsyncComponent(() => import('@/layouts/default.vue'))
  );
}
