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
            <h5 class="title">Historial</h5>
            <!--        <button class="btnag" @click="agregar()">
                <h5>Agregar</h5>
                <i class="fa-regular fa-square-plus"></i>
              </button> -->
          </div>

          <q-table class="tabla" flat bordered :rows="rows" :columns="columns" row-key="index" virtual-scroll
            :rows-per-page-options="[0]">
            <template v-slot:body-cell-Estado="props">
              <q-td :props="props">
                <label for="" v-if="props.row.Estado == 1" style="color: green; font-weight: bold">Activo</label>
                <label for="" v-else style="color: red; font-weight: bold">Inactivo</label>
              </q-td>
            </template>
          </q-table>
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
let xd = ref(0);

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
    name: "Hola",
    label: "Estado",
    field: "Estado",
    format: (val) => (val ? "Activo" : "Inactivo"),
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },

];



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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 25px;
  margin-top: 95px;
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
</style>