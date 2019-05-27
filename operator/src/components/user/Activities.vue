<template>
  <v-list two-line>
    <template v-for="message in messages">
      <v-list-tile :key="message.id" avatar ripple @click="toggle(index)">
        <v-list-tile-content>
          <v-list-tile-title>{{ message.uid }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ message.body }}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-list-tile-action-text>{{ message.fromNow() }}</v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Message } from '@/models/Message';
@Component({
  components: {
  },
})
export default class Activities extends Vue {
  @Prop() private messages!: Message[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

