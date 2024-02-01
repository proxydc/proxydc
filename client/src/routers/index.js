import AddAccount from "../admin/AddAccount.vue";
import EditAccount from "../admin/EditAccount.vue";
import AddDC from "../admin/AddDC.vue";
import EditDC from "../admin/EditDC.vue";
import Home from "../components/Home.vue";
import LoginAccount from "../components/LoginAccount.vue";
import NotFound from "../components/NotFound";
import PageEnd from "../components/PageEnd";
import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "../_helpers/auth-guard";
import admin from "../admin/admin.vue";
import AdminLayout from "../admin/admin_Layout.vue";
import user from "../User/user.vue";
import FormCandidatSaisie from "../candidats/FormCanSaisie.vue";
import DcDownload from "../candidats/ChildComponents/DcDownload.vue";
const routes = [
    {
        path: '/adminLayout',
        name: 'adminLayout',
        component: AdminLayout,
        children: [
            { name: "admin", component: admin, path: "/admin", beforeEnter: authGuard, },
            { name: "user", component: user, path: "/user", beforeEnter: authGuard, },
            { name: "AddAccount", component: AddAccount, path: "/addAccount", beforeEnter: authGuard, },
            { name: "EditAccount", component: EditAccount, path: "/editAccount/:id", beforeEnter: authGuard, },
            { name: "AddDC", component: AddDC, path: "/addDC", beforeEnter: authGuard, },
            { name: "EditDC", component: EditDC, path: "/editDC/:id", beforeEnter: authGuard, },
            { name: "FormCandidatSaisie", component: FormCandidatSaisie, path: "/formCandidatSaisie/:id", },
            { name: "DcDownload", component: DcDownload, path: "/dcDownload/:id", beforeEnter: authGuard, },
        ]
    },
    {
        name: "Home",
        component: Home,
        path: "/",
    },
    {
        name: "LoginAccount",
        component: LoginAccount,
        path: "/login",
    },
    {
        name: "NotFound",
        component: NotFound,
        path: "/:pathMatch(.*)*",
    },
    {
        name: "PageEnd",
        component: PageEnd,
        path: "/pageEnd",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

/*router.beforeEach((to, from, next) => {
    if(to.matched[0].name =='AppDashboard')
    {
        authGuard()
    }
   // console.log(to, from)
    next()
})*/

export default router;