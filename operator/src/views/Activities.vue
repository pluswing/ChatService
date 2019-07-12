<template>
  <v-layout row wrap style="padding:10px;">
    <v-flex offset-xs2 xs8 v-for="message in messages" :key="message.id">
      <MessageView style="margin:5px;" :message="message" />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import MessageView from '@/components/activity/MessageView.vue';
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation, State } from 'vuex-class';
import { MessageConverter } from '../converter/MessageConverter';
import { UserConverter } from '../converter/UserConverter';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { initApi } from '../repositories/api';
import { MessageApi } from '../repositories/MessageApi';
import { UserApi } from '../repositories/UserApi';
import socket from '../socket/socket';
import { StoreOperator } from '../store/operator';
import { StoreUser, UsersState } from '../store/users';
import { ActivitiesUsecase } from '../usecases/ActivitiesUsecase';
import { GetUsersUsecase } from '../usecases/GetUsersUsecase';

@Component({
  components: {
    MessageView,
  },
})
export default class Activities extends Vue {
  @State('operator') public operator!: StoreOperator;

  @Mutation('users/add') public addUser!: (payload: { user: StoreUser, ignoreBadgeCount: boolean }) => void;
  public messages: Message[] = [];

  public async created() {
    this.initSocket();
    this.messages = await new ActivitiesUsecase(new MessageApi()).execute();
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
        }
      });
    });
  }
}
</script>
