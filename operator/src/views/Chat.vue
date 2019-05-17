<template>
  <v-container>
    <ChatHistory :messages="messages"/>
    <ChatInputForm @send="send"/>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChatHistory from '@/components/ChatHistory.vue';
import ChatInputForm from '@/components/ChatInputForm.vue';
import { Message } from '@/models/Message';
import { SendChat } from '@/usecases/SendChat';
import { ChatApi } from '@/repositories/ChatApi';
import { State } from 'vuex-class';
import { OperatorState } from '../store/operator';
import GetMessages from '@/usecases/GetMessages';

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

  private connection = new WebSocket('ws://localhost:3010/v1/chat/ws/');

  public async created() {
    this.connection.onopen = () => {
      this.connection.send(
        JSON.stringify({
          method: 'register',
          isOperator: true,
          token: this.operator.token,
        }),
      );
    };

    this.connection.onmessage = (event) => {
      console.log(event.data);
      const data = JSON.parse(event.data);
      if (data.method === 'post') {
        const m = new Message(data.message);
        m.id = data.id;
        m.operatorId = data.operatorId;
        m.createdAt = new Date(data.createdAt);
        // FIXME
        // m.createdAt = ??
        this.messages.push(m);
      }
    };
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
