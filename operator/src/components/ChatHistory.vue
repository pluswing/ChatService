<template>
  <v-container>
    <v-layout v-for="message in messages" :key="message.id">
      <ChatMessage :message="message"/>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ChatMessage from '@/components/ChatMessage.vue';
import { Message } from '@/models/Message';

@Component({
  components: {
    ChatMessage,
  },
})
export default class ChatHistory extends Vue {
  @Prop() private messages!: Message[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
