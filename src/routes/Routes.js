import Login from "../components/Login.vue";
import InfoPerfil from "../components/InfoPerfil.vue";
import RecuContrasena from "../components/RecuContrasena.vue";
import Registro from "../components/Registro.vue";
import Perfil from "../components/Perfil.vue";
import TablaProductos from "../components/TablaProducto.vue";
import TablaFichas from "../components/TablasFichas.vue";
import RolDeCuenta from "../components/RolDeCuenta.vue";


import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    { path: "/", component: Login },


    { path: "/InfoPerfil", component: InfoPerfil },
    { path: "/RecuContrasena", component: RecuContrasena },
    { path: "/Registro", component: Registro },
    { path: "/Perfil", component: Perfil },
    { path: "/TablaProductos", component: TablaProductos },
    { path: "/TablaFichas", component: TablaFichas },
    { path: "/RolDeCuenta", component: RolDeCuenta }


];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});