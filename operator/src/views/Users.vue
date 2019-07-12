<template>
  <v-layout row wrap style="padding:10px;">
    <v-flex xs6 v-for="user in users" :key="user.id">
      <UserStatus style="margin:10px;" :user="user" />
    </v-flex>
  </v-layout>
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
  @Mutation('users/add') public addUser!: (payload: { user: StoreUser, ignoreBadgeCount: boolean }) => void;
  @Getter('users/users') public users!: User[];

  public async created() {
    await this.loadUsers();
  }

  private async loadUsers() {
    const users = await new GetUsersUsecase(new UserApi()).execute();
    users.forEach((user) => {
      this.addUser({ user, ignoreBadgeCount: true });
    });
  }
}
</script>
