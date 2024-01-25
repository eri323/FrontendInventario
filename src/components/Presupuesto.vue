<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-secondary text-white q-my-md shadow-2">
      <q-select
        filled
        v-model="selectedOption"
        options-dense
        label="Rol: User"
        emit-value
        map-options
        :options="selectOptions"
        behavior="menu"
        input-debounce="0"
      >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>

        <template v-slot:option="slotProps">
          <q-item class="bg-secondary" :props="slotProps.itemProps">
            <q-item-section avatar>
              <q-icon :name="slotProps.opt.icon" />
            </q-item-section>
            <q-item-section>{{ slotProps.opt.label }}</q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-space />
      <q-space />

      <q-btn-toggle
        v-model="model"
        flat
        stretch
        toggle-color="yellow"
        :options="options"
      />

      <div class="q-ml-sm" style="display: flex; gap: 1rem">
        <q-input
          filled
          v-model="search1"
          dense
          placeholder=" Busqueda de presupuesto"
          ><template v-slot:prepend> <q-icon name="search" /> </template
        ></q-input>
        <q-input filled v-model="search2" dense placeholder="Busqueda avanzada"
          ><template v-slot:prepend> <q-icon name="search" /> </template
        ></q-input>
      </div>

      <q-space />
    </q-toolbar>
  </div>

  <div>
    <h3 class="text-center">Presupuesto de programa</h3>
  </div>

  <div class="q-pa-xl">
    <div class="q-d-flex row justify-around">
      <q-card class="q-mb-md">
        <q-card-section>
          <q-img
            src="../assets/transparencia.png"
            alt="Card image"
            style="width: 180px; height: 180px"
          />
        </q-card-section>
        <q-card-section>
          <div class="text-h6 text-center">Programa ser</div>
        </q-card-section>
      </q-card>

      <q-card class="q-mb-md">
        <q-card-section>
          <q-img
            src="../assets/transparencia.png"
            alt="Card image"
            style="width: 180px; height: 180px"
          />
        </q-card-section>
        <q-card-section>
          <div class="text-h6 text-center">Senova</div>
        </q-card-section>
      </q-card>

      <q-card class="q-mb-md">
        <q-card-section>
          <q-img
            src="../assets/transparencia.png"
            alt="Card image"
            style="width: 180px; height: 180px"
          />
        </q-card-section>
        <q-card-section>
          <div class="text-h6 text-center">Card 3</div>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <div class="row justify-start q-pa-xl">
    <q-btn label="¿Ayuda?" type="submit" color="secondary" />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      model: ref("one"),
      search1: ref(""),
      search2: ref(""),
      selectedOption: null,

      selectOptions: [
        {
          label: "Cambio de cuenta",
          value: "cambio-cuenta",
          icon: "account_circle",
        },
        { label: "Ver perfil", value: "ver-perfil", icon: "person" },
        { label: "Configuración", value: "configuracion", icon: "settings" },
      ],

      options: [
        { label: "Descargar datos en pdf", value: "Descargarpdf" },
        { label: "Descargar datos CSV o EXEL", value: "two" },
      ],
    };
  },
};
</script>

<style scoped></style>
