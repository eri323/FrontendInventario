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

          <q-table
            class="tabla"
            flat
            bordered
            :rows="rows"
            :filter="filter"
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
              <q-td class="opciones" :props="props">
                <button class="btnedit" @click="editarficha(props.row._id)">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  class="btninac"
                  @click="inactivarficha(props.row._id)"
                  v-if="props.row.Estado == 1"
                >
                  <i class="fa-solid fa-xmark" style="color: #ff0000"></i>
                </button>
                <button
                  class="btnact"
                  @click="activarficha(props.row._id)"
                  v-else
                >
                  <i class="fa-solid fa-check" style="color: #006110"></i>
                </button>
              </q-td>
            </template>
            <template v-slot:top-right>
              <q-input
                borderless
                dense
                debounce="300"
                color="primary"
                v-model="filter"
                class="buscar"
                placeholder="Buscar cualquier campo"
                id="boxBuscar"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
          </q-table>
          <q-dialog v-model="prompt" persistent class="containermodal">
            <q-card class="modal">
              <div class="titulo-linea">
                <h5 class="titulos">{{ text }}</h5>
                <div class="linea"></div>
              </div>

              <q-card-section>
                <q-form class="q-gutter-md">
                  <div class="container_input1">
                    <q-input
                      color="green"
                      filled
                      v-model="codigodeficha"
                      class="modal_input"
                      type="number"
                      label="Codigo *"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor ingrese un codigo de ficha',
                      ]"
                    >
                      <template v-slot:prepend>
                        <svg
                          class="icono"
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 32 32"
                        >
                          <circle cx="25" cy="20" r="1" fill="#999999" />
                          <path
                            fill="#999999"
                            d="M19.414 30H15v-4.414l5.034-5.034A4.607 4.607 0 0 1 20 20a5 5 0 1 1 4.448 4.966zM17 28h1.586l5.206-5.206l.54.124a3.035 3.035 0 1 0-2.25-2.25l.124.54L17 26.414zM6 8h2v8H6zM2 8h2v8H2zm16 0h2v6h-2zm-4 8h-2a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2m-2-2h2v-4h-2zM2 18h2v8H2zm12 0h2v4h-2zm-4 8H8a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2m-2-2h2v-4H8zM2 2h2v4H2zm12 0h2v4h-2zm4 0h2v4h-2zm-8 4H8a2 2 0 0 1-2-2V2h2v2h2V2h2v2a2 2 0 0 1-2 2"
                          />
                        </svg>
                      </template>
                    </q-input>
                  </div>

                  <div class="container_input1">
                    <q-input
                      color="green"
                      filled
                      v-model="nombre"
                      class="modal_input"
                      type="text"
                      label="Nombre de ficha *"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor ingrese el nombre de la ficha',
                      ]"
                    >
                      <template v-slot:prepend>
                        <svg
                          class="icono"
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 26 26"
                        >
                          <path
                            fill="#999999"
                            d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557"
                          />
                        </svg>
                      </template>
                    </q-input>
                  </div>

                  <div class="container_input1">
                    <q-select
                      color="green"
                      filled
                      v-model="niveldeformacion"
                      class="modal_select"
                      :options="opcionesNivelDeFormacion"
                      type="text"
                      label="Nivel de formacion *"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor ingrese el nivel de formacion',
                      ]"
                    >
                      <template v-slot:prepend>
                        <svg
                          class="icono"
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 512 512"
                        >
                          <path
                            d="M127 99.2V80c0-8.8-7.2-16-16-16s-16 7.2-16 16v21.5c-8.5 5.8-14 15.5-14 26.5s5.5 20.7 14 26.5V432c0 8.8 7.2 16 16 16s16-7.2 16-16V156.8c10.7-5.2 18-16.1 18-28.8s-7.3-23.6-18-28.8z"
                            fill="#999999"
                          />
                          <path
                            d="M223 292.9V80c0-8.8-7.2-16-16-16s-16 7.2-16 16v211.7c-10.1 5.4-17 16-17 28.3s6.9 22.9 17 28.3V432c0 8.8 7.2 16 16 16s16-7.2 16-16v-84.9c9-5.7 15-15.7 15-27.1s-6-21.4-15-27.1z"
                            fill="#999999"
                          />
                          <path
                            d="M319 163.3V80c0-8.8-7.2-16-16-16s-16 7.2-16 16v83.3c-9.6 5.5-16 15.9-16 27.7s6.4 22.2 16 27.7V432c0 8.8 7.2 16 16 16s16-7.2 16-16V218.7c9.6-5.5 16-15.9 16-27.7s-6.4-22.2-16-27.7z"
                            fill="#999999"
                          />
                          <path
                            d="M431 383c0-11.8-6.4-22.2-16-27.7V80c0-8.8-7.2-16-16-16s-16 7.2-16 16v275.3c-9.6 5.5-16 15.9-16 27.7s6.4 22.2 16 27.7V432c0 8.8 7.2 16 16 16s16-7.2 16-16v-21.3c9.6-5.5 16-15.9 16-27.7z"
                            fill="#999999"
                          />
                        </svg>
                      </template>
                    </q-select>
                  </div>

                  <div class="container_input1">
                    <q-input
                      color="green"
                      filled
                      v-model="fechainicio"
                      class="modal_input"
                      type="date"
                      label="Fecha de inicio *"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor ingrese la fecha de inicio',
                      ]"
                    >
                      <template v-slot:prepend>
                        <svg
                          class="icono"
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#999999"
                            d="M8 14q-.425 0-.712-.288T7 13q0-.425.288-.712T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14m4 0q-.425 0-.712-.288T11 13q0-.425.288-.712T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14m4 0q-.425 0-.712-.288T15 13q0-.425.288-.712T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z"
                          />
                        </svg>
                      </template>
                    </q-input>
                  </div>

                  <div class="container_input1">
                    <q-input
                      color="green"
                      filled
                      v-model="fechafin"
                      class="modal_input"
                      type="date"
                      label="Fecha de fin *"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor ingrese la fecha de finalizacion',
                      ]"
                    >
                      <template v-slot:prepend>
                        <svg
                          class="icono"
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#999999"
                            d="M8 13.885q-.31 0-.54-.23q-.23-.23-.23-.54q0-.31.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .309-.23.539q-.23.23-.54.23m4 0q-.31 0-.54-.23q-.23-.23-.23-.54q0-.31.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .309-.23.539q-.23.23-.54.23m4 0q-.31 0-.54-.23q-.23-.23-.23-.54q0-.31.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .309-.23.539q-.23.23-.54.23M4 21V5h3.385V2.77h1.077V5h7.153V2.77h1V5H20v16zm1-1h14v-9.385H5z"
                          />
                        </svg>
                      </template>
                    </q-input>
                  </div>

                  <div class="container_input1">
                    <q-select
                      color="green"
                      filled
                      v-model="area_id"
                      class="modal_input"
                      :options="options"
                      label="Area *"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor seleccione el area',
                      ]"
                    >
                      <template v-slot:prepend>
                        <svg
                          class="icono"
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 14 14"
                        >
                          <g
                            fill="none"
                            stroke="#999999"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              d="M11.5.5h1a1 1 0 0 1 1 1v1m-13 0v-1a1 1 0 0 1 1-1h1m3 0h3m5 5v2.75M.5 5.5v3m0 3v1a1 1 0 0 0 1 1h1m3 0h2.75"
                            />
                            <circle cx="8" cy="8" r="3.5" />
                            <path d="M10.47 10.47L13 13" />
                          </g>
                        </svg>
                      </template>
                    </q-select>
                  </div>
                  <br />

                  <div class="contenedor_botones">
                    <q-btn
                      flat
                      v-close-popup
                      class="btnagregar1"
                      type="reset"
                      label="Cancelar"
                    />
                    <q-btn
                      label="Agregar"
                      class="btnagregar2"
                      @click="agregarficha()"
                      v-if="btnagregar"
                      type="submit"
                    />
                    <q-btn
                      label="Aceptar"
                      class="btnagregar2"
                      @click="agregarficha()"
                      v-if="btnaceptar"
                      type="submit"
                    />
                  </div>
                </q-form>
              </q-card-section>
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
const filter = ref("");
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
/* const niveldeformacion = ref(null); */
const opcionesNivelDeFormacion = ref([
  { label: "Tecnico", value: "opcion1" },
  { label: "Tecnologo", value: "opcion2" },
  { label: "Auxiliar", value: "opcion3" },
  { label: "Operario", value: "opcion4" },
  { label: "Especialista", value: "opcion5" },
]);

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
/* Estilos generales */
* {
  color: black;
}

