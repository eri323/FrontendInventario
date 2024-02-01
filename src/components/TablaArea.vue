<template>
  <div class="container">
    <!-- Tabla -->
    <div class="container-table" style="height: 90vh; width: 80%">
      <!-- <div class="b-b">
        <q-input
          class="bbuscar te"
          v-model.lazy="searchCedula"
          label="Buscar por Codigo de area "
          style="width: 300px"
        />
      </div> -->

      <div class="container2">
        <div class="tabladiv">
          <div class="header">
            <h5 class="title">
              Areas
            </h5>
            <button class="btnag" @click="prompt = true">
              <h5>Agregar</h5>
              <i class="fa-regular fa-square-plus"></i>
            </button>
          </div>
          <q-table flat bordered class="tabla" :rows="rows" :columns="columns" row-key="index" virtual-scroll
            :rows-per-page-options="[0]">
            <template v-slot:body-cell-Estado="props">
              <q-td :props="props">
                <label for="" v-if="props.row.Estado == 1" style="color: green; font-weight: bold">Activo</label>
                <label for="" v-else style="color: red; font-weight: bold">Inactivo</label>
              </q-td>
            </template>
            <template v-slot:body-cell-opciones="props">
              <q-td :props="props" class="opciones">
                <button class="btnedit" @click="editararea(props.row._id)">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btninac" @click="inactivararea(props.row._id)" v-if="props.row.Estado == 1">
                  <i class="fa-solid fa-xmark" style="color: #ff0000"></i>
                </button>

                <button class="btnact" @click="activararea(props.row._id)" v-else>
                  <i class="fa-solid fa-check" style="color: #006110"></i>
                </button>
              </q-td>
            </template>
          </q-table>
          <q-dialog v-model="prompt" persistent class="containermodal">
            <q-card class="modal">
              <q-card-section class="titledialog">
                <h5 style="margin: 0; padding: 0px 0px 0px 0px; font-weight: bold">{{ text }}</h5>
              </q-card-section>

              <q-card-section>
                <q-input filled v-model="Nombre" label="Nombre" type="text" lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'Porfavor escribe algo',
                ]" />
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup />
                <button class="btnagregar" @click="agregarficha()" v-if="btnagregar">
                  Agregar
                </button>
                <button class="btnagregar" @click="agregarficha()" v-if="btnaceptar">
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
import { useareastore } from "../stores/Area.js";
/* const $q = useQuasar(); */
const areastore = useareastore();
let rows = ref([]);
let xd = ref(0);
/* let fixed = ref(false); */
const $q = useQuasar();
let Nombre = ref("");
let areas = ref([]);
let text = ref("Agregar area");
let btnaceptar = ref(false);
let btnagregar = ref(true);
// Filtrar Areas
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
let notification;
const columns = [
  {
    name: "Nombre",
    label: "Nombre",
    field: "Nombre",
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
}
async function agregararea() {
  if (xd.value == 0) {
    try {
      showDefault();
      await areastore.postinfoarea({
        Nombre: Nombre.value,
      });
      obtenerInfo();
      if (notification) {
        notification();
      }
      limpiar();
      $q.notify({
        spinner: false,
        message: "Area Agregada",
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
    let id = idarea.value;
    if (id) {
      try {
        showDefault();
        await areastore.puteditararea(id, {
          Nombre: Nombre.value,
        });
        btnagregar.value = true;
        btnaceptar.value = false;
        text.value = "Agregar area";
        xd.value = 0;
        if (notification) {
          notification();
        }
        limpiar();
        $q.notify({
          spinner: false,
          message: "Area Actualizada",
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

let idarea = ref("");
async function editararea(id) {
  xd.value = 1;
  const areaseleccionada = areas.value.find((area) => area._id === id);
  if (areaseleccionada) {
    idarea.value = String(areaseleccionada._id);
    btnagregar.value = false;
    btnaceptar.value = true;
    text.value = "Editar Area";
    Nombre.value = areaseleccionada.Nombre;
    /* nombre.value = areaseleccionada.Nombre;
        niveldeformacion.value = areaseleccionada.NivelFormacion;
        area_id.value = {
            label: `${areaseleccionada.Area_Id.Nombre}`,
            value: String(areaseleccionada.Area_Id._id),
        };
        fechafin.value = format(new Date(areaseleccionada.FechaFin), "yyyy-MM-dd");
        fechainicio.value = format(
            new Date(areaseleccionada.FechaInicio),
            "yyyy-MM-dd"
        ); */
  }
}
async function obtenerInfo() {
  try {
    const response = await areastore.obtenerinfoarea();
    console.log(response);
    areas.value = areastore.area;
    rows.value = areastore.area;
  } catch (error) {
    console.log(error);
  }
}
async function inactivararea(id) {
  try {
    showDefault();
    await areastore.putinactivararea(id);
    cancelShow();
    greatMessage.value = "Area Inactiva";
    showGreat();
    obtenerInfo();
  } catch (error) {
    cancelShow();
    badMessage.value = error.response.data.error.errors[0].msg;
    showBad();
  }
}

async function activararea(id) {
  try {
    showDefault();
    await areastore.putactivararea(id);
    cancelShow();
    greatMessage.value = "Area Activa";
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
.header {
  display: flex;
  justify-content: space-between;
}
.title{
  margin: 0;
  font-weight: bold;
  padding-left: 15px;
}
.btnag {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  font-size: 25px;
  padding: 10px;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
  margin-bottom: 10px;
}

.btnag h5 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.opciones {
  display: flex;
  justify-content: center;
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

.tabla {
  border-radius: 15px;
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
