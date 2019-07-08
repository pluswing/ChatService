import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store/index';

import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  iconfont: 'fa',
});

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
