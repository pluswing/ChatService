<template>
  <v-layout justify-start pb-3>
    <!-- user message -->
    <v-flex offset-xs2 xs6 text-xs-left v-if="!message.operatorId">
      <v-card color="blue-grey lighten-4">
        <v-card-text style="white-space:pre-wrap;">
          {{message.body}}
          <div class="text-xs-right">{{message.date()}}</div>
        </v-card-text>
      </v-card>
    </v-flex>

    <!-- operator message -->
    <v-layout justify-end pb-3 v-if="message.operatorId">
      <v-flex xs6 text-xs-right>
        <v-card color="teal lighten-3">
          <v-card-text style="white-space:pre-wrap;">
            {{message.body}}
            <div class="text-xs-right">{{message.date()}}</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2 />
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import { Message } from '@/models/Message';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ChatMessage extends Vue {
  @Prop() public message!: Message;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
