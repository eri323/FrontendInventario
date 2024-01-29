<template>
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
          <div class="text-h6 text-center">"Senova"</div>
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
      options: [
        { label: "Descargar datos en pdf", value: "Descargarpdf" },
        { label: "Descargar datos CSV o EXEL", value: "two" },
      ],
    };
    
  },
};
</script>

<style scoped>
</style>

