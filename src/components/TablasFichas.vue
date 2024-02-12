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
            <h5 class="title">Fichas</h5>
            <button class="btnag" @click="agregar()">
              <h5>Agregar</h5>
              <i class="fa-regular fa-square-plus"></i>
            </button>
          </div>

          <q-table class="tabla" flat bordered :rows="rows" :filter="filter" :columns="columns" row-key="index" virtual-scroll
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
                <button class="btninac" @click="inactivarficha(props.row._id)" v-if="props.row.Estado == 1">
                  <i class="fa-solid fa-xmark" style="color: #ff0000"></i>
                </button>
                <button class="btnact" @click="activarficha(props.row._id)" v-else>
                  <i class="fa-solid fa-check" style="color: #006110"></i>
                </button>
              </q-td>
            </template>
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" color="primary" v-model="filter" class="buscar"
                placeholder="Buscar cualquier campo" id="boxBuscar">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
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
                <q-input filled v-model="codigodeficha" label="Codigo de ficha" type="number" lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'Porfavor escribe algo',
                ]" />
                <q-input filled v-model="nombre" label="Nombre de la ficha *" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Porfavor ingresa el nombre de la ficha',
                ]" />
                <q-input filled v-model="niveldeformacion" label="NIvel de formacion *" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Porfavor ingresa el nivel de formacion de la ficha',
                ]" />
                <q-input filled v-model="fechainicio" label="Fecha de inicio *" type="date" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Porfavor ingresa la fecha de inicio de la ficha ',
                ]" />
                <q-input filled v-model="fechafin" label="Fecha fin *" type="date" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Porfavor ingresa la fecha de finalizacion de la ficha ',
                ]" />
                <q-select filled v-model="area_id" label="Area *" :options="options" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Porfavor seleccione un area ',
                ]" />
              </q-card-section>

              <q-card-actions align="right" class="containerbtnmodal">
                <button flat v-close-popup class="btnagregar">Cancelar</button>
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

  </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useQuasar } from "quasar";
