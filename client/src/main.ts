import Vue from 'vue';
import Buefy from 'buefy';

import App from './components/App.vue';

const init = (target: string) => {
    Vue.use(Buefy);
    new Vue({
        el: target,
        template:'<App/>',
        components: {
            App,
        },
    });
};

export {
    init,
};
