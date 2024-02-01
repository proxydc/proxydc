<template>
    <h1>Hello, Welcome to Proxy DC</h1>
    <nav>
      <router-link to="/login">Login</router-link>
    </nav>   
</template>

<script>
//import axios from "axios";
export default {
  name: "Home",
  mounted() {
      localStorage.setItem('token', '');
      localStorage.setItem('useraccount', '');
      localStorage.setItem('jour', '');
      localStorage.setItem('heure', '');
      localStorage.setItem('minute', '');
  },
 
};
</script>

