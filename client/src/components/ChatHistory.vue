<template>
  <div class="messages">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class ChatHistory extends Vue {
}
</script>

<style scoped lang="scss">
.messages {
    height: 400px;
}
</style>
