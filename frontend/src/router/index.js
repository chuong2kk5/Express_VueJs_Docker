import { createRouter, createWebHistory } from 'vue-router';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

// Views - User
import HomePage from '@/views/HomePage.vue';
import ProductList from '@/views/ProductList.vue';
import AboutPage from '@/views/AboutPage.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

// Views - Admin
import AdminDashboard from '@/layouts/AdminLayout.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: HomePage },
      { path: 'products', name: 'Products', component: ProductList },
      { path: 'about', name: 'About', component: AboutPage },
      { path: 'login', name: 'Login', component: Login },
      { path: 'register', name: 'Register', component: Register },
    ],
  },
{
  path: '/admin',
  component: () => import('@/layouts/AdminLayout.vue'),
  children: [
    { path: 'dashboard', component: () => import('@/views/admin/Dashboard.vue') },
    { path: 'users', component: () => import('@/views/admin/Users.vue') },
    { path: 'products', component: () => import('@/views/admin/Products.vue') },
    { path: 'orders', component: () => import('@/views/admin/Orders.vue') },
  ]
},

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
