import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
import './assets/bootstrap_yeti.css'

createApp(App)
    .use(router)    
    .mount("#app");