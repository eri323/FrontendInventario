import Login from "../components/Login.vue";
import InfoPerfil from "../components/InfoPerfil.vue";
import RecuContrasena from "../components/RecuContrasena.vue";
import Registro from "../components/Registro.vue";
import Perfil from "../components/Perfil.vue";
import TablaProductos from "../components/TablaProducto.vue";
import TablaFichas from "../components/TablasFichas.vue";
import TablaArea from "../components/TablaArea.vue";
import TablaLotes from "../components/TablaLote.vue";
import TablaUsuarios from "../components/TablaUsuarios.vue";
import RolDeCuenta from "../components/RolDeCuenta.vue";
import Home from "../components/Home.vue";
import TablaHistorial from "../components/TablaHistorial.vue";
import Menu from "../layout/Menu.vue";


import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: Login },
  {
    path: "/Menu",
    component: Menu,
    children: [
      { path: "/Home", component: Home },
      { path: "/InfoPerfil", component: InfoPerfil },
      { path: "/RecuContrasena", component: RecuContrasena },
      { path: "/Registro", component: Registro },
      { path: "/Perfil", component: Perfil },
      { path: "/TablaProductos", component: TablaProductos },
      { path: "/TablaFichas", component: TablaFichas },
      { path: "/TablaArea", component: TablaArea },
      { path: "/TablaUsuarios", component: TablaUsuarios },
      { path: "/TablaLotes", component: TablaLotes },
      { path: "/TablaHistorial", component: TablaHistorial },
      { path: "/RolDeCuenta", component: RolDeCuenta },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
