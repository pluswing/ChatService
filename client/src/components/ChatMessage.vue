<template>
  <div style="margin:5px;">
    <div v-if="!message.isOperatorMessage()" style="margin-left:50px;">
      <b-notification type="is-info" style="background-color:#1976D2;" :closable="false">
        <div style="white-space:pre-wrap;">{{message.message}}</div>
        <div style="text-align:right; font-size:8px;">{{ message.date() }}</div>
      </b-notification>
    </div>

    <div v-if="message.isOperatorMessage()" style="margin-right:50px;">
      <b-notification :closable="false" style="background-color:#BDBDBD;">
        <div style="white-space:pre-wrap;">{{message.message}}</div>
        <div style="text-align:right; font-size:8px;">{{ message.date() }}</div>
      </b-notification>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Message } from '../models/Message';

@Component
export default class ChatMessage extends Vue {
  @Prop() private message!: Message;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
