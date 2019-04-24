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

  private isOperatorMessage = false;

  public async mounted() {
    const uid = this.$route.params.uid;

    this.messages = await this.getmessages.handle(uid, this.operator.token);

    sendChat.onNewMessage = (m: Message) => {
      this.messages.push(m);
    };
  }
  public async send(input: string) {
    const m = new Message(input);
    if (this.isOperatorMessage) {
      m.operatorId = 1;
    }
    await sendChat.post(m);
    this.isOperatorMessage = !this.isOperatorMessage;
  }
}
</script>
