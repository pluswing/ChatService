import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.nonAuth)) {
    // ログインが不要
    next();
  } else {
    // 必要
    if (store.getters['operator/isLoggedIn']) {
      // ログイン済み
      next();
    } else {
      next({ name: 'login' });
    }
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
