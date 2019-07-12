import Vue from 'vue';
import Router from 'vue-router';
import Activities from './views/Activities.vue';
import Chat from './views/Chat.vue';
import Login from './views/Login.vue';
import Users from './views/Users.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Users,
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
    },
    {
      path: '/activities',
      name: 'activities',
      component: Activities,
    },
    {
      path: '/chat/:uid',
      name: 'chat',
      component: Chat,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        nonAuth: true,
      },
    },
  ],
});
