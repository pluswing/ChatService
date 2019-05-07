<template>
  <div class="input_form">
    <div class="input_text">
      <textarea v-model="input" rows="3" class="textarea input_text"></textarea>
    </div>
    <button class="button is-primary send" @click="onClickSend">Send</button>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';

@Component
export default class ChatInputForm extends Vue {
  public input: string = '';

  @Emit() public send(input: string) { }

  public onClickSend() {
    this.send(this.input);
    this.input = '';
  }
}
</script>

<style scoped lang="scss">
.input_form {
  border-top: 1px solid #eeeeee;
  padding: 5px;
  .input_text {
    width: 280px;
    display: inline-block;
  }
  .send {
    right: 5px;
    bottom: 5px;
    position: absolute;
  }
}
</style>
