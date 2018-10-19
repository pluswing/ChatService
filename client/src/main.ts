import Vue from 'vue';
import App from './components/App.vue';

const init = (target: string) => {
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