import { format } from "date-fns";
import { usefichastore } from "../stores/Fichas.js";
import { useareastore } from "../stores/Area.js";
const fichastore = usefichastore();
const areastore = useareastore();
const options = ref([]);
const $q = useQuasar();
let notification;
let codigodeficha = ref("");
let nombre = ref("");
let niveldeformacion = ref("");
let fechainicio = ref("");
let fechafin = ref("");
let area_id = ref("");
const filter = ref("")
let text = ref("Agregar Ficha");
let btnaceptar = ref(false);
let btnagregar = ref(true);
let prompt = ref(false);
const cargando = ref(false);
function agregar() {
  prompt.value = true;
  xd.value = 0;
  limpiar();
  text.value = "Agregar Ficha";
  btnaceptar.value = false;
  btnagregar.value = true;
}
let rows = ref([]);
let ficha = ref([]);
let xd = ref(0);
let Area_Id = ref("");
const columns = [
  {
    name: "CodigoFicha",
    label: "Codigo De Ficha",
    field: "CodigoFicha",
    sortable: true,
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
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
    name: "NivelFormacion",
    label: "Nivel de formacion",
    field: "NivelFormacion",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },

  {
    name: "FechaInicio",
    label: "Fecha De Inicio",
    field: "FechaInicio",
    format: (val) => format(new Date(val), "yyyy-MM-dd"),
    align: "center",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "FechaFin",
    label: "Fecha De Fin",
    field: "FechaFin",
    format: (val) => format(new Date(val), "yyyy-MM-dd"),
    align: "center",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Area_id",
    label: "Area",
    field: (row) => `${row.Area_Id.Nombre}`,
    align: "center",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
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
  codigodeficha.value = "";
  nombre.value = "";
  niveldeformacion.value = "";
  fechafin.value = "";
  fechainicio.value = "";
  area_id.value = "";
}
async function agregarficha() {
  if (xd.value == 0) {
    try {
      showDefault();
      await fichastore.postinfoficha({
        CodigoFicha: codigodeficha.value,
        Nombre: nombre.value,
        NivelFormacion: niveldeformacion.value,
        FechaInicio: fechainicio.value,
        FechaFin: fechafin.value,
        Area_Id: area_id._rawValue.value,
      });
      obtenerInfo();
      if (notification) {
        notification();
      }
      limpiar();
      $q.notify({
        spinner: false,
        message: "Ficha Agregada",
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
    let id = idficha.value;
    if (id) {
      try {
        showDefault();
        await fichastore.puteditarficha(id, {
          CodigoFicha: codigodeficha.value,
          Nombre: nombre.value,
          NivelFormacion: niveldeformacion.value,
          FechaInicio: fechainicio.value,
          FechaFin: fechafin.value,
          Area_Id: area_id._rawValue.value,
        });
        btnagregar.value = true;
        btnaceptar.value = false;
        text.value = "Agregar ficha";
        if (notification) {
          notification();
        }
        limpiar();
        $q.notify({
          spinner: false,
          message: "Ficha Actualizada",
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

let idficha = ref("");
async function editarficha(id) {
  prompt.value = true;
  obtenerarea();
  xd.value = 1;
  const fichaseleccionada = ficha.value.find(
    (transporte) => transporte._id === id
  );
  if (fichaseleccionada) {
    idficha.value = String(fichaseleccionada._id);
    btnagregar.value = false;
    btnaceptar.value = true;
    text.value = "Editar Ficha";
    codigodeficha.value = fichaseleccionada.CodigoFicha;
    nombre.value = fichaseleccionada.Nombre;
    niveldeformacion.value = fichaseleccionada.NivelFormacion;
    area_id.value = {
      label: `${fichaseleccionada.Area_Id.Nombre}`,
      value: String(fichaseleccionada.Area_Id._id),
    };
    fechafin.value = format(new Date(fichaseleccionada.FechaFin), "yyyy-MM-dd");
    fechainicio.value = format(
      new Date(fichaseleccionada.FechaInicio),
      "yyyy-MM-dd"
    );
  }
}
async function obtenerInfo() {
  try {
    cargando.value = true;
    const response = await fichastore.obtenerinfoficha();
    console.log(response);
    ficha.value = fichastore.fichas;
    rows.value = fichastore.fichas;
    obtenerarea();
  } catch (error) {
    console.log(error);
  } finally {
    cargando.value = false;
  }
}

async function obtenerarea() {
  try {
    await areastore.obtenerinfoarea();
    options.value = areastore.area.map((area) => ({
      label: `${area.Nombre} `,
      value: String(area._id),
    }));
  } catch (error) {
    console.log(error);
  }
}
onMounted(async () => {
  obtenerInfo();
});

// Inactivar ficha
async function inactivarficha(id) {
  try {
    showDefault();
    await fichastore.putinactivarficha(id);
    cancelShow();
    greatMessage.value = "Ficha Inactiva";
    showGreat();
    obtenerInfo();
  } catch (error) {
    cancelShow();
    badMessage.value = error.response.data.error.errors[0].msg;
    showBad();
  }
}

// Activar ficha
async function activarficha(id) {
  try {
    showDefault();
    await fichastore.putactivarficha(id);
    cancelShow();
    greatMessage.value = "Ficha Activa";
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

</script>

<style scoped>
* {
  color: black;
}

body {
  background-image: url("../assets/fondo.jpg");
  background-attachment: fixed;
  background-size: cover;
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

.opciones {
  display: flex;
  gap: 6px;
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
  margin-top: 95px;
  width: 80%;
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

.btnag:hover {

  transition: ease-in-out 0.4s;
  background-color: rgb(209, 209, 209);
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

.btnedit:hover {
  transform: scale(1.1);
  transition: ease-in-out 0.4s;
  background-color: rgb(209, 209, 209);
}

.btnact i {
  margin: 0;
  padding: 0;
}

.modal {
  width: 550px;
  border-radius: 15px;
  text-align: center;
}

.titledialog {
  border-bottom: 3px solid green;
}

.tabla {
  border-radius: 0px 15px 15px 15px;
  width: 100%;
}


.container-table {
  display: flex;
  align-items: center;
  justify-content: center;
}



.container-table h1 {
  font-family: "Gabarito", sans-serif;
  padding: 0;
  margin: 0;
}
</style>
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