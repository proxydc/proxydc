import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
/*import './assets/bootstrap_yeti.css';*/
import './assets/jquery-3.7.0.js';
import './assets/jquery.dataTables.min.js';
import './assets/dataTables.bootstrap5.min.css';
import './assets/dataTables.bootstrap5.min.js';
import './assets/bootstrap.min.css';
import $ from "jquery";

//import DataTable from 'datatables.net-bs5';
//new DataTable('#example');
createApp(App)
    .use(router)    
    .mount("#app");