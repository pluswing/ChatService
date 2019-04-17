<template>
  <v-app>
    <v-content>
      <v-layout v-for="user in users" :key="user.id">
        <UserStatus :user="user"/>
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

@Component({
  components: {
    UserStatus,
  },
})
export default class Home extends Vue {
  public users: User[] = [];

  public async mounted() {
    const res = await axios.post('http://localhost:3000/v1/operator/users', {});
    const list: any[] = res.data.data;
    this.users = list.map((row) => {
      const message = new Message(row.message.body);
      message.id = row.message.id;
      message.createdAt = row.message.createdAt;
      message.operatorId = row.message.operatorId;
      return new User(row.user.id, row.user.uid, message);
    });
  }
}
</script>
