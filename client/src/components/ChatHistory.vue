<template>
  <div class="messages" style="overflow-y:scroll;">
    <div v-for="message in messages" :key="message.id">
      <ChatMessage :message="message" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Message } from '../models/Message';
import ChatMessage from './ChatMessage.vue';

@Component({
  components: {
    ChatMessage,
  },
})
export default class ChatHistory extends Vue {
  @Prop() private messages!: Message[];

  public updated() {
    this.$nextTick(() => {
      const container = document.getElementsByClassName('messages')[0];
      container.scrollTop = container.scrollHeight;
    });
  }
}
</script>

<style scoped lang="scss">
.messages {
  height: 400px;
}
</style>
