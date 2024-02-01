<template> 
  <div>
    <h1>Add Candidat</h1>
    <div class="register">
      <label for="lbnom">Nom</label> 
      <input type="text" v-model="model.dc.familyname" placeholder="Enter Family Name" id="lbnom"  class="form-control"/>
      <label for="lbprenom">Prénom</label>     
      <input type="text" v-model="model.dc.firstname" placeholder="Enter First Name" id="lbprenom" class="form-control" />
      <label for="lbemail">Email</label>
      <input type="email" v-model="model.dc.email" placeholder="Enter Email" id="lbemail" class="form-control" />
      <button v-on:click="addDC">Add Candidat</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urldc from "../_helpers/urllist.js";
export default {
  name: "AddDC",
  data() {
    return {
      errlst: "",
      model: {
        dc: {
          familyname: "",
          firstname: "",
          email: "",
        }
      }

    };
  },
  methods: {
    async addDC() {
      try{
      const url = urldc.getAddDcUrl();
      alert("url" + url );
      let result = await axios.post(url, {
        familyname: this.model.dc.familyname,
        firstname: this.model.dc.firstname,
        email: this.model.dc.email,
      });
      console.warn(result);
      if (result.status == 201) {
        alert(result.data);
        localStorage.setItem("user-info", JSON.stringify(result.data))
        this.$router.push({ name: 'user' })
      }
    }
    catch(err) {
      alert(err)
        this.errlst = err.errors
    }
    },
  },
};
</script>

<style scoped>

</style>