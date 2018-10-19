<template>
  <div class="hello">
      はろー
      <p>A</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {
    },
})
export default class App extends Vue {
    mounted() {
        const connection = new WebSocket('ws://localhost:3000');
        connection.onopen = function () {
            // メッセージの送信
            connection.send('こんにちは世界');
        };

        // エラーが出た場合
        connection.onerror = function (error) {
            console.error(error);
        };

        // メッセージを受け取った場合
        connection.onmessage = function (e) {
            console.log(e);
        };
    }
}
</script>

<style scoped lang="scss">
.hello {
    font-weight: bold;
    p {
        color: green;
    }
}
</style>