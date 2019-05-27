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
import { Message } from '@/models/Message';
import { SendChat } from '@/usecases/SendChat';
import { ChatApi } from '@/repositories/ChatApi';
import { State } from 'vuex-class';
import { OperatorState } from '../store/operator';
import GetMessages from '@/usecases/GetMessages';
import socket from '../socket/socket';

const sendChat = new SendChat(new ChatApi());

@Component({
  components: {
    ChatHistory,
    ChatInputForm,
  },
})
export default class Chat extends Vue {
  @State('operator') public operator!: OperatorState;
  public messages: Message[] = [];
  public getmessages = new GetMessages(new ChatApi());

  public async created() {
    socket.connect(this.operator.token, () => {
      socket.setOnMessage((event) => {
        console.log(event.data);
        const data = JSON.parse(event.data);
        if (data.method === 'post') {
          const m = new Message(data.message);
          m.id = data.id;
          m.operatorId = data.operatorId;
          m.createdAt = new Date(data.createdAt);
          this.messages.push(m);
        }
      });
    });
  }

  public async mounted() {
    const uid = this.$route.params.uid;

    this.messages = await this.getmessages.handle(uid, this.operator.token);

    sendChat.onNewMessage = (m: Message) => {
      this.messages.push(m);
    };
  }

  public async beforeDestroy() {
    this.connection.send(
      JSON.stringify({
        method: 'disconnect',
        isOperator: true,
        token: this.operator.token,
      }),
    );
  }

  public async send(input: string) {
    const m = new Message(input);
    m.uid = this.$route.params.uid;
    await sendChat.post(m, this.operator.token);
  }
}
</script>
