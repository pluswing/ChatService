import * as Vuex from 'vuex';
import { DefineGetters, DefineMutations, DefineActions } from 'vuex-type-helper';

export interface OperatorState {
    id: number;
    name: string;
    loginId: string;
    token: string;
}

export interface OperatorGetters {
    isLoggedIn: {};
}

export interface OperatorMutations {
    loggedIn: {
        id: number,
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
    id: 0,
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
    loggedIn(s, { id, name, loginId, token }) {
        s.id = id;
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

