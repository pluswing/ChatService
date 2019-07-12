<template>
  <v-card @click="clickCard">
    <v-badge v-model="showBadge" style="position:initial;" color="red" right overlap>
      <template v-slot:badge>
        <span>{{ user.badge }}</span>
      </template>
    </v-badge>

    <v-card-title style="text-align:left;" class="pt-0 pb-0">
      <span class="body-1 font-weight-light" style="color:grey;">{{ user.uid }}</span>
    </v-card-title>

    <v-card-text
      style="text-align:left;"
      class="subheading font-weight-light pb-0 pt-1"
    >{{ user.message.body }}</v-card-text>

    <v-card-actions class="pb-0 pt-0">
      <v-list-tile class="grow">
        <v-layout align-center justify-end>
          <span class="body-1" style="color:grey;">{{ user.message.date() }}</span>
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

  public clickCard() {
    this.$router.push({
      name: 'chat',
      params: {
        uid: this.user.uid,
      },
    });
  }

  get showBadge(): boolean {
    return this.user.badge > 0;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

