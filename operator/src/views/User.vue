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

@Component({
  components: {
    UserStatus,
  },
})
export default class Home extends Vue {
  public users: User[] = [];

  public mounted() {
    this.users.push(new User(1, 'aaaa', new Message('')));
    this.users.push(new User(1, 'bbbb', new Message('')));
  }
}
</script>
