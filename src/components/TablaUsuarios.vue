<template>
    <div class="container">
        <!-- Tabla -->
        <div class="container-table" style="height: 90vh; width: 80%">
            <h1>Usuarios</h1>

            <!-- <div class="b-b">
        <q-input
          class="bbuscar te"
          v-model.lazy="searchCedula"
          label="Buscar por Codigo de ficha "
          style="width: 300px"
        />
      </div> -->

            <div class="btn-agregar">
                <q-btn color="secondary" label="Agregar ➕" @click="agregarUsuario()" />
            </div>
            <div class="q-pa-md">
                <q-table flat bordered title="Treats" :rows="rows" :columns="columns" row-key="index" virtual-scroll
                    :rows-per-page-options="[0]">
                    <template v-slot:body-cell-Estado="props">
                        <q-td :props="props">
                            <label for="" v-if="props.row.Estado == 1" style="color: green">Activo</label>
                            <label for="" v-else style="color: red">Inactivo</label>
                        </q-td>
                    </template>
                    <template v-slot:body-cell-opciones="props">
                        <q-td :props="props" class="botones">
                            <q-btn color="white" text-color="black" label="🖋️" @click="editarUsuario(props.row._id)" />
                            <q-btn color="white" text-color="black" label="❌" @click="inactivarUsuario(props.row._id)"
                                v-if="props.row.estado == 1" />
                            <q-btn color="white" text-color="black" label="✅" @click="activarUsuario(props.row._id)"
                                v-else />
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
import { useusuariostore } from "../stores/Usuario.js";
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
    { name: "Nombre", label: "Nombre", field: "Nombre" },
    { name: "Identificacion", label: "Descripcion", field: "Descripcion" },
    { name: "Telefono", label: "Telefono", field: "Telefono" },
    { name: "PrecioUnitario", label: "Precio unitario", field: "PrecioUnitario" },
    { name: "Correo", label: "Correo", field: "Correo" },
    { name: "Contraseña", label: "Contraseña", field: "Contraseña" },
    { name: "Rol", label: "Rol", field: "Rol" },
    {
        name: "Estado",
        label: "Estado",
        field: "Estado",
        sortable: true,
        format: (val) => (val ? "Activo" : "Inactivo"),
    },
    {
        name: "opciones",
        label: "Opciones",
        field: (row) => null,
        sortable: false,
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

.btn {
    display: flex;
    border: none;
    gap: 20px;
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
