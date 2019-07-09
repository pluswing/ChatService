<template>
  <v-content>
    <Header />
    <v-layout style="padding:10px;">
      <template v-for="message in messages">
        <v-list-tile :key="message.id" avatar ripple @click="toggle(index)">
          <v-list-tile-content>
            <router-link :to="{ name: 'chat', params: { uid: message.uid }}">
              <v-list-tile-title>{{ message.uid }}</v-list-tile-title>
            </router-link>
            <v-list-tile-sub-title>{{ message.body }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-list-tile-action-text>{{ message.fromNow() }}</v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
      </template>
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
    Activities,
    Header,
  },
})
export default class Activities extends Vue {
  @State('operator') public operator!: StoreOperator;

  @Mutation('users/add') public addUser!: (payload: { user: StoreUser, ignoreBadgeCount: boolean }) => void;
  @Mutation('messages/add') public addMessage!: (payload: { message: StoreMessage }) => void;
  @Getter('messages/messages') public messages!: Message[];

  private getusers = new GetUsersUsecase(new UserApi());

  public async created() {
    initApi(this.operator.token);
    this.initSocket();
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
}
</script>
