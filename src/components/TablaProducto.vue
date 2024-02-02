<template>
  <div class="container">
    <!-- Tabla -->
    <div class="container-table">
      <div class="spinner-container" v-if="cargando">
        <q-spinner-hourglass size="100px" color="light-green" />
        <p class="p-carga">Cargando...</p>
      </div>

      <div class="container2" v-else>
        <div class="tabladiv">
          <div class="header">
            <h5 class="title">Productos</h5>
            <button class="btnag" @click="agregar()">
              <h5>Agregar</h5>
              <i class="fa-regular fa-square-plus"></i>
            </button>
          </div>

          <q-table flat bordered title="" class="tabla" :rows="rows" :columns="columns" row-key="index" virtual-scroll
            :rows-per-page-options="[0]">
            <template v-slot:body-cell-Estado="props">
              <q-td :props="props">
                <label for="" v-if="props.row.Estado == 1" style="color: green; font-weight: bold">Activo</label>
                <label for="" v-else style="color: red; font-weight: bold">Inactivo</label>
              </q-td>
            </template>
            <template v-slot:body-cell-opciones="props">
              <q-td class="opciones" :props="props">
                <button class="btnedit" @click="editarProducto(props.row._id)">
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
          <q-dialog v-model="prompt" persistent class="containermodal">
            <q-card class="modal">
              <q-card-section class="titledialog">
                <h5 style="margin: 0; padding: 0px 0px 0px 0px; font-weight: bold">
                  {{ text }}
                </h5>
              </q-card-section>

              <q-card-section>
                <q-input filled v-model="Codigo" label="Codigo de ficha" type="number" lazy-rules :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese un codigo',
                ]" />

                <!------------------------------->

                <q-input filled v-model="Nombre" label="Nombre del Producto" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor ingresar el nombre del producto',
                ]" />

                <!------------------------------->

                <q-input filled v-model="Descripcion" label="Descripcion del producto" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor ingresar el producto',
                ]" />

                <!------------------------------->

                <q-input filled v-model="UnidadMedida" label="Unidad de medida" lazy-rules :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingresar la unidad de medida ',
                ]" />

                <!------------------------------->

                <q-input filled v-model="PrecioUnitario" label="Precio de unidad " type="number" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor ingresar el precio',
                ]" />

                <!------------------------------->

                <q-input filled v-model="Iva" label="Iva" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor ingresar el iva ',
                ]" />

                <!------------------------------->

                <q-input filled v-model="Tipo" label="Tipo" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor ingresar el tipo de producto ',
                ]" />
              </q-card-section>

              <q-card-actions align="right" class="containerbtnmodal">
                <button flat v-close-popup class="btnagregar">Cancelar</button>
                <button class="btnagregar" @click="agregarProducto()" v-if="btnagregar">
                  Agregar
                </button>
                <button class="btnagregar" @click="agregarProducto()" v-if="btnaceptar">
                  Aceptar
                </button>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
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
let prompt = ref(false);

let Nombre = ref("");
let Codigo = ref("");
let Descripcion = ref("");
let UnidadMedida = ref("");
let PrecioUnitario = ref("");
let Iva = ref("");
let Tipo = ref("");
let idProducto = ref("");
let text = ref("Agregar producto");
let btnaceptar = ref(false);
let btnagregar = ref(true);
let xd = ref(0);
function agregar() {
  prompt.value = true;
  xd.value = 0;
  limpiar();
  text.value = "Agregar producto";
  btnaceptar.value = false;
  btnagregar.value = true;
}
const cargando = ref(false);

