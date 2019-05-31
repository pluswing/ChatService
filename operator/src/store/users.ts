import { IUser, User } from '@/models/User';
import { DefineMutations, DefineGetters } from 'vuex-type-helper';

export interface UsersState {
    users: IUser[];
}


export interface UsersGetters {
    users: IUser[];
}

export interface UsersMutations {
    add: {
        user: IUser,
    };
    clear: {};
}

/*
export interface OperatorActions {
}
*/

const state: UsersState = {
    users: [],
};


const getters: DefineGetters<UsersGetters, UsersState> = {
    users(s): User[] {
        return s.users.map((u) => User.from(u));
    },
};

const mutations: DefineMutations<UsersMutations, UsersState> = {
    add(s, { user }) {
        const already = s.users.find((u) => u.uid === user.uid);
        if (already) {
            // すでにいる場合
            already.message = user.message;
            already.badge = already.badge + 1;
        } else {
            // いない場合は、追加する
            s.users.push(user);
        }
    },
    clear(s) {
        s.users = [];
    },
};

/*
const actions: DefineActions<OperatorActions, OperatorState, OperatorMutations, OperatorGetters> = {
};
*/

export const users = {
    namespaced: true,
    state,
    getters,
    mutations,
    // actions,
};

