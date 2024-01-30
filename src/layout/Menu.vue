<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="custom-header">
      <q-toolbar class="bg-positive">
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
          text-color="white"
        />

        <q-toolbar-title class="text-white">
          <q-icon name="business" style="font-size: 2rem; color: white" />
          Inventario
        </q-toolbar-title>

        <q-input
          filled
          v-model="searchQuery"
          dense
          placeholder="Buscar..."
          style="max-width: 250px"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          dense
          flat
          icon="picture_as_pdf"
          @click="printToPDF"
          class="q-ml-md"
          text-color="white"
          >Imprimir PDF</q-btn
        >

        <q-btn
          dense
          flat
          icon="table_chart"
          @click="exportToExcel"
          class="q-ml-md"
          >Imprimir Excel</q-btn
        >
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile">
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px">
        <q-list padding class="list">
          <div class="div">
            <q-item-section avatar>
              <i class="fa-solid fa-house"></i>
            </q-item-section>

            <q-item-section>
              <router-link to="/Home">Home</router-link>
            </q-item-section>
          </div>

          <div>
            <q-item-section avatar>
              <i class="fa-solid fa-users-line"></i>
            </q-item-section>

            <q-item-section>
              <router-link to="./TablaFichas">Fichas</router-link>
            </q-item-section>
          </div>
          <div>
            <q-item-section avatar>
              <i class="fa-solid fa-boxes-packing"></i>
            </q-item-section>

            <q-item-section>
              <router-link to="./TablaProductos">Productos</router-link>
            </q-item-section>
          </div>
          <div>
            <q-item-section avatar>
              <i class="fa-solid fa-address-card"></i>
            </q-item-section>

            <q-item-section>
              <router-link to="./TablaUsuarios">Usuarios</router-link>
            </q-item-section>
          </div>
          <div>
            <q-item-section avatar>
              <i class="fa-solid fa-network-wired"></i>
            </q-item-section>

            <q-item-section>
              <router-link to="./TablaArea">Areas</router-link>
            </q-item-section>
          </div>
          <div>
            <q-item-section avatar>
              <i class="fa-solid fa-layer-group"></i>
            </q-item-section>

            <q-item-section>
              <router-link to="./TablaLotes">Lotes</router-link>
            </q-item-section>
          </div>

          <div>
            <q-item-section avatar>
              <i class="fa-solid fa-user"></i>
            </q-item-section>

            <q-item-section>
              <router-link to="/Perfil">Ver perfil</router-link>
            </q-item-section>
          </div>

          <div>
            <q-item-section avatar>
              <i class="fa-solid fa-gear"></i>
            </q-item-section>

            <q-item-section>
              <router-link to="">Configuracion</router-link>
            </q-item-section>
          </div>
        </q-list>
      </q-scroll-area>
      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
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

    <!--   <q-footer class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>

<style scoped>
.custom-header {
  background-color: rgba(0, 173, 0, 1);
}
.list div {
  display: flex;
  padding: 5px;
  justify-content: center;
  color: black;
}
.div:hover{
background-color: gray;
}
.list div a{
  text-decoration: none;
}
</style>
