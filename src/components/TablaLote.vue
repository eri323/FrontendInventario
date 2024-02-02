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
            <h5 class="title">Lotes</h5>
            <button class="btnag" @click="agregar()">
              <h5>Agregar</h5>
              <i class="fa-regular fa-square-plus"></i>
            </button>
          </div>
          <q-table
            flat
            bordered
            class="tabla"
            :rows="rows"
            :columns="columns"
            row-key="index"
            virtual-scroll
            :rows-per-page-options="[0]"
          >
            <template v-slot:body-cell-Estado="props">
              <q-td :props="props">
                <label
                  for=""
                  v-if="props.row.Estado == 1"
                  style="color: green; font-weight: bold"
                  >Activo</label
                >
                <label for="" v-else style="color: red; font-weight: bold"
                  >Inactivo</label
                >
              </q-td>
            </template>
            <template v-slot:body-cell-opciones="props">
              <q-td :props="props" class="opciones">
                <button class="btnedit" @click="editarlote(props.row._id)">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  class="btninac"
                  @click="inactivarlote(props.row._id)"
                  v-if="props.row.Estado == 1"
                >
                  <i class="fa-solid fa-xmark" style="color: #ff0000"></i>
                </button>
                <button
                  class="btnact"
                  @click="activarlote(props.row._id)"
                  v-else
                >
                  <i class="fa-solid fa-check" style="color: #006110"></i>
                </button>
              </q-td>
            </template>
          </q-table>
          <q-dialog v-model="prompt" persistent class="containermodal">
            <q-card class="modal">
              <q-card-section class="titledialog">
                <h5
                  style="margin: 0; padding: 0px 0px 0px 0px; font-weight: bold"
                >
                  {{ text }}
                </h5>
              </q-card-section>

              <q-card-section>
                <q-input
                  filled
                  v-model="Nombre"
                  label="Nombre"
                  type="text"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Porfavor escribe algo',
                  ]"
                />

                <q-input
                  filled
                  v-model="Presupuesto"
                  label="Presupuesto *"
                  type="number"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') ||
                      'Porfavor ingresa el presupuesto de el lote',
                  ]"
                />
              </q-card-section>

              <q-card-actions align="right" class="containerbtnmodal">
                <button flat v-close-popup class="btnagregar">Cancelar</button>
                <button
                  class="btnagregar"
                  @click="agregarlote()"
                  v-if="btnagregar"
                >
                  Agregar
                </button>
                <button
                  class="btnagregar"
                  @click="agregarlote()"
                  v-if="btnaceptar"
                >
                  Aceptar
                </button>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
    <!--  <div class="btn">
      <q-btn class="btns2" color="secondary" label="Ayuda" />
      <q-btn class="btns2" color="secondary" label="Ver lotes" />
    </div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useQuasar } from "quasar";
import { uselotestore } from "../stores/Lote.js";
/* const $q = useQuasar(); */
const lotestore = uselotestore();
let rows = ref([]);
let xd = ref(0);
let prompt = ref(false);
/* let fixed = ref(false); */
const $q = useQuasar();
let lotes = ref([]);
let text = ref("Agregar Lote");
let btnaceptar = ref(false);
let btnagregar = ref(true);

