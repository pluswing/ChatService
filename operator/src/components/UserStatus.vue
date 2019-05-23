<template>
  <v-card
    class="mx-auto"
    color="#26c6da"
    :style="{'background-color': gbColor }"
    dark
    max-width="400"
  >
    <v-card-title>
      <span class="title font-weight-light">{{ user.uid }}</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      <router-link :to="{ name: 'chat', params: { uid: user.uid }}">{{ user.message.message }}</router-link>
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { User } from '@/models/User';
@Component({
  components: {
  },
})
export default class UserStatus extends Vue {
  @Prop() private user!: User;

  get gbColor(): string {
    return this.user.arrival == 0 ? '#26c6da' : 'red';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

