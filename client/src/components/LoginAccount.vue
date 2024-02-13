<template>
  <div>
    <h1>Login</h1>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
    <div class="container w-50 p-3 my-1 bg-light border border-success">
      <form class="was-validated" @submit.prevent="login">
        <div class="login">
          <label for="lblogin">Login</label>
          <input type="text" id="lblogin" v-model="login_name" placeholder="Enter Login" class="form-control" required />
          <!--  <div class="invalid-feedback">
          Please enter the login.
        </div>-->
          <label for="lbpw">Password</label>
          <input type="password" id="lbpw" v-model="pass_word" placeholder="Enter Password" class="form-control"
            required />
          <!--   <div class="invalid-feedback">
          Please enter the password.
        </div>-->
          <!--  <button type="submit" class="js-new" v-on:click="login" >Login!</button> -->
          <button type="submit" class="js-new">Login!</button>
          <!-- <p>
          <router-link to="/">Home</router-link>
        </p>-->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import urlacc from "../_helpers/urllist.js";
import axios from "axios";
import $ from "jquery";
export default {
  name: "LoginAccount",
  data() {
    return {
      msg: "",
      error: "",
      warning: "",
    };
  },
  mounted() {
    $(document).keypress(function (e) {
      if (e.which === 13) {
        // enter has been pressed, execute a click on .js-new:
        $(".js-new").first().click();
      }
    });
  },
  methods: {
    async login() {
      try {
        this.error = "";
        this.warning = "";
        let result = await axios.post(urlacc.getLoginUrl(), {
          login_name: this.login_name,
          pass_word: this.pass_word,
        },
        );
        console.log("result: " + result.status + "nnn" + result.message);
        switch (result.status) {
          case 200:
            const resp = result.data;
            localStorage.setItem(
              "token",
              "hdsfhqishiofhiqsdhfhdksqhfklmqjdmsfjildjsfioj7467d687dfsgnjklfhnglk46396fdgnlkjndflkg646346drg,fkldjg"
            );
            if (resp == 1) {
              localStorage.setItem("useraccount", "admin");
              this.$router.push({ name: "admin" });
            } else {
              localStorage.setItem("useraccount", "user");
              this.$router.push({ name: "user" });
            };
            break;
          case 202:
            this.warning = result.data;
            break;
          default:
            this.error = "Database error! Status: " + result.status + " Error: " + result.data;
            break;
        }
      } catch (err) {
        console.log("err" + err);
        this.error = err;
      }
    },
  },
};
</script>