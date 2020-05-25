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
import { StoreMessage, StoreUser, UsersState } from '../store/users';
import { ActivitiesUsecase } from '../usecases/ActivitiesUsecase';
import { GetUsersUsecase } from '../usecases/GetUsersUsecase';

@Component({
  components: {
    MessageView,
  },
})
export default class Activities extends Vue {
  @State('operator') public operator!: StoreOperator;
  @Mutation('users/clearMessage') public clear!: (payload: {}) => void;
  @Mutation('users/addMessage') public addMessage!: (payload: { message: StoreMessage }) => void;
  @Getter('users/messages') public messages!: Message[];

  public async created() {
    const ms = await new ActivitiesUsecase(new MessageApi()).execute();
    this.clear({});
    ms.forEach((m) => {
      this.addMessage({message: m});
    });
  }
}
</script>
