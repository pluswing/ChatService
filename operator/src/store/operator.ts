import * as Vuex from 'vuex';
import { DefineGetters, DefineMutations, DefineActions } from 'vuex-type-helper';

export interface OperatorState {
    name: string;
    loginId: string;
    token: string;
}

export interface OperatorGetters {
    isLoggedIn: {};
}

export interface OperatorMutations {
    loggedIn: {
        name: string,
        loginId: string,
        token: string,
    };
}

/*
export interface OperatorActions {
}
*/

const state: OperatorState = {
    name: '',
    loginId: '',
    token: '',
};

const getters: DefineGetters<OperatorGetters, OperatorState> = {
    isLoggedIn(s): boolean {
        return s.token !== '';
    },
};

const mutations: DefineMutations<OperatorMutations, OperatorState> = {
    loggedIn(s, { name, loginId, token }) {
        s.name = name;
        s.loginId = loginId;
        s.token = token;
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

