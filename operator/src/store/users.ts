import { MessageConverter } from '@/converter/MessageConverter';
import { UserConverter } from '@/converter/UserConverter';
import { Message } from '@/models/Message';
import { User } from '@/models/User';
import { DefineGetters, DefineMutations } from 'vuex-type-helper';

export interface StoreMessage {
  id: number;
  body: string;
  uid: string;
  createdAt: Date;
  operatorId?: number;
}

export interface StoreUser {
  id: number;
  uid: string;
  message: StoreMessage;
  badge: number;
}

export interface UsersState {
  users: StoreUser[];
  messages: StoreMessage[];
}

export interface UsersGetters {
  users: User[];
  messages: Message[];
}

export interface UsersMutations {
  add: {
    user: StoreUser;
    ignoreBadgeCount: boolean;
  };
  clear: {};
  clearBadge: {
    uid: string;
  };
  clearMessage: {};
  addMessage: {
    message: StoreMessage;
  };
}

/*
export interface OperatorActions {
}
*/

const state: UsersState = {
  users: [],
  messages: [],
};

const getters: DefineGetters<UsersGetters, UsersState> = {
  users(s): User[] {
    return s.users.map((u) => {
      const m = MessageConverter.convertMessage(u.message);
      const user = UserConverter.convertUser(u, m);
      user.badge = u.badge;
      return user;
    });
  },
  messages(s): Message[] {
    return s.messages.map((m) => {
      return MessageConverter.convertMessage(m);
    });
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
  clearMessage(s) {
    s.messages = [];
  },
  addMessage(s, { message }) {
    s.messages.unshift(message);
    s.messages = s.messages.slice(0, 100);
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
