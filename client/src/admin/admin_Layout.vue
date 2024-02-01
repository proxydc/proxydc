<template>
  <div class="admin">
    <div v-if="getUser() == 'admin' || getUser() == 'user'">
      <AdminHeader />
      <AdminNav />
    </div>
    <router-view />
  </div>
</template>

<script>
import AdminHeader from "../components/AdminHeader.vue";
import AdminNav from "../components/AdminNav.vue";
export default {
  name: "AdminLayout",
  components: {
    AdminHeader,
    AdminNav,
  },
  methods: {
    getUser() {
      return localStorage.getItem("useraccount");
      /* if (localStorage.getItem('jour') != '' && localStorage.getItem('useraccount')!='') {
                const jour = localStorage.getItem('jour');
                const heure = localStorage.getItem('heure');
                const minute = parseInt(localStorage.getItem('minute'));
                alert("minute: "+ minute);
                var current = new Date();
                if (current.getDate() == jour && current.getHours() == heure && current.getMinutes() <= minute ) {
                    localStorage.setItem('minute', current.getMinutes()+10);
                    alert("current: " + current);
                    alert("current min: "+current.getMinutes()+ " old minute: "+ localStorage.getItem('minute'));                    
                    return localStorage.getItem('useraccount');
                }
                localStorage.setItem('useraccount', '');
                this.$router.push({ name: "Home" });
            }*/
    },
  },
};

window.onload = function () {
  inactivityTime();
};

var inactivityTime = function () {
  var t;
  window.onload = resetTimer;
  // DOM Events
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;

  function logout() {
    //alert("You are now logged out.");
    if (localStorage.getItem("useraccount") != "") {
      localStorage.setItem("useraccount", "");
      location.href = "http://localhost:8080";
      //this.$router.push({ name: "Home" });
    }
  }
  function resetTimer() {
    clearTimeout(t);
    t = setTimeout(logout, 600000000);//10 minutes
    // 1000 milisec = 1 sec
  }
};
</script>