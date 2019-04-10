<template>
  <v-container>
    <v-layout v-for="message in messages" :key="message.id">
      <!-- user message -->
      <v-layout justify-start pb-3>
        <v-flex xs2 pr-2 text-xs-right>
          <v-avatar color="blue-grey lighten-4"></v-avatar>
        </v-flex>
        <v-flex xs8>
          <v-card class="mx-auto" color="blue-grey lighten-4">
            <v-card-text>{{message.message}}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <!--
      <v-layout justify-start pb-3 v-if="!message.operator">
        <v-flex xs2 pr-2 text-xs-right>
          <v-avatar color="blue-grey lighten-4">
            <img :src="message.image" alt="avatar">
          </v-avatar>
        </v-flex>
        <v-flex xs8>
          <v-card class="mx-auto" color="blue-grey lighten-4">
            <v-card-text>{{message.message}}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      -->
      <!-- operator message -->
      <!--
      <v-layout row justify-end pb-3 v-if="message.operator">
        <v-flex xs8>
          <v-card color="teal lighten-3">
            <v-card-text>{{message.message}}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs2 pl-2>
          <v-avatar color="teal lighten-3">
            <img :src="message.image" alt="avatar">
          </v-avatar>
        </v-flex>
      </v-layout>
      -->
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
