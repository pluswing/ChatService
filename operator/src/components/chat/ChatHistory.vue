<template>
  <v-container id="messages" style="height:100vh;overflow-y:scroll;">
    <v-layout v-for="message in messages" :key="message.id">
      <ChatMessage :message="message"/>
    </v-layout>
    <div style="height:100px;"/>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ChatMessage from '@/components/chat/ChatMessage.vue';
import { Message } from '@/models/Message';

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
