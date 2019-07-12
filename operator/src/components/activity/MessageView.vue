<template>
  <v-card @click="clickCard">
    <v-card-title style="text-align:left;" class="pb-0">
      <span class="caption font-weight-light" style="color:grey;">{{ message.uid }}</span>
    </v-card-title>

    <v-card-text style="text-align:left;" class="subheading pb-0 pt-1">{{ message.body }}</v-card-text>

    <v-card-actions class="pb-0 pt-0">
      <v-list-tile class="grow">
        <v-layout align-center justify-end>
          <span class="caption" style="color:grey;">{{ message.fromNow() }}</span>
        </v-layout>
      </v-list-tile>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { User } from '@/models/User';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Message } from '../../models/Message';
@Component({
  components: {
  },
})
export default class MessageView extends Vue {
  @Prop() private message!: Message;

  public clickCard() {
    this.$router.push({
      name: 'chat',
      params: {
        uid: this.message.uid,
      },
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