const cargando = ref(false);
function agregar() {
  prompt.value = true;
  xd.value = 0;
  limpiar();
  text.value = "Agregar lote";
  btnaceptar.value = false;
  btnagregar.value = true;
}
let notification;
let Nombre = ref("");
let Presupuesto = ref("");
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
  {
    name: "Nombre",
    label: "Nombre",
    field: "Nombre",
    sortable: true,
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Presupuesto",
    label: "Presupuesto",
    field: "Presupuesto",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Estado",
    label: "Estado",
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
    field: (row) => null,
    sortable: false,
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
];
function limpiar() {
  Nombre.value = "";
  Presupuesto.value = "";
}
async function agregarlote() {
  if (xd.value == 0) {
    try {
      showDefault();
      await lotestore.postinfolote({
        Nombre: Nombre.value,
        Presupuesto: Presupuesto.value,
      });
      obtenerInfo();
      if (notification) {
        notification();
      }
      limpiar();
      $q.notify({
        spinner: false,
        message: "Lote Agregado",
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
    let id = idlote.value;
    if (id) {
      try {
        showDefault();
        await lotestore.puteditarlote(id, {
          Nombre: Nombre.value,
          Presupuesto: Presupuesto.value,
        });
        btnagregar.value = true;
        btnaceptar.value = false;
        text.value = "Agregar lote";
        xd.value = 0;
        if (notification) {
          notification();
        }
        limpiar();
        $q.notify({
          spinner: false,
          message: "Lote Actualizado",
          timeout: 2000,
          type: "positive",
        });
        obtenerInfo();
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

let idlote = ref("");
async function editarlote(id) {
  prompt.value = true;
  xd.value = 1;
  const loteseleccionada = lotes.value.find((lote) => lote._id === id);
  if (loteseleccionada) {
    idlote.value = String(loteseleccionada._id);
    btnagregar.value = false;
    btnaceptar.value = true;
    text.value = "Editar lote";
    Nombre.value = loteseleccionada.Nombre;
    Presupuesto.value = loteseleccionada.Presupuesto;
    /*  nombre.value = loteseleccionada.Nombre;
    niveldeformacion.value = loteseleccionada.NivelFormacion;
    area_id.value = {
      label: `${loteseleccionada.Area_Id.Nombre}`,
      value: String(loteseleccionada.Area_Id._id),
    };
    fechafin.value = format(new Date(loteseleccionada.FechaFin), "yyyy-MM-dd");
    fechainicio.value = format(
      new Date(fichaseleccionada.FechaInicio),
      "yyyy-MM-dd"
    ); */
  }
}

async function obtenerInfo() {
  try {
    cargando.value = true;
    const response = await lotestore.obtenerinfolote();
    console.log(response);
    lotes.value = lotestore.lote;
    rows.value = lotestore.lote;
  } catch (error) {
    console.log(error);
  } finally {
    cargando.value = false;
  }
}
async function inactivarlote(id) {
  try {
    console.log("Inactivando lote con ID:", id);
    showDefault();
    const res = await lotestore.putInactivarlote(id);
    console.log(res);
    cancelShow();
    greatMessage.value = "Lote Inactivo";
    showGreat();
    obtenerInfo();
  } catch (error) {
    console.error("Error al inactivar lote:", error);
    cancelShow();
    badMessage.value = error.response.data.error.errors[0].msg;
    showBad();
  }
}

// Activar lote
async function activarlote(id) {
  try {
    console.log("Activando lote con ID:", id);
    showDefault();
    await lotestore.putActivarlote(id);
    cancelShow();
    greatMessage.value = "Lote Activo";
    showGreat();
    obtenerInfo();
  } catch (error) {
    console.error("Error al activar lote:", error);
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

.btn {
  display: flex;
  border: none;
  gap: 20px;
  cursor: pointer;
}

.opciones {
  display: flex;
  gap: 6px;
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
.titledialog {
  border-bottom: 3px solid green;
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
.modal {
  width: 550px;
  border-radius: 15px;
  text-align: center;
}
.header {
  display: flex;
  align-items: flex-end;
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
.btnag h5 {
  margin: 0;
  font-size: 15px;
  font-weight: bold;
}
.btnedit {
  font-size: 20px;
  width: 40px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
}

.container2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 25px;
  margin-top: 95px;
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

.btninac:hover {
  transform: scale(1.1);
  transition: ease-in-out 0.4s;
  background-color: rgb(237, 179, 179);
}

.btnedit:hover {
  transform: scale(1.1);
  transition: ease-in-out 0.4s;
  background-color: rgb(209, 209, 209);
}

.btnact i {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-table {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}

.container-table h1 {
  font-family: "Gabarito", sans-serif;
  padding: 0;
  margin: 0;
}

.botones button {
  margin: 2px;
}

.tabla {
  border-radius: 0px 15px 15px 15px;
}

.btn-agregar {
  display: flex;
  justify-content: center;
}
.containerbtnmodal {
  display: flex;
  border-top: 3px solid green;
  padding: 0;
}

</style>
