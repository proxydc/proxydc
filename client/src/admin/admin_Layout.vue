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
import AdminHeader from '../components/AdminHeader.vue';
import AdminNav from '../components/AdminNav.vue';
export default {
    name: 'AdminLayout',
    components: {
        AdminHeader,
        AdminNav
    },
    methods:
    {
        getUser() {
            if (localStorage.getItem('jour') != '') {
                const jour = localStorage.getItem('jour');
                const heure = localStorage.getItem('heure');
                const minute = parseInt(localStorage.getItem('minute'))+10;
                
                var current = new Date();
                if (current.getDate() == jour && current.getHours() == heure && current.getMinutes() <= minute ) {
                    alert("current: " + current);
                    alert("current min: "+current.getMinutes()+ " old minute: "+ minute);
                    localStorage.setItem('today', current);
                    return localStorage.getItem('useraccount');
                }
            }
            localStorage.setItem('useraccount', '');
            this.$router.push({ name: "Home" });
        }
    }
}
</script>