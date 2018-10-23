<template>
  <div class="pluswing_chat_service_container">
    <Minimize v-if="minimized" title="チャット" @clicked="show"/>
    <Chat v-if="!minimized" @close="hide"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Chat from './Chat.vue';
import Minimize from './Minimize.vue';

@Component({
    components: {
        Chat,
        Minimize,
    },
})
export default class App extends Vue {
    private minimized = true;

    show() {
        this.minimized = false;
    }
    hide() {
        this.minimized = true;
    }
}
</script>

<style lang="scss">
.pluswing_chat_service_container {
    @import '../css/buefy.scss';
}
</style>

<style scoped lang="scss">
.pluswing_chat_service_container {
    position: absolute;
    right: 20px;
    bottom: 0px;
}
</style>
