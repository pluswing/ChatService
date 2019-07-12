<template>
  <v-toolbar dark color="primary" style="z-index:1;">
    <v-toolbar-side-icon @click="sideClick"></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">ChatService</v-toolbar-title>

    <v-spacer></v-spacer>
    {{ operator.loginId }}
    <v-menu v-if="operator" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>fas fa-user</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile @click="doLogout">
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script lang="ts">
import { StoreOperator } from '@/store/operator';
import { Component, Emit, Vue } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
@Component({
  components: {
  },
})
export default class Header extends Vue {
  @State('operator') public operator!: StoreOperator;
  @Mutation('operator/logout') public logout!: () => void;

  @Emit() public side() { }


  public sideClick() {
    this.side();
  }

  public doLogout() {
    this.logout();
    this.$router.replace({ name: 'login' });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
