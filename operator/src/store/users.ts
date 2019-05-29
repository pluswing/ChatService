import { User } from '@/models/User';
import { DefineMutations, DefineGetters } from 'vuex-type-helper';
import { Message } from '@/models/Message';

export interface UsersState {
    users: User[];
}


export interface UsersGetters {
    users: User[];
}

export interface UsersMutations {
    add: {
        user: User,
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
        return s.users.map((u) => {
            const m = new Message(u.message.body);
            m.id = u.message.id;
            m.uid = u.uid;
            m.operatorId = u.message.operatorId;
            m.createdAt = u.message.createdAt;
            return new User(u.id, u.uid, m);
        });
    },
};

const mutations: DefineMutations<UsersMutations, UsersState> = {
    add(s, { user }) {
        const already = s.users.find((u) => u.uid === user.uid);
        if (already) {
            // すでにいる場合
            already.message = user.message;
        } else {
            // いな場合は、追加する
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

