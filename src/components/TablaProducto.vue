<template>
  <div class="container">
    <!-- Tabla -->
    <div class="container-table" style="height: 90vh; width: 80%">
      <h1>Productos</h1>

      <!-- <div class="b-b">
        <q-input
          class="bbuscar te"
          v-model.lazy="searchCedula"
          label="Buscar por Codigo de ficha "
          style="width: 300px"
        />
      </div> -->

      <div class="btn-agregar">
        <q-btn class="btnagre" label="Agregar ➕" @click="agregarProducto()" />
      </div>
      <div class="q-pa-md">
        <q-table flat bordered title="Treats" :rows="rows" :columns="columns" row-key="index" virtual-scroll
          :rows-per-page-options="[0]">
          <template v-slot:body-cell-Estado="props">
            <q-td :props="props">
              <label for="" v-if="props.row.Estado == 1" style="color: green">Activo</label>
              <label for="" v-else style="color: red">Inactivo</label>
            </q-td>
          </template>
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props" class="botones">
              <q-btn color="white" text-color="black" label="🖋️" @click="editarProducto(props.row._id)" />
              <q-btn color="white" text-color="black" label="❌" @click="inactivarProducto(props.row._id)"
                v-if="props.row.estado == 1" />
              <q-btn color="white" text-color="black" label="✅" @click="activarProducto(props.row._id)" v-else />
            </q-td>
          </template>
        </q-table>
      </div>
      <div class="btn">
        <q-btn class="btns2"  label="Ayuda" />
        <q-btn class="btns2"  label="Ver lotes" />
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useQuasar } from "quasar";
import { useproductostore } from "../stores/Producto.js";
/* const $q = useQuasar(); */
const productostore = useproductostore();
let rows = ref([]);
/* let fixed = ref(false); */
let searchCedula = ref("");
let productos = ref([]);
// Filtrar lotes
/* function filtrarvendedores() {
    if (searchCedula.value.trim() === "") {
        rows.value = vendedores.value;
    } else {
        const searchTerm = searchCedula.value.trim().toLowerCase();
        rows.value = vendedores.value.filter((cliente) =>
            cliente.cedula.toString().toLowerCase().includes(searchTerm)
        );
    }
} */

const columns = [
  { name: "Codigo", label: "Codigo", field: "Codigo" },
  { name: "Nombre", label: "Nombre", field: "Nombre" },
  { name: "Descripcion", label: "Descripcion", field: "Descripcion" },
  { name: "UnidadMedida", label: "Unidad de medida", field: "UnidadMedida" },
  { name: "PrecioUnitario", label: "Precio unitario", field: "PrecioUnitario" },
  { name: "Iva", label: "Iva", field: "Iva" },
  { name: "Tipo", label: "Tipo", field: "Tipo" },
  {
    name: "Estado",
    label: "Estado",
    field: "Estado",
    sortable: true,
    format: (val) => (val ? "Activo" : "Inactivo"),
  },
  {
    name: "opciones",
    label: "Opciones",
    field: (row) => null,
    sortable: false,
  },
];
async function obtenerInfo() {
  try {
    const response = await productostore.obtenerinfoproducto();
    console.log(response);
    productos.value = productostore.producto;
    rows.value = productostore.producto;
  } catch (error) {
    console.log(error);
  }
}
onMounted(async () => {
  obtenerInfo();
});
</script>

<style scoped>
* {
  color: black;
}

body {
  background: linear-gradient(to top, rgba(162, 211, 162, 0.774), white);
}

.btn {
  display: flex;
  border: none;
  gap: 20px;
  cursor: pointer;
 
}

.btns2 {
  background-color: #07F769;
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  color: black;
}

.container {
  
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: row-reverse;
}

.container-table {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  
}

.modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container-table h1 {
  font-family: "Gabarito", sans-serif;
  padding: 0;
  margin: 0;
}

.botones  {
  display: flex;
  gap: 25px;
  text-align: center;
  justify-content: right;
}

.btn-agregar {
  width: 100%;
  margin-bottom: 5px;
  display: flex;
  justify-content: flex-end;
}
.btnagre{
   background-color: #07F769;
}

</style>
