import { DefineGetters, DefineMutations } from 'vuex-type-helper';

export interface StoreOperator {
  id: number;
  name: string;
  loginId: string;
  token: string;
}

export interface OperatorGetters {
  isLoggedIn: {};
}

export interface OperatorMutations {
  loggedIn: StoreOperator;
  logout: {};
}

/*
export interface OperatorActions {
}
*/

const state: StoreOperator = {
  id: 0,
  name: '',
  loginId: '',
  token: '',
};

const getters: DefineGetters<OperatorGetters, StoreOperator> = {
  isLoggedIn(s): boolean {
    return s.token !== '';
  },
};

const mutations: DefineMutations<OperatorMutations, StoreOperator> = {
  loggedIn(s, { id, name, loginId, token }) {
    s.id = id;
    s.name = name;
    s.loginId = loginId;
    s.token = token;
  },
  logout(s) {
    s.id = 0;
    s.name = '';
    s.loginId = '';
    s.token = '';
  },
};

/*
const actions: DefineActions<OperatorActions, OperatorState, OperatorMutations, OperatorGetters> = {
};
*/

export const operator = {
  namespaced: true,
  state,
  getters,
  mutations,
  // actions,
};
