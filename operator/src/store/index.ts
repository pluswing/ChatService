import Vue from 'vue';
import * as Vuex from 'vuex';
import { operator } from './operator';
import { users } from './users';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        operator,
        users,
    },
    plugins: [createPersistedState()],
});
