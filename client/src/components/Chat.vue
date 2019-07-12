<template>
  <div class="chat_container">
    <Header title="チャット" @close="onClickClose" />
    <ChatHistory :messages="messages" />
    <ChatInputForm @send="send" />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { Message } from '../models/Message';
import ChatHistory from './ChatHistory.vue';
import ChatInputForm from './ChatInputForm.vue';
import Header from './Header.vue';

const API_ENDPOINT = process.env.API_ENDPOINT;
const API_ENDPOINT_WS = process.env.API_ENDPOINT_WS;

@Component({
  components: {
    ChatHistory,
    ChatInputForm,
    Header,
  },
})
export default class Chat extends Vue {

  public messages: Message[] = [];
  @Prop() private uid!: string;

  private connection = new WebSocket(`${API_ENDPOINT_WS}/v1/chat/ws/`);
  @Emit() public close() { }

  public async created() {
    this.connection.onopen = () => {
      this.connection.send(
        JSON.stringify({
          method: 'histories',
          uid: this.uid,
        }),
      );
    };

    this.connection.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.method === 'post') {
        const message = new Message(data.body);
        message.id = data.id;
        message.operatorId = data.operatorId;
        message.createdAt = data.createdAt;
        this.messages.push(message);
      }
      if (data.method === 'histories') {
        data.histories.forEach((um: any) => {
          const mm = new Message(um.body);
          mm.id = um.id;
          mm.operatorId = um.operatorId;
          mm.createdAt = new Date(um.createdAt);
          this.messages.push(mm);
        });
      }
    };
  }

  public beforeDestroy() {
    this.connection.send(
      JSON.stringify({
        method: 'disconnect',
        uid: this.uid,
      }),
    );
  }

  public onClickClose() {
    this.close();
  }

  public async send(input: string) {
    this.connection.send(
      JSON.stringify({
        message: input,
        method: 'post',
        uid: this.uid,
      }),
    );
  }
}
</script>

<style scoped lang="scss">
.chat_container {
  width: 380px;
  background-color: white;
}
</style>
