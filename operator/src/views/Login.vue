<template>
  <v-layout style="height:100%;" class="grey darken-1">
    <v-flex xs4 offset-xs4 style="margin-top:100px;">
      <v-alert :value="message != ''" type="error">{{ message }}</v-alert>
      <div>
        <v-text-field v-model="loginid" label="loginID" required single-line solo />
        <v-text-field
          v-model="password"
          label="password"
          type="password"
          required
          single-line
          solo
        />
        <v-btn block color="info" @click="login">LOGIN</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Operator } from '@/models/Operator';
import { LoginApi } from '@/repositories/LoginApi';
import { LoginUsecase } from '@/usecases/LoginUsecase';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
import { initApi } from '../repositories/api';

@Component({
  components: {
  },
})
export default class Login extends Vue {
  @Mutation('operator/loggedIn') public loggedIn!: (payload: any) => void;
  private message = '';
  private loginid = '';
  private password = '';

  public async login() {
    const o = new Operator(this.loginid, this.password);
    try {
      await new LoginUsecase(new LoginApi()).execute(o);

      if (o.isLoggedIn()) {
        this.loggedIn(o);
        this.$router.replace({ name: 'users' });
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
