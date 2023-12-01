<template>
    <div class="container">
      <!-- Modal -->
      <q-dialog v-model="fixed" class="modal-container">
        <!-- ... (código del modal) ... -->
      </q-dialog>
  
      <!-- Tabla -->
      <div class="container-table" style="height: 90vh; overflow-y: auto; width: 80%">
        <h1>Tabla productos</h1>
  
        <div class="b-b">
          <q-input class="bbuscar" v-model="searchCedula" label="Buscar por Cedula" style="width: 300px" @input="filtrarClientes"/>
          <q-btn class="btnbuscar" color="primary" label="Buscar" @click="filtrarClientes"/>
        </div>
  
        <div class="btn-agregar">
          <q-btn color="secondary" label="Agregar ➕" @click="agregarCliente()" />
        </div>
  
        <q-table title="Clientes" :rows="rows" :columns="columns" row-key="name">
          <template v-slot:body-cell-estado="props">
            <q-td :props="props">
              <label for="" v-if="props.row.estado == 1" style="color: green">Activo</label>
              <label for="" v-else style="color: red">Inactivo</label>
            </q-td>
          </template>
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props" class="botones">
              <q-btn color="white" text-color="black" label="🖋️" @click="editarCliente(props.row._id)"/>
              <q-btn color="white" text-color="black" label="❌" @click="inactivarCliente(props.row._id)" v-if="props.row.estado == 1"/>
              <q-btn color="white" text-color="black" label="✅" @click="activarCliente(props.row._id)" v-else />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useQuasar } from "quasar";
  
  const $q = useQuasar();
  
  let rows = ref([]);
  let fixed = ref(false);
  let text = ref("");
  let cedula = ref();
  let nombre = ref();
  let telefono = ref("");
  let cambio = ref(0);
  let searchCedula = ref("");
  
  // Filtrar Clientes
  function filtrarClientes() {
    if (searchCedula.value.trim() === "") {
      rows.value = clientes.value; 
    } else {
      rows.value = clientes.value.filter((cliente) =>cliente.cedula.toString().includes(searchCedula.value.toString()));
    }
  }

  </script>
  
  <style scoped>

.container {
  display: flex;
  justify-content: center;
}
.modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
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

.modal-content {
  width: 400px;
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
  margin-top: 30px;
  gap: 5px;
}

.btnbuscar {
  width: 170px;
  height: 53px;
  position: relative;
  top: 7px;
}
.bbuscar {
  width: 170px;
  font-size: 18px;
  background-color: rgba(5, 177, 245, 0.204);
  border-radius: 5px;
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