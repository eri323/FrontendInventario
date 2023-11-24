import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import { router } from "./Routes/Routes.js";
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
app.use(router)

app.use(pinia)
app.mount('#app')