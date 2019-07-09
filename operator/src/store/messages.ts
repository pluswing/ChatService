import { MessageConverter } from '@/converter/MessageConverter';
import { Message } from '@/models/Message';
import { DefineGetters, DefineMutations } from 'vuex-type-helper';

export interface StoreMessage {
  id: number;
  body: string;
  uid: string;
  createdAt: Date;
  operatorId?: number;
}

export interface MessagesState {
  messages: StoreMessage[];
}

export interface MessagesGetters {
  messages: Message[];
}

export interface MessagesMutations {
  add: {
    message: StoreMessage;
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
    return s.messages.map((m) => MessageConverter.convertMessage(m));
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
