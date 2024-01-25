<template>
    <div class="container">
        <!-- Modal -->
        <q-dialog v-model="fixed" class="modal-container">
            <!-- ... (código del modal) ... -->
        </q-dialog>

        <!-- Tabla -->
        <div class="container-table" style="height: 90vh; overflow-y: auto; width: 80%">
            <h1>Tabla Fichas</h1>

            <div class="b-b">
                <q-input class="bbuscar te"  v-model.lazy="searchCedula" label="Buscar por Cedula" style="width: 300px" />
            </div>

            <div class="btn-agregar">
                <q-btn color="secondary" label="Agregar ➕" @click="agregarCliente()" />
            </div>

            <q-table title="Productos" :rows="rows" :columns="columns" row-key="name">
                <template v-slot:body-cell-estado="props">
                    <q-td :props="props">
                        <label for="" v-if="props.row.estado == 1" style="color: green">Activo</label>
                        <label for="" v-else style="color: red">Inactivo</label>
                    </q-td>
                </template>
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props" class="botones">
                        <q-btn color="white" text-color="black" label="🖋️" @click="editarCliente(props.row._id)" />
                        <q-btn color="white" text-color="black" label="❌" @click="inactivarCliente(props.row._id)"
                            v-if="props.row.estado == 1" />
                        <q-btn color="white" text-color="black" label="✅" @click="activarCliente(props.row._id)" v-else />
                    </q-td>
                </template>
            </q-table>
        </div>
        <div class="btn">
            <q-btn class="btns2" color="secondary" label="Ayuda" />
            <q-btn class="btns2" color="secondary" label="Ver lotes" />
            <q-btn class="btns2" color="secondary" label="Guardar cambios" />
        </div>
    </div>
</template>
  
<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

let rows = ref([]);
let fixed = ref(false);
let searchCedula = ref("");

// Filtrar Clientes
function filtrarvendedores() {
    if (searchCedula.value.trim() === "") {
        rows.value = vendedores.value;
    } else {
        const searchTerm = searchCedula.value.trim().toLowerCase();
        rows.value = vendedores.value.filter((cliente) =>
            cliente.cedula.toString().toLowerCase().includes(searchTerm)
        );
    }
}
</script>
  
<style scoped>
.btn {
    display: flex;
    border: none;
    gap: 20px;
    cursor: pointer;
 
}


.btns2{
    width: 120px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}


.container {
    display: flex;
    justify-content: center;
    align-items:    flex-end;
    flex-direction: row-reverse;
}

.container-table {
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    margin-right: 250px;
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