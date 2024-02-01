<template>
    <div class="ad_head">
        <h1 v-if="getUser() == 'admin'">Welcome to Admin ProxyDC</h1>
        <h1 v-else>Welcome to User ProxyDC</h1>
    </div>
</template>

<script>

export default {
    name: 'AdminHeader',
    methods:
    {
        getUser(){
           // alert("iam in get user");
            return localStorage.getItem('useraccount')
        }
    }
}

</script>

<style>
.ad_head {
    border-bottom: solid 1px black;
}
</style>