<template>
  <v-layout>
    <v-layout row>
      <v-flex offset-xs2 xs8>
        <v-textarea v-model="input" v-on:keyup.enter="onClickSend()" solo rows="2" value></v-textarea>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

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
