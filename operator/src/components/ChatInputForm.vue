<template>
  <div class="hello">
    <textarea v-model="input"></textarea>
    <button @click="onClickSend">SEND</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component
export default class ChatInputForm extends Vue {
  public input: string = '';

  @Emit() public send(input: string) {}

  public onClickSend() {
    this.send(this.input);
    this.input = '';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
