<template>
  <v-navigation-drawer v-model="show" absolute temporary>
    <v-list class="pa-1">
      <v-list-tile v-for="item in items" :key="item.title" @click="clickItem(item)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
@Component({
  components: {
  },
})
export default class Sidebar extends Vue {
  @Prop() public show!: boolean;

  public items: Array<{ [key: string]: string }> = [
    { title: 'Users', icon: 'fas fa-user-friends', page: 'users' },
    { title: 'Activities', icon: 'fas fa-history', page: 'activities' },
  ];

  @Emit() public close() { }

  @Watch('show')
  public watchShow() {
    if (!this.show) {
      this.close();
    }
  }

  public clickItem(item: { [key: string]: string }) {
    this.$router.push({
      name: item.page,
    });
    this.close();
  }
}
</script>
