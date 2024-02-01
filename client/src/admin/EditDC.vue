<template>
  <div>
    <h1>Edit Candidat</h1>
    <h2>{{ errorlst }}</h2>
    <div class="register">
      <label for="lbfamilyname">Nom</label>
      <input
        type="text"
        v-model="model.candidat.familyname"
        class="form-control"
        id="lbfamilyname"
        disabled
      />
      <label for="lbfirstname">Prénom</label>
      <input
        type="text"
        id="lbfirstname"
        v-model="model.candidat.firstname"
        placeholder="Enter First Name"
        class="form-control"
      />
      <label for="lbemail">Email</label>
      <input
        type="email"
        v-model="model.candidat.email"
        placeholder="Enter Email"
        id="lbemail"
        class="form-control"
      />
      <label for="lbtags">Tags</label>
      <input
        type="text"
        id="lbtags"
        v-model="model.candidat.tags"
        placeholder="Enter tags"
        class="form-control"
      />
      <div>
        <label for="lbstatus">Status</label>
        <input
        type="text"
        id="lbstatus"
        list="names"
        v-model="model.candidat.status"
        placeholder="Enter status"
        class="form-control"
      />
      <datalist id="names">
        <option v-bind:value="1">Initialisé</option>
        <option v-bind:value="2">Saisie Encours</option>
        <option v-bind:value="3">Finalisé</option>
        <option v-bind:value="4">Terminé</option>
      </datalist>      
      </div>
      <button v-on:click="updateCandidat">Update Candidat</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urldc from "../_helpers/urllist.js";

export default {
  name: "EditCandidat",
  data() {
    return {
      errorlst: "",
      model: {
        candidat: {
          id: { type: String, required: true },
          firstname: { type: String, required: true },
          familyname: { type: String, required: true },
          email: { type: String, required: true },
          status: {type: Number},
          status_name: {type: String},
          tags: {type: String},
        },
      },
    };
  },
  mounted() {
    this.getCandidatData(this.$route.params.id);
  },

  methods: {
    getCandidatData(dcId) {
      const url = urldc.getDcUrl(dcId);// `http://localhost:3000/api/v1/database/dc/${dcId}`;
      alert("url: " + url);
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          this.model.candidat = res.data[0];
        })
        .catch(function (err) {
          if (err.response) {
            this.errorlst = err.response.data.errors;
          }
        });
    },

    async updateCandidat() {
      alert("status: "+ this.model.candidat.status);
      try {
        const url = urldc.getDcAdminUrl(this.model.candidat.id);
        let result = await axios.put(url, {
          familyname: this.model.candidat.familyname,
          firstname: this.model.candidat.firstname,
          email: this.model.candidat.email,
          dc_status: this.model.candidat.status,
          tags: this.model.candidat.tags,
        });
        console.log(result);
        if (result.status == 200) {
          alert(result.data);
          this.$router.push({ name: "user" });
        }
      } catch (err) {
        this.errorlst = err.errors;
      }
    },
  },
};
</script>

<style scoped>
.example {
  margin: 20px;
}

.example input {
  display: none;
}

.example label {
  margin-right: 20px;
  display: inline-block;
  cursor: pointer;
}

.ex1 span {
  display: block;
  padding: 5px 10px 5px 25px;
  border: 2px solid #ddd;
  border-radius: 5px;
  position: relative;
  transition: all 0.25s linear;
}

.ex1 span:before {
  content: "";
  position: absolute;
  left: 5px;
  top: 50%;
  -webkit-transform: translatey(-50%);
  transform: translatey(-50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #ddd;
  transition: all 0.25s linear;
}

.ex1 input:checked + span {
  background-color: #fff;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
}
.ex1 .red input:checked + span {
  color: red;
  border-color: red;
}

.ex1 .red input:checked + span:before {
  background-color: red;
}

.ex1 .blue input:checked + span {
  color: blue;
  border-color: blue;
}

.ex1 .blue input:checked + span:before {
  background-color: blue;
}
</style>