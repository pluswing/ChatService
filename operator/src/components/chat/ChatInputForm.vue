<template>
  <v-layout
    style="position:absolute;bottom:0;width:100%;background-color:#fafafa;margin-left:10px; margin-top:20px;padding-top:20px;margin-right:20px;"
  >
    <v-layout row style="margin-right:20px;">
      <v-flex offset-xs2 xs8>
        <v-layout row align-end>
          <v-textarea v-model="input" solo rows="4" value></v-textarea>
          <v-btn style="margin-bottom:30px;" color="info" @click="onClickSend">SEND</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ChatInputForm extends Vue {
  public input: string = '';

  @Emit() public send(input: string) { }

  public onClickSend() {
    if (this.input.trim() === '') {
      return;
    }
    this.send(this.input);
    this.input = '';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