const columns = [
  {
    name: "Codigo",
    label: "Codigo",
    align: "center",
    field: "Codigo",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Nombre",
    label: "Nombre",
    align: "center",
    field: "Nombre",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Descripcion",
    label: "Descripcion",
    align: "center",
    field: "Descripcion",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "UnidadMedida",
    label: "Unidad de medida",
    align: "center",
    field: "UnidadMedida",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "PrecioUnitario",
    label: "Precio unitario",
    align: "center",
    field: "PrecioUnitario",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Iva",
    label: "Iva",
    align: "center",
    field: "Iva",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Tipo",
    label: "Tipo",
    align: "center",
    field: "Tipo",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Estado",
    label: "Estado",
    align: "center",
    field: "Estado",
    sortable: true,
    format: (val) => (val ? "Activo" : "Inactivo"),
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "opciones",
    label: "Opciones",
    align: "center",
    field: (row) => null,
    sortable: false,
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
];

async function obtenerInfo() {
  try {
    cargando.value = true;
    const response = await productostore.obtenerinfoproducto();
    productos.value = productostore.producto;
    rows.value = productostore.producto;
  } catch (error) {
    console.log(error);
  } finally {
    cargando.value = false;
  }
}

async function agregarProducto() {
  if (xd.value == 0) {
    try {
      showDefault();
      await productostore.postinfoproducto({
        Codigo: Codigo.value,
        Nombre: Nombre.value,
        Descripcion: Descripcion.value,
        UnidadMedida: UnidadMedida.value,
        PrecioUnitario: PrecioUnitario.value,
        Iva: Iva.value,
        Tipo: Tipo.value,
      });
      obtenerInfo();
      if (notification) {
        notification();
      }
      limpiar();
      $q.notify({
        spinner: false,
        message: "Producto Agregado",
        timeout: 2000,
        type: "positive",
      });
    } catch (error) {
      if (notification) {
        notification();
      }
      $q.notify({
        spinner: false,
        message: `${error.response.data.error.errors[0].msg}`,
        timeout: 2000,
        type: "negative",
      });
    }
  } else {
    let id = idProducto.value;
    if (id) {
      try {
        showDefault();
        await productostore.puteditarproducto(id, {
          Codigo: Codigo.value,
          Nombre: Nombre.value,
          Descripcion: Descripcion.value,
          UnidadMedida: UnidadMedida.value,
          PrecioUnitario: PrecioUnitario.value,
          Iva: Iva.value,
          Tipo: Tipo.value,
        });
        btnagregar.value = true;
        btnaceptar.value = false;
        text.value = "Agregar Producto";

        if (notification) {
          notification();
        }
        limpiar();
        $q.notify({
          spinner: false,
          message: "Producto Actualizada",
          timeout: 2000,
          type: "positive",
        });
        obtenerInfo();
        prompt.value = false;
      } catch (error) {
        if (notification) {
          notification();
        }
        $q.notify({
          spinner: false,
          message: `${error.response.data.error.errors[0].msg}`,
          timeout: 2000,
          type: "negative",
        });
      }
    }
  }
}

function limpiar() {
  Codigo.value = "";
  Nombre.value = "";
  Descripcion.value = "";
  UnidadMedida.value = "";
  PrecioUnitario.value = "";
  Iva.value = "";
  Tipo.value = "";
}

async function editarProducto(id) {
  prompt.value = true;
  xd.value = 1;
  const selecProducto = productos.value.find(
    (productoTT) => productoTT._id === id
  );
  if (selecProducto) {
    idProducto.value = String(selecProducto._id);
    btnagregar.value = false;
    btnaceptar.value = true;
    text.value = "Editar producto";
    Codigo.value = selecProducto.Codigo;
    Nombre.value = selecProducto.Nombre;
    Descripcion.value = selecProducto.Descripcion;
    UnidadMedida.value = selecProducto.UnidadMedida;
    PrecioUnitario.value = selecProducto.PrecioUnitario;
    Iva.value = selecProducto.Iva;
    Tipo.value = selecProducto.Tipo;
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

<style lang="sass">
.my-sticky-virtscroll-table
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #00b4ff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>

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

.header {
  display: flex;
  align-items: flex-end;
}

.btnagregar {
  border: 0;
  cursor: pointer;
  padding: 14px;
  border-radius: 12px;
  font-size: 15px;
  background-color: transparent;
  font-weight: bold;
  width: 85px;
}

.containerbtnmodal {
  display: flex;
  border-top: 3px solid green;
  padding: 0;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  margin: 0;
  padding: 16px 0px;
  background-color: #21ba45;
  font-weight: bold;
  width: 20%;
  margin-left: 0px;
  border-radius: 10px 10px 0px 0px;
}

.tabla {
  border-radius: 0px 15px 15px 15px;
}

.btnag:hover {
  transition: ease-in-out 0.5s;
  background-color: rgb(209, 209, 209);
}

.titledialog {
  border-bottom: 3px solid green;
}

.modal {
  width: 550px;
  border-radius: 15px;
  text-align: center;
}

.btnag {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 8px;
  font-size: 25px;
  height: 45px;
  border: 0;
  border-radius: 0px 7px 0px 0px;
  cursor: pointer;
  background-color: rgb(227, 227, 227);
}

.btninac:hover {
  transform: scale(1.1);
  transition: ease-in-out 0.4s;
  background-color: rgb(237, 179, 179);
}

.btnag h5 {
  margin: 0;
  font-size: 15px;
  font-weight: bold;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 25px;
  margin-top: 95px;
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
  font-size: 23px;
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
