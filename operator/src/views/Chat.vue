<template>
  <v-content>
    <Header />
    <div class="headline" style="text-align:left;margin:10px;">{{ uid }}'s Messages</div>
    <ChatHistory :messages="messages" />
    <ChatInputForm @send="send" />
  </v-content>
</template>

<script lang="ts">
import ChatHistory from '@/components/chat/ChatHistory.vue';
import ChatInputForm from '@/components/chat/ChatInputForm.vue';
import Header from '@/components/common/Header.vue';
import { IMessage, Message } from '@/models/Message';
import { ChatApi } from '@/repositories/ChatApi';
import GetMessages from '@/usecases/GetMessages';
import { SendChat } from '@/usecases/SendChat';
import { Component, Vue } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
import { IUser, User } from '../models/User';
import { initApi } from '../repositories/api';
import socket from '../socket/socket';
import { OperatorState } from '../store/operator';

const sendChat = new SendChat(new ChatApi());

@Component({
  components: {
    ChatHistory,
    ChatInputForm,
    Header,
  },
})
export default class Chat extends Vue {
  @State('operator') public operator!: OperatorState;
  @Mutation('users/add') public addUser!: (payload: { user: IUser, ignoreBadgeCount: boolean }) => void;
  @Mutation('messages/add') public addMessage!: (payload: { message: IMessage }) => void;
  @Mutation('users/clearBadge') public clearBadge!: (payload: { uid: string }) => void;

  public messages: Message[] = [];
  public getmessages = new GetMessages(new ChatApi());
  private uid: string = '';

  public async created() {
    initApi(this.operator.token);
    this.uid = this.$route.params.uid;

    this.clearBadge({ uid: this.uid });

    this.initSocket();

    await this.loadMessages();
  }

  public async send(input: string) {
    const m = new Message(input);
    m.uid = this.$route.params.uid;
    await sendChat.post(m, this.operator.token);
  }

  private async loadMessages() {
    this.messages = await this.getmessages.handle(this.uid, this.operator.token);
    sendChat.onNewMessage = (m: Message) => {
      this.messages.push(m);
    };
  }

  private initSocket() {
    socket.connect(this.operator.token, () => {
      socket.setOnMessage((event) => {
        const data = JSON.parse(event.data);
        if (data.method === 'post') {

          const message = Message.from(data);
          if (this.uid === message.uid) {
            this.messages.push(message);
          }

          this.addMessage({ message });

          const user = new User(data.userId, data.uid, message);
          user.badge = 1;
          this.addUser({ user, ignoreBadgeCount: false });
        }
      });
    });
  }
}
</script>
