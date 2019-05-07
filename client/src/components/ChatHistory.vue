<template>
  <div class="messages">
    <div v-for="message in messages" :key="message.id">
      <ChatMessage :message="message"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ChatMessage from './ChatMessage.vue';
import { Message } from '../models/Message';

@Component({
  components: {
    ChatMessage,
  },
})
export default class ChatHistory extends Vue {
  @Prop() private messages!: Message[];
}
</script>

<style scoped lang="scss">
.messages {
  height: 400px;
}
</style>
