<template>
  <v-container>
    <ChatHistory :messages="messages"/>
    <ChatInputForm @send="send"/>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChatHistory from '@/components/chat/ChatHistory.vue';
import ChatInputForm from '@/components/chat/ChatInputForm.vue';
import { Message, IMessage } from '@/models/Message';
import { SendChat } from '@/usecases/SendChat';
import { ChatApi } from '@/repositories/ChatApi';
import { State, Mutation } from 'vuex-class';
import { OperatorState } from '../store/operator';
import GetMessages from '@/usecases/GetMessages';
import socket from '../socket/socket';
import { User, IUser } from '../models/User';

const sendChat = new SendChat(new ChatApi());

@Component({
  components: {
    ChatHistory,
    ChatInputForm,
  },
})
export default class Chat extends Vue {
  @State('operator') public operator!: OperatorState;
  @Mutation('users/add') public addUser!: (payload: { user: IUser, ignoreBadgeCount: boolean }) => void;
  @Mutation('messages/add') public addMessage!: (payload: { message: IMessage }) => void;
  @Mutation('users/clearBadge') public clearBadge!: (payload: { uid: string }) => void;

  public messages: Message[] = [];
  public getmessages = new GetMessages(new ChatApi());

  public async created() {
    const uid = this.$route.params.uid;

    this.clearBadge({ uid });

    this.messages = await this.getmessages.handle(uid, this.operator.token);

    sendChat.onNewMessage = (m: Message) => {
      this.messages.push(m);
    };

    socket.connect(this.operator.token, () => {
      socket.setOnMessage((event) => {
        const data = JSON.parse(event.data);
        if (data.method === 'post') {

          const message = Message.from(data);
          if (uid === message.uid) {
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

  public async send(input: string) {
    const m = new Message(input);
    m.uid = this.$route.params.uid;
    await sendChat.post(m, this.operator.token);
  }
}
</script>
