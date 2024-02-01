<template>
  <div>
    <div class="d-flex gap-2 py-3">
      <button
        type="button"
        class="btn btn-outline-primary"
        @click="openAddDC()"
      >
        Nouveau candidat
      </button>
    </div>
    <div class="container">
      <div class="row">
        <div class="col">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Tags</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(acRow, index) in this.AcRows" :key="index">
                <td>{{ acRow.familyname }}</td>
                <td>{{ acRow.firstname }}</td>
                <td>{{ acRow.email }}</td>
                <td>{{ acRow.status_name }}</td>
                <td>{{ acRow.tags }}</td>
                <td>
                  <a class="btn btn-success mx-2" :href="'/editDC/' + acRow.id">
                    Edit
                  </a>
                  <button
                    type="button"
                    class="btn btn-danger mx-2"
                    @click="deleteDC(acRow.id)"
                  >
                    Delete
                  </button>
                  <a
                    class="btn btn-outline-primary btn-sm"
                    :href="'/formCandidatSaisie/' + acRow.id"
                    target="_blank"
                  >
                    Voir le dossier
                  </a>
                  <img              
                    type="button"
                    src="../assets/copyimage.png"
                    @click="CopyUrl(acRow.id)"
                  />
                  <a
                    class="btn btn-outline-primary btn-sm mx-2"
                    :href="'/dcDownload/' + acRow.id"
                    target="_blank"
                  >
                    Download
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div>   
    </div>
  </div>
</template>
  
<script>
import Admin_Layout from "../admin/admin_Layout.vue";
import axios from "axios";
import urldc from "../_helpers/urllist.js";
export default {
  name: "user",
  data() {
    return {
      AcRows: [],
      error: "",
    };
  },
  mounted() {
    try {
      this.getDCs();
      console.log("data: " + this.AcRows);
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    getDCs() {
      const url = urldc.getDcsUrl(); 
      //alert("urldc: " + url);
      axios.get(url).then((res) => {
        console.log(res.data);
        this.AcRows = res.data;
      });
    },
    openAddDC() {
      this.$router.push({ name: "AddDC" });
    },
    deleteDC(dcId) {
      alert("DC: " + dcId);
      if (confirm("Are you sure, you want to delete this dc. DC Id: " + dcId)) {
        const url = urldc.getDelDcUrl(dcId); 
        alert("url: " + url);
        axios
          .delete(url)
          .then((res) => {
            console.log(res.data);
            this.getDCs();
          })
          .catch(function (err) {
            if (err.response) {
              this.errorlst = err.response.data.errors;
            }
          });
      }
    },
    goToDC(dcId) {
      alert("DC: " + dcId);
      let self = this;
      self.$router.push(`/formCandidatSaisie/${dcId}`);
    },
    CopyUrl(id) {
      var content = "http://localhost:8080/formCandidatSaisie/"+id;
      navigator.clipboard.writeText(content);
    },
  },

  components: { Admin_Layout },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a.btn-sm {
  margin-right: 5px;
}
img {
  border: 1px solid #ddd;
  border-radius: 1px;
  padding: 2px;
  width: 15px;
}
</style>
  