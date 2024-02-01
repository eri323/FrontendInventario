import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import { router } from "./routes/Routes.js";
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import axios from 'axios';


const app = createApp(App)
const pinia = createPinia()

app.use(Quasar, {
    plugins: {
        Notify,
    }
})

app.use(pinia)

app.use(router)
axios.defaults.baseURL = "https://backendproyectofinal-1avx.onrender.com/api/"
/* axios.defaults.baseURL ="http://localhost:4000/api/" */

app.mount('#app')