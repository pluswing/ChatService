<template>
  <v-badge v-model="showBadge" color="red" right overlap>
    <template v-slot:badge>
      <span>{{ user.arrival }}</span>
    </template>
    <v-card class="mx-auto">
      <v-card-title>
        <span class="title font-weight-light">
          <router-link :to="{ name: 'chat', params: { uid: user.uid }}">{{ user.uid }}</router-link>
        </span>
      </v-card-title>

      <v-card-text class="headline">
        <router-link :to="{ name: 'chat', params: { uid: user.uid }}">{{ user.message.body }}</router-link>
      </v-card-text>

      <v-card-actions>
        <v-list-tile class="grow">
          <v-layout align-center justify-end>
            <span class="subheading">{{ user.message.date() }}</span>
          </v-layout>
        </v-list-tile>
      </v-card-actions>
    </v-card>
  </v-badge>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { User } from '@/models/User';
@Component({
  components: {
  },
})
export default class UserStatus extends Vue {
  @Prop() private user!: User;

  public mounted() {
    console.log(this.user.message);
  }

  get showBadge(): boolean {
    return this.user.arrival > 0;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

