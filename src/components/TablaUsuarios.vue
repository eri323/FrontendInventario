<template>
  <div class="container">
    <!-- Tabla -->
    <div class="container-table">
      <!-- <div class="b-b">
        <q-input
          class="bbuscar te"
          v-model.lazy="searchCedula"
          label="Buscar por Codigo de usuario "
          style="width: 300px"
        />
      </div> -->
      <div class="container2">
        <div class="tabladiv">
          <q-table
            class="tabla"
            flat
            bordered
            title="Usuarios"
            :rows="rows"
            :columns="columns"
            row-key="index"
            virtual-scroll
            :rows-per-page-options="[0]"
          >
            <template v-slot:body-cell-Estado="props">
              <q-td :props="props">
                <label for="" v-if="props.row.Estado == 1" style="color: green"
                  >Activo</label
                >
                <label for="" v-else style="color: red">Inactivo</label>
              </q-td>
            </template>
            <template v-slot:body-cell-opciones="props">
              <q-td :props="props" class="opciones">
                <button class="btnedit" @click="editarusuario(props.row._id)">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  class="btninac"
                  @click="inactivarusuario(props.row._id)"
                  v-if="props.row.Estado == 1"
                >
                  <i class="fa-solid fa-xmark" style="color: #ff0000"></i>
                </button>
                <button
                  class="btnact"
                  @click="activarusuario(props.row._id)"
                  v-else
                >
                  <i class="fa-solid fa-check" style="color: #006110"></i>
                </button>
              </q-td>
            </template>
          </q-table>
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
let rows = ref([]);
/* let fixed = ref(false); */
let searchCedula = ref("");
let usuarios = ref([]);
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
    name: "Identificacion",
    label: "Descripcion",
    field: "Descripcion",
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
    const response = await usuariostore.obtenerinfousuario();
    console.log(response);
    usuarios.value = usuariostore.usuario;
    rows.value = usuariostore.usuario;
  } catch (error) {
    console.log(error);
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
.tabla {
  border-radius: 15px;
  margin-top: 25px;

}
.container2 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.tabladiv{
    display: flex;
    justify-content: center;
   padding: 50px ;
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
  flex-direction: column;
}

.container-table h1 {
  font-family: "Gabarito", sans-serif;
  padding: 0;
  margin: 0;
}
</style>
