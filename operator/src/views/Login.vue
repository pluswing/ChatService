<template>
  <div>
    <h1>LOGIN</h1>
    <div>{{message}}</div>
    <input type="text" v-model="loginid">
    <br>
    <input type="password" v-model="password">
    <br>
    <button @click="login">LOGIN</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Login extends Vue {
  private message = '';
  private loginid = '';
  private password = '';

  public async login() {
    const res = await axios.post(
      'http://localhost:3000/v1/operator/authenticate',
      {
        loginid: this.loginid,
        password: this.password,
      },
    );
    console.log(res);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
