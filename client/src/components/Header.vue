<template>
  <div class="header">
    {{title}}
    <span class="right">
      <img src="../img/close.png" @click="onClickClose" />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  @Prop() private title!: string;
  @Emit() public close() { }

  public onClickClose() {
    this.close();
  }

}
</script>

<style scoped lang="scss">
.header {
  height: 50px;
  text-align: center;
  background-color: #1e4784;
  color: white;
  line-height: 50px;
  font-size: 20px;
}
.right {
  position: absolute;
  width: 35px;
  height: 35px;
  right: 15px;
  top: 8px;
}
</style>
