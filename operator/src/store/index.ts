import Vue from 'vue';
import * as Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { operator } from './operator';
import { users } from './users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    operator,
    users,
  },
  plugins: [createPersistedState()],
});