body {
  background: linear-gradient(to top, rgba(162, 211, 162, 0.774), white);
}

/* Estilos de la tabla */
.container-table {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container2 {
  margin-top: 95px;
  width: 80%;
}

.tabla {
  border-radius: 0px 15px 15px 15px;
  width: 100%;
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

.btnag:hover {
  background-color: rgb(209, 209, 209);
}

.btnag h5 {
  margin: 0;
  font-size: 15px;
  font-weight: bold;
}

/* Estilos del formulario modal */
.q-gutter-md {
  color: black;
}

.modal {
  width: 100%;
  border-radius: 15px;
  background-image: url("https://seeklogo.com/images/S/sena-logo-DEA81361FA-seeklogo.com.png");
  background-repeat: no-repeat;
  background-position: 280px;
  background-size: auto 560px;
}

.titulo-linea {
  text-align: center;
  margin-bottom: 20px;
}

.titulos {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 20px;
}

.container_input1 {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  z-index: 1;
}

.icono {
  width: 25px;
  height: 35px;
}

.contenedor_botones {
  display: flex;
  height: 50px;
  justify-content: space-between;
}

.modal_input {
  border-radius: 5px;
  z-index: 1;
}

.linea {
  border-bottom: 4px solid #21ba45;
  border-radius: 5px;
  width: 85%;
  margin: 0 auto;
}

/* Estilos de los botones de acción en la tabla */
.opciones {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btnedit {
  font-size: 20px;
  width: 40px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
}

.btninac,
.btnact {
  font-size: 23px;
  width: 40px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
}

.btninac {
  background-color: rgb(255, 186, 186);
}

.btninac:hover {
  transform: scale(1.1);
  transition: ease-in-out 0.4s;
  background-color: rgb(237, 179, 179);
}

.btnagregar2 {
  border: 1px solid #cacecb;
  background-color: #dfdbdb8c;
}

.btnagregar2:hover {
  border: 1px solid #acd6b6;
  background-color: #b3b2b28c;
}

.btnagregar1:hover {
  border: 1px solid #d6acac;
  background-color: #b3b2b28c;
}

.btnagregar1 {
  border: 1px solid #dfdfdf;
  background-color: #dfdbdb8c;
}

.btnact {
  background-color: rgb(167, 255, 167);
}

.btnact:hover {
  transform: scale(1.1);
  transition: ease-in-out 0.4s;
  background-color: rgb(71, 243, 71);
}

/* Otros estilos */
.p-carga {
  text-align: center;
}

@media only screen and (max-width: 510px) {
  .label_input {
    width: 100%;
  }
}

@media only screen and (max-width: 768px) {
  .container2 {
    margin-top: 50px;
  }
}

/* Estilos específicos para pantallas más grandes */
@media only screen and (min-width: 1200px) {
  .container2 {
    margin-top: 120px;
  }

  .modal_input {
    width: 60%;
  }
}
</style>
