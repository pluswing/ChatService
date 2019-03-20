import Vue from 'vue';
import * as Vuex from 'vuex';
import { operator } from './operator';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        operator,
    },
    plugins: [createPersistedState()],
});
