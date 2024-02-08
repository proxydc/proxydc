<template>
  <div>
    <!-- <nav class="navbar navbar-expand-lg bg-body-tertiary">-->
    <nav class="navbar navbar-dark bg-info navbar-expand-lg">
      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
        <!--  <li class="nav-item" v-if="getUser() == 'admin'">
            <a class="nav-link active" aria-current="page" href="/addAccount">Add Account</a>
          </li> -->
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="../user">Candidats</a>
          </li>
          <li class="nav-item" v-if="getUser() == 'admin'">
            <a class="nav-link active" aria-current="page" href="./admin">Users</a>
          </li>

        </ul>
        <!--  <div class="nav justify-content-end">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Se déconnecter</a>
          </li>
        </div>
         class="btn btn-outline-success btn-sm" -->
        <div class="nav justify-content-end">
          <a class="nav-link" aria-current="page" href="/">Se déconnecter</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AdminNav',
  methods:
  {
    getUser() {
      //alert("iam in get user");
      return localStorage.getItem('useraccount')
    },
    /*RedirectUser(){
      let self = this;
      self.$router.push({ name: "user" });
    }*/
  }
}
</script>