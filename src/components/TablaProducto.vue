<template>
  <div class="container">
    <!-- Tabla -->
    <div class="container-table" style="height: 90vh; width: 80%">
      <h1>Productos</h1>



      <div class="q-pa-md">
        <q-table flat bordered title="Datos de productos" :rows="rows" :columns="columns" row-key="index" virtual-scroll
          :rows-per-page-options="[0]">
          <template v-slot:body-cell-Estado="props">
              <q-td :props="props">
                <label for="" v-if="props.row.Estado == 1" style="color: green; font-weight: bold">Activo</label>
                <label for="" v-else style="color: red; font-weight: bold">Inactivo</label>
              </q-td>
            </template>
            <template v-slot:body-cell-opciones="props">
              <q-td class="opciones" :props="props">
                <button class="btnedit" @click="editarficha(props.row._id)">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btninac" @click="inactivarProducto(props.row._id)" v-if="props.row.Estado == 1">
                  <i class="fa-solid fa-xmark" style="color: #ff0000"></i>
                </button>
                <button class="btnact" @click="activarProducto(props.row._id)" v-else>
                  <i class="fa-solid fa-check" style="color: #006110"></i>
                </button>
              </q-td>
            </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useQuasar } from "quasar";
import { useproductostore } from "../stores/Producto.js";
const $q = useQuasar();
const productostore = useproductostore();

let notification;
let rows = ref([]);
let productos = ref([]);



const columns = [
  { name: "Codigo", label: "Codigo", align: "center", field: "Codigo" },
  { name: "Nombre", label: "Nombre", align: "center", field: "Nombre" },
  { name: "Descripcion", label: "Descripcion", align: "center", field: "Descripcion" },
  { name: "UnidadMedida", label: "Unidad de medida", align: "center", field: "UnidadMedida" },
  { name: "PrecioUnitario", label: "Precio unitario", align: "center", field: "PrecioUnitario" },
  { name: "Iva", label: "Iva", align: "center", field: "Iva" },
  { name: "Tipo", label: "Tipo", align: "center", field: "Tipo" },
  { name: "Estado", label: "Estado", align: "center", field: "Estado", sortable: true, format: (val) => (val ? "Activo" : "Inactivo"),
  },
  { name: "opciones", label: "Opciones", align: "center", field: (row) => null, sortable: false,},];



async function obtenerInfo() {
  try {
    const response = await productostore.obtenerinfoproducto();
    productos.value = productostore.producto;
    rows.value = productostore.producto;
  } catch (error) {
    console.log(error);
  }
}



// Inactivar producto
async function inactivarProducto(id) {
  try {
    showDefault();
    await productostore.putInactivarproducto(id);
    cancelShow();
    greatMessage.value = "producto Inactiva";
    showGreat();
    obtenerInfo();
  } catch (error) {
    cancelShow();
    badMessage.value = error.response.data.error.errors[0].msg;
    showBad();
  }
}

// Activar producto
async function activarProducto(id) {
  try {
    showDefault();
    await productostore.putActivarproducto(id);
    cancelShow();
    greatMessage.value = "producto Activa";
    showGreat();
    obtenerInfo();
  } catch (error) {
    cancelShow();
    badMessage.value = error.response.data.error.errors[0].msg;
    showBad();
  }
}

let greatMessage = ref("");
let badMessage = ref("");

// Notificacion Buena
const showGreat = () => {
  notification = $q.notify({
    spinner: false,
    message: greatMessage,
    timeout: 2000,
    type: "positive",
  });
};

// Notificacion Mala
const showBad = () => {
  notification = $q.notify({
    spinner: false,
    message: badMessage,
    timeout: 2000,
    type: "negative",
  });
};

// Notificacion de Carga
const showDefault = () => {
  notification = $q.notify({
    spinner: true,
    message: "Please wait...",
    timeout: 0,
  });
};

// Cancelar Notificacion
const cancelShow = () => {
  if (notification) {
    notification();
  }
};

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

.opciones {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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

.btnedit {
  font-size: 20px;
  width: 40px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
}

.btninac {
  background-color: rgb(255, 186, 186);
  font-size: 23px;
  width: 40px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
}



.btninac:hover {
  transform: scale(1.1);
  transition: ease-in-out 0.4s;
  background-color: rgb(237, 179, 179);
}

.btnact {
  background-color: rgb(167, 255, 167);
  font-size: 20px;
  width: 40px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
}

.btnact:hover {
  transform: scale(1.1);
  transition: ease-in-out 0.4s;
  background-color: rgb(179, 239, 179);
}

.container-table h1 {
  font-family: "Gabarito", sans-serif;
  padding: 0;
  margin: 0;
}

</style>