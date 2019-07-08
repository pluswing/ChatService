import { IMessage, Message } from '@/models/Message';
import { DefineGetters, DefineMutations } from 'vuex-type-helper';

export interface MessagesState {
  messages: IMessage[];
}

export interface MessagesGetters {
  messages: IMessage[];
}

export interface MessagesMutations {
  add: {
    message: IMessage;
  };
  clear: {};
}

/*
export interface OperatorActions {
}
*/

const state: MessagesState = {
  messages: [],
};

const getters: DefineGetters<MessagesGetters, MessagesState> = {
  messages(s): Message[] {
    return s.messages.map((m) => Message.from(m));
  },
};

const mutations: DefineMutations<MessagesMutations, MessagesState> = {
  add(s, { message }) {
    s.messages.unshift(message);
  },
  clear(s) {
    s.messages = [];
  },
};

/*
const actions: DefineActions<OperatorActions, OperatorState, OperatorMutations, OperatorGetters> = {
};
*/

export const messages = {
  namespaced: true,
  state,
  getters,
  mutations,
  // actions,
};
