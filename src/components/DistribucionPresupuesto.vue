<template>
  <div class="a">
    <div class="aa">
      <div class="title">
        <h4>DistribucionPresupuesto</h4>
      </div>
      <div class="data">
        <q-select filled v-model="Lote_Id" :options="options" label="Filled" />
        <q-select
          filled
          v-model="ItemPresupuesto_Id"
          :options="optionsitem"
          label="Filled"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useitempresupuestostore } from "../stores/ItemPresupuesto.js";
import { uselotestore } from "../stores/Lote.js";
const itempresupuestostore = useitempresupuestostore();
const lotestore = uselotestore();
let Lote_Id = ref("");
let ItemPresupuesto_Id = ref("");
let item2 = ref("");
let item3 = ref("");
const options = ref([]);
const optionsitem = ref([]);
onMounted(() => {
  obtenerlote();
  obteneritempresupuesto();
});

/* async function fetchData() {
  const data = await lotestore.obtenerinfolote(); // Suponiendo que haya una función en tu store para obtener los datos
  Lote_Id.value = data.Lote_Id;
  item2.value = data.item2;
  item3.value = data.item3;
} */

async function obtenerlote() {
  try {
    await lotestore.obtenerinfolote();
    options.value = lotestore.lote.map((lote) => ({
      label: `${lote.Nombre} `,
      value: String(lote._id),
    }));
  } catch (error) {
    console.log(error);
  }
}
async function obteneritempresupuesto() {
  try {
    await itempresupuestostore.obtenerinfoitempresupuesto();
    optionsitem.value = itempresupuestostore.itempresupuesto.map((itempresupuesto) => ({
      label: `${itempresupuesto.Nombre} - ${itempresupuesto.Presupuesto} `,
      value: String(itempresupuesto._id),
    }));
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.a {
  height: 100vh;
}
.aa {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  display: flex;
  justify-content: center;
}
.title h4 {
  background-color: rgb(227, 227, 227);
  padding: 15px;
  border-radius: 8px;
}
.data {
  width: 60%;
  padding: 15px;
  background-color: rgb(227, 227, 227);
  border-radius: 8px;
}
</style>
