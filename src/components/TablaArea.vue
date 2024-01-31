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

            <div class="container2">
                <div class="tabladiv">
                    <q-table flat bordered title="Areas" class="tabla" :rows="rows" :columns="columns" row-key="index"
                        virtual-scroll :rows-per-page-options="[0]">
                        <template v-slot:body-cell-Estado="props">
                            <q-td :props="props">
                                <label for="" v-if="props.row.Estado == 1" style="color: green">Activo</label>
                                <label for="" v-else style="color: red">Inactivo</label>
                            </q-td>
                        </template>
                        <template v-slot:body-cell-opciones="props">
                            <q-td :props="props" class="opciones">
                                <button class="btnedit" @click="editararea(props.row._id)">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button class="btninac" @click="inactivararea(props.row._id)" v-if="props.row.Estado == 1">
                                    <i class="fa-solid fa-xmark" style="color: #ff0000"></i>
                                </button>
                                <button class="btnact" @click="activararea(props.row._id)" v-else>
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
        <!--  <div class="btn">
            <q-btn class="btns2" color="secondary" label="Ayuda" />
            <q-btn class="btns2" color="secondary" label="Ver lotes" />
        </div> -->
    </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useQuasar } from "quasar";
import { useareastore } from "../stores/Area.js";
/* const $q = useQuasar(); */
const areastore = useareastore();
let rows = ref([]);
/* let fixed = ref(false); */
let searchCedula = ref("");
let areas = ref([]);
// Filtrar Areas
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
    { name: "Nombre", label: "Nombre", field: "Nombre",
    headerStyle: {
        fontWeight: "bold",
        fontSize: "15px",
    },
    align: "center", },
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
        const response = await areastore.obtenerinfoarea();
        console.log(response);
        areas.value = areastore.area;
        rows.value = areastore.area;
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


.container {
    display: flex;
    justify-content: center;
    align-items: center;
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
    width: 100%;
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-end;
}
</style>
