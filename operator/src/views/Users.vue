<template>
  <v-content>
    <Header />
    <v-layout style="padding:10px;">
      <v-flex xs9>
        <v-layout wrap>
          <v-flex xs6 v-for="user in users" :key="user.id">
            <UserStatus style="margin:10px;" :user="user" />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs3>
        <Activities style="margin:10px;" :messages="messages" />
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script lang="ts">
import Header from '@/components/common/Header.vue';
import UserStatus from '@/components/user/UserStatus.vue';
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation, State } from 'vuex-class';
import { MessageConverter } from '../converter/MessageConverter';
import { UserConverter } from '../converter/UserConverter';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { initApi } from '../repositories/api';
import { UserApi } from '../repositories/UserApi';
import socket from '../socket/socket';
import { StoreMessage } from '../store/messages';
import { StoreOperator } from '../store/operator';
import { StoreUser, UsersState } from '../store/users';
import { GetUsersUsecase } from '../usecases/GetUsersUsecase';

@Component({
  components: {
    UserStatus,
    Header,
  },
})
export default class Users extends Vue {
  @State('operator') public operator!: StoreOperator;

  @Mutation('users/add') public addUser!: (payload: { user: StoreUser, ignoreBadgeCount: boolean }) => void;
  @Getter('users/users') public users!: User[];

  @Mutation('messages/add') public addMessage!: (payload: { message: StoreMessage }) => void;

  public async created() {
    initApi(this.operator.token);
    this.initSocket();
    await this.loadUsers();
  }

  private initSocket() {
    socket.connect(this.operator.token, () => {
      socket.setOnMessage((event) => {
        const data = JSON.parse(event.data);
        if (data.method === 'post') {
          const message = MessageConverter.convertMessage(data);
          this.addMessage({ message });
          const user = UserConverter.convertUser(data, message);
          user.badge = 1;
          this.addUser({ user, ignoreBadgeCount: false });
        }
      });
    });
  }

  private async loadUsers() {
    const users = await new GetUsersUsecase(new UserApi()).execute();
    users.forEach((user) => {
      this.addUser({ user, ignoreBadgeCount: true });
    });
  }
}
</script>
