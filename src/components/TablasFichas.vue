<template>
  <div class="container">
    <!-- Tabla -->
    <div class="container-table" style="height: 90vh; width: 80%">


      <!-- <div class="b-b">
        <q-input
          class="bbuscar te"
          v-model.lazy="searchCedula"
          label="Buscar por Codigo de ficha "
          style="width: 300px"
        />
      </div> -->

      <div class="btn-agregar">
        <q-btn color="secondary" label="Agregar ➕" @click="agregarCliente()" />
      </div>
      <div class="q-pa-md">
        <q-table class="tabla" flat bordered title="Tabla fichas" :rows="rows" :columns="columns" row-key="index"
          virtual-scroll :rows-per-page-options="[0]">
          <template v-slot:body-cell-Estado="props">
            <q-td :props="props">
              <label for="" v-if="props.row.Estado == 1" style="color: green">Activo</label>
              <label for="" v-else style="color: red">Inactivo</label>
            </q-td>
          </template>
          <template v-slot:body-cell-opciones="props">
            <q-td  class="opciones" :props="props">
              <q-btn color="white" text-color="black" label="🖋️" @click="editarCliente(props.row._id)" />
              <q-btn color="white" text-color="black" label="❌" @click="inactivarficha(props.row._id)"
                v-if="props.row.Estado == 1" />
              <q-btn color="white" text-color="black" label="✅" @click="activarficha(props.row._id)" v-else />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
    <div class="btn">
      <q-btn class="btns2" color="secondary" label="Ayuda" />
      <q-btn class="btns2" color="secondary" label="Ver lotes" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useQuasar } from "quasar";
import { format } from "date-fns";
import { usefichastore } from "../stores/Fichas.js";

const fichastore = usefichastore();

const fichas = (usefichastore);
const $q = useQuasar();
let notification;


let rows = ref([]);
let ficha = ref([]);





const columns = [
  {
    name: "CodigoFicha",
    label: "Codigo De Ficha",
    field: "CodigoFicha",
    sortable: true,
    headerStyle: {
      fontWeight: 'bold',
      fontSize: '15px',
    },
    align: "center",
  },
  {
    name: "Nombre", label: "Nombre", field: "Nombre",
    headerStyle: {
      fontWeight: 'bold',
      fontSize: '15px'
    },
    align: "center",
  },
  {
    name: "NivelFormacion",
    label: "Nivel de formacion",
    field: "NivelFormacion",
    headerStyle: {
      fontWeight: 'bold',
      fontSize: '15px'
    },
    align: "center",
  },

  {
    name: "FechaInicio", label: "Fecha De Inicio", field: "FechaInicio", format: (val) => format(new Date(val), "yyyy-MM-dd"), align: "center",
    headerStyle: {
      fontWeight: 'bold',
      fontSize: '15px'
    },
    align: "center",
  },
  {
    name: "FechaFin", label: "Fecha De Fin", field: "FechaFin", format: (val) => format(new Date(val), "yyyy-MM-dd"), align: "center",
    headerStyle: {
      fontWeight: 'bold',
      fontSize: '15px'
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
      fontWeight: 'bold',
      fontSize: '15px'
    },
    align: "center",
  },
  {
    name: "opciones",
    label: "Opciones",
    field: (row) => null,
    sortable: false,
    headerStyle: {
      fontWeight: 'bold',
      fontSize: '15px'
    },
    align: "center",
  },
];
async function obtenerInfo() {
  try {
    const response = await fichastore.obtenerinfoficha();
    console.log(response);
    ficha.value = fichastore.fichas;
    rows.value = fichastore.fichas;
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
    greatMessage.value = "ficha Inactivado";
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
    greatMessage.value = "ficha Activado";
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
  };
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


.opciones{display: flex;
  gap: 6px;
}

.tabla {
  border-radius: 30px;

}

.btn {
  display: flex;
  border: none;
  cursor: pointer;
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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: row-reverse;
}

.container-table {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  margin-right: 300px;
  margin-bottom: 100px;
}

.modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container-table h1 {
  font-family: "Gabarito", sans-serif;
  padding: 0;
  margin: 0;
}

.botones button {
  margin: 2px;
}

.btn-agregar {
  width: 100%;
  margin-bottom: 5px;
  display: flex;
  justify-content: flex-end;
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
