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
            <h5 class="title">Usuarios</h5>
            <button class="btnag" @click="agregar()">
              <h5>Agregar</h5>
              <i class="fa-regular fa-square-plus"></i>
            </button>
          </div>
          <q-table class="tabla" flat bordered :rows="rows" :columns="columns" row-key="index" virtual-scroll
            :rows-per-page-options="[0]">
            <template v-slot:body-cell-Estado="props">
              <q-td :props="props">
                <label for="" v-if="props.row.Estado == 1" style="color: green; font-weight: bold">Activo</label>
                <label for="" v-else style="color: red; font-weight: bold">Inactivo</label>
              </q-td>
            </template>
            <template v-slot:body-cell-opciones="props">
              <q-td :props="props" class="opciones">
                <button class="btnedit" @click="editarusuario(props.row._id)">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btninac" @click="inactivarusuario(props.row._id)" v-if="props.row.Estado == 1">
                  <i class="fa-solid fa-xmark" style="color: #ff0000"></i>
                </button>
                <button class="btnact" @click="activarusuario(props.row._id)" v-else>
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
                <!--  <q-input filled v-model="Codigo" label="Codigo de ficha" type="number" lazy-rules :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Por favor ingrese un codigo',
                  ]" />
 -->
                <!------------------------------->

                <q-input filled v-model="Nombre" label="Nombre completo" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor ingresar el nombre del usuario',
                ]" />

                <!------------------------------->

                <q-input filled v-model="Identificacion" label="Identificacion del usuario" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor ingresar la identificacion del usuario',
                ]" />

                <!------------------------------->

                <q-input filled v-model="Telefono" label="Telefono" type="Number" :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingresar el telefono ',
                ]" />

                <!------------------------------->

                <q-input filled v-model="Correo" label="Correo " type="mail" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor ingresar el correo',
                ]" />

                <!------------------------------->

                <q-select filled v-model="Rol" label="Rol" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor ingresar el Rol',
                ]" />

                <!------------------------------->
                <q-input filled v-model="Contraseña" label="Contraseña " type="password" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor ingresar el correo',
                ]" />

              </q-card-section>

              <q-card-actions align="right" class="containerbtnmodal">
                <button flat v-close-popup class="btnagregar">Cancelar</button>
                <button class="btnagregar" @click="agregarusuario()" v-if="btnagregar">
                  Agregar
                </button>
                <button class="btnagregar" @click="agregarusuario()" v-if="btnaceptar">
                  Aceptar
                </button>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
    <!-- <div class="btn">
            <q-btn class="btns2" color="secondary" label="Ayuda" />
            <q-btn class="btns2" color="secondary" label="Ver lotes" />
        </div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useQuasar } from "quasar";
import { useusuariostore } from "../stores/Usuario.js";
const $q = useQuasar();
/* const $q = useQuasar(); */
const usuariostore = useusuariostore();
let prompt = ref(false);

let rows = ref([]);
/* let fixed = ref(false); */

let usuarios = ref([]);
const cargando = ref(false);
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
let Nombre = ref("")
let Identificacion = ref("")
let Correo = ref("")
let Telefono = ref("")
let Contraseña = ref("")
let Rol = ref("")
let idUsuarios = ref("");
let text = ref("Agregar usuarios");
let btnaceptar = ref(false);
let btnagregar = ref(true);
let xd = ref(0);
function agregar() {
  prompt.value = true;
  xd.value = 0;
  limpiar();
  text.value = "Agregar usuarios";
  btnaceptar.value = false;
  btnagregar.value = true;
}
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
    name: "Identificacion",
    label: "Identificacion",
    field: "Identificacion",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Telefono",
    label: "Telefono",
    field: "Telefono",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Correo",
    label: "Correo",
    field: "Correo",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Contraseña",
    label: "Contraseña",
    field: "Contraseña",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Rol",
    label: "Rol",
    field: "Rol",
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
async function obtenerInfo() {
  try {
    cargando.value = true;
    const response = await usuariostore.obtenerinfousuario();
    console.log(response);
    usuarios.value = usuariostore.usuario;
    rows.value = usuariostore.usuario;
  } catch (error) {
    console.log(error);
  } finally {
    cargando.value = false;
  }
}



async function agregarusuario() {
  if (xd.value == 0) {
    try {
      showDefault();
      await usuariostore.postinfousuario({

        Nombre: Nombre.value,
        Correo: Correo.value,
        Identificacion: Identificacion.value,
        Rol: Rol.value,
        Telefono: Telefono.value,
        Contraseña: Contraseña.value,
      });
      obtenerInfo();
      if (notification) {
        notification();
      }
      limpiar();
      $q.notify({
        spinner: false,
        message: "Usuario Agregado",
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
    let id = idUsuarios.value;
    if (id) {
      try {
        showDefault();
        await usuariostore.puteditarusuario(id, {
          Nombre: Nombre.value,
          Correo: Correo.value,
          Identificacion: Identificacion.value,
          Rol: Rol.value,
          Telefono: Telefono.value,
          Contraseña: Contraseña.value,
        });
        btnagregar.value = true;
        btnaceptar.value = false;
        text.value = "Agregar usuario";

        if (notification) {
          notification();
        }
        limpiar();
        $q.notify({
          spinner: false,
          message: "usuario Actualizada",
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
  Nombre.value = "";
  Identificacion.value = "";
  Correo.value = "";
  Rol.value = "";
  Telefono.value = "";
  Contraseña.value = "";
}

async function editarusuario(id) {
  prompt.value = true;
  xd.value = 1;
  const selecusuario = usuarios.value.find(
    (usuarioTT) => usuarioTT._id === id
  );
  if (selecusuario) {
    idUsuarios.value = String(selecusuario._id);
    btnagregar.value = false;
    btnaceptar.value = true;
    text.value = "Editar usuario";
    Nombre.value = selecusuario.Nombre;
    Correo.value = selecusuario.Correo;
    Identificacion.value = selecusuario.Identificacion;
    Rol.value = selecusuario.Rol;
    Contraseña.value = selecusuario.Contraseña;
    Telefono.value = selecusuario.Telefono;
  }
}


//Inactivar Usuario
async function inactivarusuario(id) {
  try {
    showDefault();
    await usuariostore.putInactivarusuario(id);
    cancelShow();
    greatMessage.value = "Usuario Inactivo";
    showGreat();
    obtenerInfo();
  } catch (error) {
    cancelShow();
    badMessage.value = error.response.data.error.errors[0].msg;
    showBad();
  }
}

// Activar usuario
async function activarusuario(id) {
  try {
    showDefault();
    await usuariostore.putActivarusuario(id);
    cancelShow();
    greatMessage.value = "Usuario Activo";
    showGreat();
    obtenerInfo();
  } catch (error) {
    cancelShow();
    badMessage.value = error.response.data.error.errors[0].msg;
    showBad();
  }
}
let notification;
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

.container {
  display: flex;
  justify-content: center;
  align-items: center;
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

.btnag:hover {
  transition: ease-in-out 0.5s;
  background-color: rgb(209, 209, 209);
}

.tabla {
  border-radius: 0px 15px 15px 15px;
}

.container2 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.header {
  display: flex;
  align-items: flex-end;
}

.titledialog {
  border-bottom: 3px solid green;
}

.modal {
  width: 550px;
  border-radius: 15px;
  text-align: center;
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

.container-table {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
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
.container2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 25px;
  margin-top: 95px;
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