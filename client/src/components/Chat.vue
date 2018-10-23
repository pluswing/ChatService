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

@Component({
    components: {
        Header,
        ChatHistory,
        ChatInputForm,
    },
})
export default class Chat extends Vue {
    @Prop() private uid!: string;

    public messages: Message[] = [];

    private connection: WebSocket;

    created() {
        this.connection = new WebSocket('ws://localhost:3000/v1/chat/ws/');
        this.connection.onopen = () => {
            this.connection.send(JSON.stringify({
                method: 'register',
                uid: this.uid,
            }));
        };

        this.connection.onmessage = (event) => {
            console.log(event.data);
            const data = JSON.parse(event.data);
            if (data.method === 'post') {
                const message = new Message(data.message);
                message.id = this.messages.length + 1;
                this.messages.push(message);
            }
        };
    }

    @Emit() public close() {}

    public onClickClose() {
        this.close();
    }

    public async send(input: string) {
        this.connection.send(JSON.stringify({
            method: 'post',
            to: this.uid,
            message: input,
        }));
    }
}
</script>

<style scoped lang="scss">
.chat_container {
    width: 380px;
    background-color: white;
}
</style>
