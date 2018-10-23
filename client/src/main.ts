import Vue from 'vue';
import Buefy from 'buefy';
import * as uuid from 'uuid/v4';
import * as Cookies from 'js-cookie';

import App from './components/App.vue';

const init = (target: string) => {

    let uid = Cookies.get('pwcs_uid');
    if (!uid) {
        uid = uuid();
        Cookies.set('pwcs_uid', uid, { path: '', expires: 365 });
    }

    Vue.use(Buefy);
    new Vue({
        el: target,
        template:`<App uid="${uid}" />`,
        components: {
            App,
        },
    });
};

export {
    init,
};
