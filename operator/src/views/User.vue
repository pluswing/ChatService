<template>
  <v-app>
    <v-content>
      <v-layout wrap>
        <v-flex xs3 style="margin:10px;" v-for="user in users" :key="user.id">
          <UserStatus :user="user"/>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserStatus from '@/components/UserStatus.vue';
import { Message } from '../models/Message';
import { User } from '../models/User';
import axios from 'axios';
import { State } from 'vuex-class';
import { OperatorState } from '../store/operator';
import GetUsers from '../usecases/GetUsers';
import UserApi from '../repositories/UserApi';

@Component({
  components: {
    UserStatus,
  },
})
export default class Home extends Vue {
  public users: User[] = [];
  @State('operator') public operator!: OperatorState;
  private getusers = new GetUsers(new UserApi());
  private connection = new WebSocket('ws://localhost:3010/v1/chat/ws/');

  public async mounted() {
    this.users = await this.getusers.do(this.operator.token);
  }

  public async created() {
    this.connection.onopen = () => {
      this.connection.send(
        JSON.stringify({
          method: 'register',
          isOperator: true,
          token: this.operator.token,
        }),
      );
    };

    this.connection.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.method === 'post') {
        console.log(this.users);
        console.log(data);
        const uid = data.uid;
        const user = this.users.find((u) => u.uid === uid);
        if (!user) { return; }
        Vue.set(user, 'arrival', user.arrival + 1);
      }
    };
  }
}
</script>
