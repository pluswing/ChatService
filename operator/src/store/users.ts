import { IUser, User } from '@/models/User';
import { DefineGetters, DefineMutations } from 'vuex-type-helper';

export interface UsersState {
  users: IUser[];
}

export interface UsersGetters {
  users: IUser[];
}

export interface UsersMutations {
  add: {
    user: IUser;
    ignoreBadgeCount: boolean;
  };
  clear: {};
  clearBadge: {
    uid: string;
  };
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
  add(s, { user, ignoreBadgeCount }) {
    const already = s.users.find((u) => u.uid === user.uid);
    if (already) {
      // すでにいる場合
      already.message = user.message;
      if (!ignoreBadgeCount) {
        already.badge = already.badge + 1;
      }
    } else {
      // いない場合は、追加する
      s.users.push(user);
    }
  },
  clear(s) {
    s.users = [];
  },
  clearBadge(s, { uid }) {
    const user = s.users.find((u) => u.uid === uid);
    if (user) {
      user.badge = 0;
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
  getters,
  mutations,
  // actions,
};
