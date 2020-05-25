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
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Mutation, State } from 'vuex-class';
import { MessageConverter } from './converter/MessageConverter';
import { UserConverter } from './converter/UserConverter';
import { User } from './models/User';
import { initApi } from './repositories/api';
import socket from './socket/socket';
import { StoreOperator } from './store/operator';
import { StoreMessage, StoreUser } from './store/users';

@Component({
  components: {
    Header,
    Sidebar,
  },
})
export default class App extends Vue {
  @State('operator') public operator!: StoreOperator;
  @Mutation('users/add') public addUser!: (payload: { user: StoreUser, ignoreBadgeCount: boolean }) => void;
  @Getter('users/users') public users!: User[];
  @Mutation('users/addMessage') public addMessage!: (payload: { message: StoreMessage }) => void;

  private showSide = false;

  public created() {
    this.changeOperator();
  }

  @Watch('operator.token')
  public changeOperator() {
    initApi(this.operator.token, (error) => alert(error));
    if (this.operator.token) {
      this.initSocket();
    }
  }

  public sideClick() {
    this.showSide = !this.showSide;
  }

  public closeSide() {
    this.showSide = false;
  }

  private initSocket() {
    socket.connect(this.operator.token, () => {
      socket.setOnMessage((event) => {
        const data = JSON.parse(event.data);
        if (data.method === 'post') {
          const message = MessageConverter.convertMessage(data);
          const user = UserConverter.convertUser(data, message);
          user.badge = 1;
          this.addUser({ user, ignoreBadgeCount: false });
          this.addMessage({ message });
        }
      });
    });
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
