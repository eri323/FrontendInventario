import Login from "../components/Login.vue";
import InfoPerfil from "../components/InfoPerfil.vue";
import RecuContraseña from "../components/RecuContraseña.vue";
import Registro from "../components/Registro.vue";
import Perfil from "../components/Perfil.vue";
import TablaProductos from "../components/TablaProducto.vue";



import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    { path: "/", component: Login },


    { path: "/InfoPerfil", component: InfoPerfil },
    { path: "/RecuContraseña", component: RecuContraseña },
    { path: "/Registro", component: Registro },
    { path: "/Perfil", component: Perfil },
    { path: "/TablaProductos", component: TablaProductos }


];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});