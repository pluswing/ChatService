<template>
  <v-content>
    <Header/>
    <div class="headline" style="text-align:left;margin:10px;">Login</div>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <v-alert :value="message != ''" type="error">{{ message }}</v-alert>
        <div>
          <v-text-field v-model="loginid" label="loginID" required></v-text-field>
          <br>
          <v-text-field v-model="password" label="password" type="password" required></v-text-field>
          <br>
          <v-btn color="info" @click="login">LOGIN</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
import { Operator } from '@/models/Operator';
import { Login as LoginUsecase } from '@/usecases/Login';
import { LoginApi } from '@/repositories/LoginApi';

const loginUsecase = new LoginUsecase(new LoginApi());

@Component
export default class Login extends Vue {
  @Mutation('operator/loggedIn') public loggedIn!: (payload: any) => void;
  private message = '';
  private loginid = '';
  private password = '';

  public async login() {
    const o = new Operator(this.loginid, this.password);
    try {
      await loginUsecase.login(o);

      if (o.isLoggedIn()) {
        this.loggedIn(o);
        this.$router.replace({ name: 'user' });
      }
    } catch (e) {
      this.message = 'failed logged in.';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
