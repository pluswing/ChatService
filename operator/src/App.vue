<template>
  <v-app>
    <v-content>
      <Header @side="sideClick" />
      <Sidebar :show="showSide" @close="closeSide" />
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Header from '@/components/common/Header.vue';
import Sidebar from '@/components/common/Sidebar.vue';
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { StoreOperator } from './store/operator';

@Component({
  components: {
    Header,
    Sidebar,
  },
})
export default class App extends Vue {
  @State('operator') public operator!: StoreOperator;

  private showSide = false;

  public sideClick() {
    this.showSide = !this.showSide;
  }
  public closeSide() {
    this.showSide = false;
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
