<template>
  <div class="header" @click="onClick">{{title}}</div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Minimize extends Vue {
  @Prop() private title!: string;
  @Emit() public clicked() { }

  public onClick() {
    this.clicked();
  }
}
</script>

<style scoped lang="scss">
.header {
  height: 20px;
  width: 200px;
  text-align: center;
  background-color: #1e4784;
  color: white;
  line-height: 20px;
  font-size: 12px;
}
</style>
