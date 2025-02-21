import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue')
    },
    {
      path: '/works',
      name: 'Works',
      component: () => import('../views/Works.vue'), 
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/Contact.vue'), 
    },
  ],
});

export default router;
