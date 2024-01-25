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
        <q-list padding>
          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section>
              <router-link to="/Home">Home</router-link>
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>

            <q-item-section>
              <router-link to="">Cambio de cuenta</router-link>
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section>
              <router-link to="/Perfil">Ver perfil</router-link>
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section>
              <router-link to="">Configuracion</router-link>
            </q-item-section>
          </q-item>
          
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

    <q-footer class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
      </q-toolbar>
    </q-footer>
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

<style>
.custom-header {
  background-color: rgba(0, 173, 0, 1);
}
</style>
