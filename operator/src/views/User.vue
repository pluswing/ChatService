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
          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-list-tile :key="item.title" avatar ripple @click="toggle(index)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                  <v-icon v-if="selected.indexOf(index) < 0" color="grey lighten-1">star_border</v-icon>

                  <v-icon v-else color="yellow darken-2">star</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
            </template>
          </v-list>
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

  public selected = [2];
  public items = [
    {
      action: '15 min',
      headline: 'Brunch this weekend?',
      title: 'Ali Connors',
      subtitle: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'
    },
    {
      action: '2 hr',
      headline: 'Summer BBQ',
      title: 'me, Scrott, Jennifer',
      subtitle: 'Wish I could come, but I\'m out of town this weekend.'
    },
    {
      action: '6 hr',
      headline: 'Oui oui',
      title: 'Sandra Adams',
      subtitle: 'Do you have Paris recommendations? Have you ever been?'
    },
    {
      action: '12 hr',
      headline: 'Birthday gift',
      title: 'Trevor Hansen',
      subtitle: 'Have any ideas about what we should get Heidi for her birthday?'
    },
    {
      action: '18hr',
      headline: 'Recipe to try',
      title: 'Britta Holt',
      subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
    }
  ];
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
