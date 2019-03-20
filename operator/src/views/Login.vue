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
import { Component, Prop, Vue } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import { Operator } from "@/models/Operator";
import { Login as LoginUsecase } from "@/usecases/Login";
import { LoginApi } from "@/repositories/LoginApi";

const loginUsecase = new LoginUsecase(new LoginApi("http://localhost:3000"));

@Component
export default class Login extends Vue {
  @Mutation("operator/loggedIn") public loggedIn!: (payload: any) => void;
  private message = "";
  private loginid = "";
  private password = "";

  public async login() {
    const o = new Operator(this.loginid, this.password);
    await loginUsecase.login(o);

    if (o.isLoggedIn()) {
      this.loggedIn(o);
      this.$router.replace({ name: "chat" });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
