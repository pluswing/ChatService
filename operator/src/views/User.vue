<template>
  <v-app>
    <v-content>
      <v-layout>
        <v-flex xs9>
          <v-layout wrap>
            <v-flex xs3 v-for="user in users" :key="user.id">
              <UserStatus style="margin:10px;" :user="user"/>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs3>
          <Activities :messages="messages"/>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserStatus from '@/components/user/UserStatus.vue';
import Activities from '@/components/user/Activities.vue';
import { Message } from '../models/Message';
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
  },
})
export default class Home extends Vue {
  @State('operator') public operator!: OperatorState;
  @Mutation('users/add') public add!: (payload: { user: IUser }) => void;
  @Mutation('users/clear') public clear!: (payload: any) => void;
  @Getter('users/users') public users!: User[];
  public messages: Message[] = [];

  private getusers = new GetUsers(new UserApi());

  public async mounted() {
    const users = await this.getusers.do(this.operator.token);
    this.clear({});
    users.forEach((user) => {
      this.add({ user });
    });
  }

  public async created() {
    socket.connect(this.operator.token, () => {
      socket.setOnMessage((event) => {
        const data = JSON.parse(event.data);
        if (data.method === 'post') {
          const m = new Message(data.message);
          m.id = data.id;
          m.uid = data.uid;
          m.operatorId = data.operatorId;
          m.createdAt = new Date(data.createdAt);
          this.messages.unshift(m);

          const user = new User(data.userId, data.uid, m);
          user.arrival = 1;
          this.add({ user });
        }
      });
    });
  }
}
</script>
