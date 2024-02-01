<template>
  <div class="container">
    <!-- Tabla -->
    <div class="container-table">
      <!-- <div class="b-b">
        <q-input
          class="bbuscar te"
          v-model.lazy="searchCedula"
          label="Buscar por Codigo de ficha "
          style="width: 300px"
        />
      </div> -->

      <div class="container2">
        <div class="tabladiv">
          <q-table class="tabla" flat bordered title="Fichas" :rows="rows" :columns="columns" row-key="index"
            virtual-scroll :rows-per-page-options="[0]">
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
          </q-table>
        </div>
        <div class="form">
          <div class="q-pa-md" style="max-width: 400px">
            <h5 style="margin: 0; padding: 0px 0px 18px 0px; font-weight: bold">
              {{ text }}
            </h5>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
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

              <div class="btn-agregar">
                <button class="btnagregar" @click="agregarficha()" v-if="btnagregar">
                  Agregar
                </button>
                <button class="btnagregar" @click="agregarficha()" v-if="btnaceptar">
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
    <!--    <div class="btn">
      <q-btn class="btns2" color="secondary" label="Ayuda" />
      <q-btn class="btns2" color="secondary" label="Ver lotes" />
    </div> -->
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
let text = ref("Agregar Ficha");
let btnaceptar = ref(false);
let btnagregar = ref(true);
/* const state = reactive({
  name: null,
  age: null,
  accept: false,
});

const onSubmit = () => {
  if (state.accept !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted",
    });
  }
};

const onReset = () => {
  state.name = null;
  state.age = null;
  state.accept = false;
}; */
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
        text.value = "Agregar ficha"
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

let idficha = ref("");
async function editarficha(id) {
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
    const response = await fichastore.obtenerinfoficha();
    console.log(response);
    ficha.value = fichastore.fichas;
    rows.value = fichastore.fichas;
    obtenerarea();
  } catch (error) {
    console.log(error);
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

/* let fixed = ref(false); */
// let searchCedula = ref("");

// Filtrar Clientes
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

.b-b {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
}

.bbuscar {
  width: 170px;
  font-size: 18px;
  background-color: rgba(5, 245, 5, 0.432);
  border-radius: 9px;
  position: relative;
  top: 6px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
}

.close-button {
  color: #fff;
}

.modal-body {
  padding: 20px;
}

.modal-input {
  width: 100%;
  margin-bottom: 10px;
}

.modal-footer {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}

.action-button {
  margin-left: 10px;
}
</style>
