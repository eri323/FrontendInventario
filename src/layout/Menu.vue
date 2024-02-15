<template>
  <q-layout view="hHh LpR fFf" class="body">
    <q-header class="custom-header">
      <q-toolbar class="bg-positive">
        <button dense flat @click="toggleLeftDrawer" class="btnmenu"> <i class="fa-solid fa-bars"></i>
        </button>

        <q-toolbar-title class="text-white">
          <i class="fa-solid fa-city"></i>
          Inventario
        </q-toolbar-title>

        <router-link to="./DistribucionPresupuesto">
          <button class="btndispre">
            Distribucion de presupuesto
          </button>
        </router-link>
        <q-input filled v-model="searchQuery" dense placeholder="Buscar..." style="max-width: 250px">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        

        <button dense flat src="/" @click="confirm" class="btnlogout">
          <i class="fa-solid fa-right-from-bracket"></i>


        </button>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile">
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px">
        <q-list padding class="list">
          <router-link to="/Home">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-house"></i>
              </q-item-section>
              <q-item-section>
                <h6>Inicio</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link to="./TablaFichas">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-users-line"></i>
              </q-item-section>

              <q-item-section>
                <h6>Fichas</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link to="./TablaProductos">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-boxes-packing"></i>
              </q-item-section>

              <q-item-section>
                <h6>Productos</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link to="./TablaUsuarios">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-address-card"></i>
              </q-item-section>

              <q-item-section>
                <h6>Usuarios</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link to="./TablaArea">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-network-wired"></i>
              </q-item-section>

              <q-item-section>
                <h6>Areas</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link to="./TablaLotes">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-layer-group"></i>
              </q-item-section>

              <q-item-section>
                <h6>Lotes</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link to="./TablaPedidos">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-truck-ramp-box"></i>
              </q-item-section>

              <q-item-section>
                <h6>Pedidos</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link to="/Perfil">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-user"></i>
              </q-item-section>

              <q-item-section>
                <h6>Perfil</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link to="./TablaHistorial">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-book-bookmark"></i>
              </q-item-section>

              <q-item-section>
                <h6>Historial</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link to="./ItemPresupuesto">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-money-check-dollar"></i>
              </q-item-section>

              <q-item-section>
                <h6>Item Presupuesto</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link to="">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-gear"></i>
              </q-item-section>

              <q-item-section>
                <h6>Configuracion</h6>
              </q-item-section>
            </div>
          </router-link>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from 'quasar'
import { useusuariostore } from "../stores/Usuario.js";

const usuariostore = useusuariostore();
const $q = useQuasar()

let nombreUsuario = ref("");
let rolUsuario = ref("");

async function obtenerInfo() {
  try {
    cargando.value = true;
    const response = await usuariostore.obtenerinfousuario();
    console.log(response);
    usuarios.value = usuariostore.usuario;
    rows.value = usuariostore.usuario;
  } catch (error) {
    console.log(error);
  } finally {
    cargando.value = false;
  }
}

function confirm() {
  $q.dialog({
    title: 'Cerrar sesion',
    message: '¿Deseas cerrar sesion?',
    cancel: true,
    persistent: true,
    html: true,
    style: {
      width: '400px',
      borderRadius: '6px',
      padding: '10px',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      fontSize: '18px',
      fontFamily: 'save',
    },
    ok: {
      label: 'Sí',
      color: 'primary',
      push: true
    },
    cancel: {
      label: 'No',
      color: 'negative',
      push: true
    }
  }).onOk(() => {
    goToHome();
  }).onOk(() => {
    // console.log('>>>> second OK catcher')
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

const leftDrawerOpen = ref(false);
const router = useRouter();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function goToHome() {
  localStorage.removeItem("token");
  console.log("Sesión cerrada. Redirigiendo a la página de inicio...");
  router.push("/");
}
</script>

<style scoped>
.custom-header {
  background-color: rgba(0, 173, 0, 1);
}

.btnlogout {
  background: transparent;
  border: 0;
  margin: 0;
  padding: 0px 10px;
  font-size: 25px;
  color: white;
  cursor: pointer;
}

.btnlogout:hover {
  background: rgba(255, 255, 255, 0.11);
  border-radius: 8px;
}

.btnmenu:hover {
  background: rgba(255, 255, 255, 0.11);
  border-radius: 8px;
}

.btnmenu {
  background: transparent;
  border: 0;
  margin: 0;
  padding: 0px 10px;
  font-size: 25px;
  color: white;
  cursor: pointer;
}

.btnmenu i {
  margin: 0;
  padding: 0;
}

.list {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

@font-face {
  font-family: "save";
  src: url("../fonts/Anta-Regular.ttf");
}

.list div {
  display: grid;
  grid-template-columns: 25% 75%;
  padding: 5px 0px;
  padding-left: 0;
  color: #000;
  /* Color de texto para los elementos del menú */
  transition: background-color 0.3s ease;
  align-items: center;
}

.div:hover {
  background-color: rgba(61, 153, 61, 0.453);
}

.list a {
  text-decoration: none;
  color: #333;
  /* Color de texto para los enlaces */
}

.list div h6 {
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  font-family: "save";
}

.list div i {
  font-size: 1.5rem;
  padding-left: 20px;

}

.body {
  background: linear-gradient(to top, rgba(162, 211, 162, 0.774), white);
}

.btndispre {
  background: transparent;
  border: 0;
  color: white;
  font-family: "save";
  font-size: 20px;
  padding: 5px;
  cursor: pointer;
}

.btndispre:hover {
  background: rgba(255, 255, 255, 0.11);
  border-radius: 8px;
}
</style>
