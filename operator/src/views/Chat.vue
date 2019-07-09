<template>
  <v-layout style="padding:10;px;">
    <ChatHistory :messages="messages" />
    <ChatInputForm @send="send" />
  </v-layout>
</template>

<script lang="ts">
import ChatHistory from '@/components/chat/ChatHistory.vue';
import ChatInputForm from '@/components/chat/ChatInputForm.vue';
import Header from '@/components/common/Header.vue';
import { Message } from '@/models/Message';
import { MessageApi } from '@/repositories/MessageApi';
import { MessageHistoriesUsecase } from '@/usecases/MessageHistoriesUsecase';
import { Component, Vue } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
import { MessageConverter } from '../converter/MessageConverter';
import { UserConverter } from '../converter/UserConverter';
import { User } from '../models/User';
import { initApi } from '../repositories/api';
import socket from '../socket/socket';
import { StoreOperator } from '../store/operator';
import { StoreUser } from '../store/users';
import { SendMessageUsecase } from '../usecases/SendMessageUsecase';

@Component({
  components: {
    ChatHistory,
    ChatInputForm,
    Header,
  },
})
export default class Chat extends Vue {
  @Mutation('users/clearBadge') public clearBadge!: (payload: { uid: string }) => void;

  public messages: Message[] = [];
  private uid: string = '';
  private sendChat = new SendMessageUsecase(new MessageApi());

  public async created() {
    this.uid = this.$route.params.uid;

    this.clearBadge({ uid: this.uid });

    this.initSocket();

    await this.loadMessages();
  }

  public async send(input: string) {
    const m = new Message(input);
    m.uid = this.$route.params.uid;
    await this.sendChat.execute(m);
  }

  public destroyed() {
    socket.setOnMessageCustom((event) => { });
  }

  private async loadMessages() {
    this.messages = await new MessageHistoriesUsecase(new MessageApi()).execute(this.uid);
    this.sendChat.onNewMessage = (m: Message) => {
      this.messages.push(m);
    };
  }

  private initSocket() {
    socket.setOnMessageCustom((event) => {
      const message = MessageConverter.convertMessage(event.data);
      if (this.uid === message.uid) {
        this.messages.push(message);
      }
    });
  }
}

</script>
