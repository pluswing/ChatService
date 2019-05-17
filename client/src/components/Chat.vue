<template>
  <div class="chat_container">
    <Header title="チャット" @close="onClickClose"/>
    <ChatHistory :messages="messages"/>
    <ChatInputForm @send="send"/>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import Header from './Header.vue';
import ChatHistory from './ChatHistory.vue';
import ChatInputForm from './ChatInputForm.vue';
import { Message } from '../models/Message';
import axios from 'axios';

@Component({
  components: {
    Header,
    ChatHistory,
    ChatInputForm,
  },
})
export default class Chat extends Vue {

  public messages: Message[] = [];
  @Prop() private uid!: string;

  private connection = new WebSocket('ws://localhost:3010/v1/chat/ws/');

  public async created() {
    this.connection.onopen = () => {
      this.connection.send(
        JSON.stringify({
          method: 'register',
          uid: this.uid,
        }),
      );
    };

    this.connection.onmessage = (event) => {
      console.log(event.data);
      const data = JSON.parse(event.data);
      if (data.method === 'post') {
        const message = new Message(data.message);
        message.id = data.id;
        message.operatorId = data.operatorId;
        message.createdAt = data.createdAt;
        this.messages.push(message);
      }
    };

    // load histories
    const res = await axios.post('http://localhost:3010/v1/chat/histories', {
      uid: this.uid,
    });
    res.data.forEach((um: any) => {
      const mm = new Message(um.body);
      mm.id = um.id;
      mm.operatorId = um.operatorId;
      console.log(um);
      mm.createdAt = new Date(um.createdAt);
      this.messages.push(mm);
    });
  }

  @Emit() public close() { }

  public onClickClose() {
    this.close();
  }

  public async send(input: string) {
    this.connection.send(
      JSON.stringify({
        method: 'post',
        message: input,
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
