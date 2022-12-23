import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/pages/Home.vue'),
    name: 'home-index',
    meta: {
      layout: 'default'
    }
  },
  {
    path: '/about',
    component: () => import('@/pages/About.vue'),
    name: 'about-index',
    meta: {
      layout: 'default'
    }
  },
  {
    path: '/responsive',
    component: () => import('@/pages/Responsive.vue'),
    name: 'responsive-index',
    meta: {
      layout: 'default'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
