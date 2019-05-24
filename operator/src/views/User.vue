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
import UserStatus from '@/components/UserStatus.vue';
import Activities from '@/components/Activities.vue';
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
    Activities,
  },
})
export default class Home extends Vue {
  @State('operator') public operator!: OperatorState;
  public users: User[] = [];
  public messages: Message[] = [];

  private getusers = new GetUsers(new UserApi());
  private connection = new WebSocket('ws://localhost:3010/v1/chat/ws/');

  public async mounted() {
    this.users = await this.getusers.do(this.operator.token);
    const m = new Message('hogehogehogehoge');
    m.uid = 'uiduid';
    this.messages = [
      m,
    ];
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

        const m = new Message(data.message);
        m.id = data.id;
        m.uid = data.uid;
        m.operatorId = data.operatorId;
        m.createdAt = new Date(data.createdAt);
        this.messages.unshift(m);

        const uid = data.uid;
        const user = this.users.find((u) => u.uid === uid);
        if (!user) { return; }
        Vue.set(user, 'arrival', user.arrival + 1);
      }
    };
  }
}
</script>
