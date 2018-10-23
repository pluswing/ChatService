<template>
  <div class="chat_container">
      <Header title="チャット" @close="onClickClose"/>
      <ChatHistory/>
      <ChatInputForm/>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import Header from './Header.vue';
import ChatHistory from './ChatHistory.vue';
import ChatInputForm from './ChatInputForm.vue';

@Component({
    components: {
        Header,
        ChatHistory,
        ChatInputForm,
    },
})
export default class Chat extends Vue {

    mounted() {
    }

    @Emit() public close() {
    }

    public onClickClose() {
        this.close();
    }
}
</script>

<style scoped lang="scss">
.chat_container {
    width: 380px;
    background-color: white;
}
</style>
