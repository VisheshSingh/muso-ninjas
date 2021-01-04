import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/auth/Signup.vue';
import Login from '../views/auth/Login.vue';
import CreatePlaylist from '../views/playlist/CreatePlaylist.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/playlist/create',
    name: 'CreatePlaylist',
    component: CreatePlaylist,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
