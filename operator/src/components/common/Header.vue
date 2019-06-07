<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">ChatService</v-toolbar-title>

    <v-spacer></v-spacer>
    {{ operator.loginId }}
    <v-btn icon>
      <v-icon>fas fa-user</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { OperatorState } from '@/store/operator';
@Component({
  components: {
  },
})
export default class Header extends Vue {
  @State('operator') public operator!: OperatorState;

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
