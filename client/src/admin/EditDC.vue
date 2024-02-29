<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <h1>Edit Candidat</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="updateCandidat">
        <div class="register">
          <label for="lbfamilyname">Nom</label>
          <input type="text" v-model="model.candidat.familyname" class="form-control" id="lbfamilyname" required />
          <label for="lbfirstname">Prénom</label>
          <input type="text" id="lbfirstname" v-model="model.candidat.firstname" placeholder="Enter First Name" required
            class="form-control" />
          <label for="lbemail">Email</label>
          <input type="email" v-model="model.candidat.email" placeholder="Enter Email" id="lbemail" required
            class="form-control" />
          <label for="lbtags">Tags</label>
          <input type="text" id="lbtags" v-model="model.candidat.tags" placeholder="Enter tags" class="form-control" />
          <label for="lbstatus">Status:</label>
          <div style="overflow:hidden;">
            <!--<select class="selectpicker show-tick" v-model="model.candidat.dc_status" id="lbstatus">
              <option v-bind:value="1">Initialisé</option>
              <option v-bind:value="2">Saisie Encours</option>
              <option v-bind:value="3">Finalisé</option>
              <option v-bind:value="4">Terminé</option>
            </select> 
            <select name="name" class="form-control" v-model="model.candidat.dc_status">
              <option v-for="stadc in DcStatusEnum" :value="stadc">{{ stadc }}</option>
            </select>-->
            <select name="name" class="selectpicker show-tick" v-model="model.candidat.dc_status">
              <option v-for="stadc in DcStatusList" :value="stadc.value">{{ stadc.text }}</option>
            </select>
          </div>
          <br />
          <div style="overflow:hidden;">
            <button type="submit" class="js-new">Update Candidat</button>
            <br /><br />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urldc from "../_helpers/urllist.js";
import $ from "jquery";
import DcStatusEnum from "../_helpers/enum-dcStatus";
export default {
  name: "EditCandidat",
  data() {
    return {
      error: "",
      DcStatusEnum,
      DcStatusList: [
        { value: 1, text: "Initialisé" },
        { value: 2, text: "Saisie_Encours" },
        { value: 3, text: "Finalisé" },
        { value: 4, text: "Terminé" },
      ],
      model: {
        candidat: {
          id: { type: String, required: true },
          firstname: { type: String, required: true },
          familyname: { type: String, required: true },
          email: { type: String, required: true },
          dc_status: { type: Number },
          status_name: { type: String },
          tags: { type: String },
        },
      },
    };
  },
  mounted() {
    document.getElementById("lbfamilyname").focus();
    this.getCandidatData(this.$route.params.id);
    $(document).keypress(function (e) {
      if (e.which === 13) {
        // enter has been pressed, execute a click on .js-new:
        $(".js-new").first().click();
      }
    });
  },

  methods: {
    getCandidatData(dcId) {
      const url = urldc.getDcUrl(dcId);
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200)
            this.model.candidat = res.data[0];
          if (res.status == 203) {
            this.error = res.data;
          }
        }).catch(function (err) {
          if (err.response) {
            this.error = err.response.data.errors;
          }
        });
    },

    async updateCandidat() {
      try {
        const url = urldc.getDcAdminUrl(this.model.candidat.id);
        let result = await axios.put(url, {
          familyname: this.model.candidat.familyname,
          firstname: this.model.candidat.firstname,
          email: this.model.candidat.email,
          dc_status: this.model.candidat.dc_status,
          tags: this.model.candidat.tags,
        });
        console.log(result);
        switch (result.status) {
          case 201:
            this.$router.push({ name: 'user' })
            break;
          case 202:
          case 203:
          default:
            this.error = result.data;
            break;
        }
      } catch (err) {
        this.error = err.errors;
      }
    },
  },
};
</script>