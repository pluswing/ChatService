<template>
  <div class="chat_container">
      <Header title="チャット" @close="onClickClose"/>
      <ChatHistory :messages="messages"/>
      <ChatInputForm @send="send"/>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
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

    public messages: Message[] = [];

    mounted() {
    }

    @Emit() public close() {
    }

    public onClickClose() {
        this.close();
    }

    public async send(input: string) {
        const message = new Message(input);
        message.id = this.messages.length + 1;
        this.messages.push(message);
    }
}
</script>

<style scoped lang="scss">
.chat_container {
    width: 380px;
    background-color: white;
}
</style>
