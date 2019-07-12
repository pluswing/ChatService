import Buefy from 'buefy';
import * as Cookies from 'js-cookie';
import * as uuid from 'uuid/v4';
import Vue from 'vue';

import App from './components/App.vue';

const init = (target: string) => {

  let uid = Cookies.get('pwcs_uid');
  if (!uid) {
    uid = uuid();
    Cookies.set('pwcs_uid', uid, { path: '', expires: 365 });
  }

  Vue.use(Buefy);
  // tslint:disable-next-line:no-unused-expression
  new Vue({
    components: {
      App,
    },
    el: target,
      template: `<App uid="${uid}" />`,
  });
};

export {
  init,
};
