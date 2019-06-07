<template>
  <v-content>
    <Header/>
    <div class="headline" style="text-align:left;margin:10px;">Users</div>
    <v-layout>
      <v-flex xs9>
        <v-layout wrap>
          <v-flex xs6 v-for="user in users" :key="user.id">
            <UserStatus style="margin:10px;" :user="user"/>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs3>
        <Activities style="margin:10px;" :messages="messages"/>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserStatus from '@/components/user/UserStatus.vue';
import Activities from '@/components/user/Activities.vue';
import Header from '@/components/common/Header.vue';
import { Message, IMessage } from '../models/Message';
import { User, IUser } from '../models/User';
import axios from 'axios';
import { State, Mutation, Getter } from 'vuex-class';
import { OperatorState } from '../store/operator';
import GetUsers from '../usecases/GetUsers';
import UserApi from '../repositories/UserApi';
import socket from '../socket/socket';
import { UsersState } from '../store/users';

@Component({
  components: {
    UserStatus,
    Activities,
    Header,
  },
})
export default class Home extends Vue {
  @State('operator') public operator!: OperatorState;

  @Mutation('users/add') public addUser!: (payload: { user: IUser, ignoreBadgeCount: boolean }) => void;
  // @Mutation('users/clear') public clearUser!: () => void;
  @Getter('users/users') public users!: User[];

  @Mutation('messages/add') public addMessage!: (payload: { message: IMessage }) => void;
  // @Mutation('messages/clear') public clearMessage!: () => void;
  @Getter('messages/messages') public messages!: Message[];

  private getusers = new GetUsers(new UserApi());

  public async created() {
    this.initSocket();
    await this.loadUsers();
  }

  private initSocket() {
    socket.connect(this.operator.token, () => {
      socket.setOnMessage((event) => {
        const data = JSON.parse(event.data);
        if (data.method === 'post') {
          const message = Message.from(data);
          this.addMessage({ message });

          const user = new User(data.userId, data.uid, message);
          user.badge = 1;
          this.addUser({ user, ignoreBadgeCount: false });
        }
      });
    });
  }

  private async loadUsers() {
    const users = await this.getusers.do(this.operator.token);
    users.forEach((user) => {
      this.addUser({ user, ignoreBadgeCount: true });
    });
  }
}
</script>
