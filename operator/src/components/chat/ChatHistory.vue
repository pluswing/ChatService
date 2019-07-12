<template>
  <v-container
    id="messages"
    style="height:100vh;overflow-y:scroll;margin-top:-48px;margin-bottom:-130px;padding-top:60px;"
  >
    <template v-for="message in messages">
      <ChatMessage :message="message" :key="message.id" />
    </template>
    <div style="height:130px;" />
  </v-container>
</template>

<script lang="ts">
import ChatMessage from '@/components/chat/ChatMessage.vue';
import { Message } from '@/models/Message';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    ChatMessage,
  },
})
export default class ChatHistory extends Vue {
  @Prop() private messages!: Message[];

  public updated() {
    this.$nextTick(() => {
      const container = document.getElementById('messages');
      if (container == null) { return; }
      container.scrollTop = container.scrollHeight;
    });
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
