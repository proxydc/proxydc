<template>
  <div>
    <div class="d-flex gap-2 py-3">
      <button type="button" class="btn btn-outline-primary" @click="openAddAccount()">
        Nouveau account
      </button>
    </div>
    <div class="container p-3 my-2 bg-light border border-primary">
      <div class="row">
        <div class="col">
          <table id="admintable" class="table table-striped" style="width:100%">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Login</th>
                <th scope="col">Display Name</th>
                <th scope="col">Role Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(acRow, index) in this.AcRows" :key="index">
                <th scope="row">{{ acRow.id }}</th>
                <td class="text-start">{{ acRow.login_name }}</td>
                <td class="text-start">{{ acRow.display_name }}</td>
                <td class="text-start">{{ acRow.role_name}}</td>
                <td class="text-start">
                  <a class="btn btn-success mx-2" :href="'/editAccount/' + acRow.id">
                    Edit
                  </a>
                  <button type="button" class="btn btn-danger mx-2" @click="deleteAccount(acRow.id)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import Admin_Layout from "../admin/admin_Layout.vue";
import urlacc from "../_helpers/urllist.js";
import $ from "jquery";
export default {
    name: "admin",
    data() {
        return {
            AcRows: [],
            error: "",
        };
    },
    mounted() {
        try {
         
            this.getLogins();
            console.log("data: " + this.AcRows);
        }
        catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        getLogins() {
            const url = urlacc.getLoginUrl();// 'http://localhost:3000/api/v1/database/account';
            axios.get(url).then(res => {
                console.log(res.data);
                this.AcRows = res.data;
                $(document).ready(function () {
        $('#admintable').DataTable();
      });
            });
        },
        openAddAccount() {
      this.$router.push({ name: "AddAccount" });
    },
        deleteAccount(accountId) {
            //alert("account: " + accountId);
            if (confirm('Are you sure, you want to delete this account. Account Id: ' + accountId)) {
                const url = urlacc.getEditDelAccUrl(accountId);// `http://localhost:3000/api/v1/database/account/${accountId}`;
                //alert("url: " + url);
                axios.delete(url).then(res => {
                    console.log(res.data);
                    this.getLogins();
                }).catch(function (err) {
                    if (err.response) {
                        this.errorlst = err.response.data.errors;
                    }
                });
            }
        }
    },
    components: { Admin_Layout }
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a.btn-sm {
  margin-right: 5px;
}
</style>
  