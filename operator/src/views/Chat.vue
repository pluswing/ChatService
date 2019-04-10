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

const sendChat = new SendChat(new ChatApi(''));

@Component({
  components: {
    ChatHistory,
    ChatInputForm,
  },
})
export default class Chat extends Vue {
  public messages: Message[] = [];

  public mounted() {
    sendChat.onNewMessage = (m: Message) => {
      this.messages.push(m);
    };
  }

  public async send(input: string) {
    await sendChat.post(new Message(input));
  }
}
</script>
