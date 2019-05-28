import { User } from '@/models/User';
import { DefineMutations } from 'vuex-type-helper';

export interface UsersState {
    users: User[];
}

/*
export interface UsersGetters {
}
*/

export interface UsersMutations {
    add: User;
}

/*
export interface OperatorActions {
}
*/

const state: UsersState = {
    users: [],
};

/*
const getters: DefineGetters<UsersGetters, UsersState> = {
};
*/

const mutations: DefineMutations<UsersMutations, UsersState> = {
    add(s, user) {
        const already = s.users.find((u) => u.uid === user.uid);
        if (already) {
            // すでにいる場合
            already.message = user.message;
        } else {
            // いな場合は、追加する
            s.users.push(user);
        }
    },
};

/*
const actions: DefineActions<OperatorActions, OperatorState, OperatorMutations, OperatorGetters> = {
};
*/

export const users = {
    namespaced: true,
    state,
    // getters,
    mutations,
    // actions,
};

