import { createRouter, createWebHistory } from 'vue-router';

import UserManagement from '@/views/UserManagement.vue';
import Settings from '@/views/SettingsVue.vue';
import HomeView from '@/views/HomeView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/users', name: 'Users', component: UserManagement },
  { path: '/settings', name: 'Settings', component: Settings },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
