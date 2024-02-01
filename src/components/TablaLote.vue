<template>
  <div class="container">
    <!-- Tabla -->
    <div class="container-table">
      <div class="container2">
        <div class="tabladiv">
          <q-table
            flat
            bordered
            title="Lotes"
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
        </div>
        <div class="form">
          <div class="q-pa-md" style="max-width: 400px">
            <h5 style="margin: 0; padding: 0px 0px 18px 0px; font-weight: bold">
              {{ text }}
            </h5>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
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

              <div class="btn-agregar">
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
              </div>
              <!--  <div>
                        <q-btn label="Submit" type="submit" color="primary" />
                        <q-btn
                          label="Reset"
                          type="reset"
                          color="primary"
                          flat
                          class="q-ml-sm"
                        />
                      </div> -->
            </q-form>
          </div>
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
/* let fixed = ref(false); */
const $q = useQuasar();
let lotes = ref([]);
let text = ref("Agregar Lote");
let btnaceptar = ref(false);
let btnagregar = ref(true);
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
        xd.value= 0;
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
        fixed.value = false;
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
    const response = await lotestore.obtenerinfolote();
    console.log(response);
    lotes.value = lotestore.lote;
    rows.value = lotestore.lote;
  } catch (error) {
    console.log(error);
  }
}
async function inactivarlote(id) {
  try {
    showDefault();
    await lotestore.putInactivarlote(id);
    cancelShow();
    greatMessage.value = "lote Inactivo";
    showGreat();
    obtenerInfo();
  } catch (error) {
    cancelShow();
    badMessage.value = error.response.data.error.errors[0].msg;
    showBad();
  }
}

// Activar lote
async function activarlote(id) {
  try {
    showDefault();
    await lotestore.putActivarlote(id);
    cancelShow();
    greatMessage.value = "lote Activo";
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
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  margin-top: 25px;
  width: 20%;
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

.tabladiv {
  width: 60%;
}
.btns2 {
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-left: 20px;
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
  border-radius: 30px;
}
.btn-agregar {
  display: flex;
  justify-content: center;
}

.btnagregar {
  border: 0;
  cursor: pointer;
  padding: 8px;
  border-radius: 12px;
  background-color: rgb(227, 227, 227);
  font-weight: bold;
  width: 85px;
}
.btnagregar:hover {
  transform: scale(1.1);
  transition: ease-in-out 0.4s;
  background-color: rgb(209, 209, 209);
}
</style>
