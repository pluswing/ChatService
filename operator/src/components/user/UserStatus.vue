<template>
  <v-card>
    <v-badge v-model="showBadge" style="position:initial;" color="red" right overlap>
      <template v-slot:badge>
        <span>{{ user.badge }}</span>
      </template>

      <v-card-title style="text-aligin:left;">
        <span class="title font-weight-light">
          <router-link :to="{ name: 'chat', params: { uid: user.uid }}">{{ user.uid }}</router-link>
        </span>
      </v-card-title>
    </v-badge>

    <v-card-text class="headline" style="text-aligin:left;">
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
</template>

<script lang="ts">
import { User } from '@/models/User';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {
  },
})
export default class UserStatus extends Vue {
  @Prop() private user!: User;

  public mounted() {
  }

  get showBadge(): boolean {
    return this.user.badge > 0;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

