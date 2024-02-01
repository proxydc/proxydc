<template>
  <div>
    <h1>Login</h1>
    <div
      v-if="error != ''"
      class="alert alert-danger alert-dismissible fade show"
    >
      <strong>{{ error }}</strong>
    </div>
    <div class="login">
      <input
        type="text"
        v-model="login_name"
        placeholder="Enter Login"
        class="form-control"
      />
      <input
        type="password"
        v-model="pass_word"
        placeholder="Enter Password"
        class="form-control"
      />
      <button v-on:click="login">Login!</button>
      <p>
        <router-link to="/">Home</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import urlacc from "../_helpers/urllist.js";
import axios from "axios";

export default {
  name: "LoginAccount",
  data() {
    return {
      msg: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
            let result = await axios.post(urlacc.getLoginUrl(), {
            login_name: this.login_name,
            pass_word: this.pass_word,
        });
        if (result.status == 200) {
          const resp = result.data;
         /* localStorage.setItem("jour", new Date().getDate());
          localStorage.setItem("heure", new Date().getHours());
          localStorage.setItem("minute", new Date().getMinutes());
          alert("current: " + new Date().getMinutes());*/
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
          }
        } else {
          alert("res " + result.status);
          this.error = "Login failed";
        }
      } catch (err) {
        console.log("err" + err);
        this.error = err;
      }
    },
  },
};
</script>