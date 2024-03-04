<template>
    <div class="container">
        <!-- Tabla -->
        <div class="container-table">


            <div class="container2">
                <div class="tabladiv">
                    <div class="header">
                        <h5 class="title">
                            Distribucion presupuesto
                        </h5>
                        <button class="btnag" @click="agregar()">
                            <h5>Agregar</h5>
                            <i class="fa-regular fa-square-plus"></i>
                        </button>
                    </div>
                    <q-table flat bordered class="tabla" :rows="rows" :filter="filter" :columns="columns" row-key="index"
                        virtual-scroll :rows-per-page-options="[0]">
                        <!--   <template v-slot:body-cell-ItemPresupuesto_id="props">
                            <q-td :props="props">
                                {{ JSON.stringify(props.row.ItemPresupuesto_id.$numberDecimal) }}
                            </q-td>
                        </template> -->
                        <template v-slot:body-cell-Estado="props">
                            <q-td :props="props">
                                <label for="" v-if="props.row.Estado == 1"
                                    style="color: green; font-weight: bold">Activo</label>
                                <label for="" v-else style="color: red; font-weight: bold">Inactivo</label>
                            </q-td>
                        </template>
                        <template v-slot:body-cell-opciones="props">
                            <q-td :props="props" class="opciones">
                                <button class="btnedit" @click="editarpresupuesto(props.row._id)">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button class="btninac" @click="inactivarpresu(props.row._id)" v-if="props.row.Estado == 1">
                                    <i class="fa-solid fa-xmark" style="color: #ff0000"></i>
                                </button>

                                <button class="btnact" @click="activarpresupuesto(props.row._id)" v-else>
                                    <i class="fa-solid fa-check" style="color: #006110"></i>
                                </button>
                            </q-td>
                        </template>
                        <template v-slot:top-right>
                            <q-input borderless dense debounce="300" color="primary" v-model="filter" class="buscar"
                                placeholder="Buscar cualquier campo" id="boxBuscar">
                                <template v-slot:append>
                                    <q-icon name="search" />
                                </template>
                            </q-input>
                        </template>
                    </q-table>


                    <q-dialog v-model="prompt" persistent class="containermodal">

                        <q-card class="modal">
                            <div class="titulo-linea">
                                <h5 class="titulos">{{ text }} </h5>
                                <div class="linea"></div>
                            </div>

                            <q-card-section>

                                <q-form class="q-gutter-md">


                                    <br>
                                    <div class="container_input1">
                                        <q-select color="green" filled v-model="ItemPresupuesto_id" :options="optionsitem"
                                            class="modal_input" label="Presupuesto general" lazy-rules
                                            :rules="[(val) => !!val || 'Por favor ingrese un Presupuesto']">
                                            <template v-slot:prepend>
                                                <svg class="icono" xmlns="http://www.w3.org/2000/svg" width="128"
                                                    height="128" viewBox="0 0 26 26">
                                                    <path fill="#999999"
                                                        d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557" />
                                                </svg>
                                            </template>
                                        </q-select>
                                    </div>

                                    <br>
                                    <div class="container_input1">
                                        <q-select color="green" filled v-model="Lote_id" :options="optionsLote_id"
                                            class="modal_input" label="Lote *" lazy-rules
                                            :rules="[(val) => !!val || 'Por favor seleccione el nombre del lote']">
                                            <template v-slot:prepend>
                                                <svg class="icono" xmlns="http://www.w3.org/2000/svg" width="128"
                                                    height="128" viewBox="0 0 26 26">
                                                    <path fill="#999999"
                                                        d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557" />
                                                </svg>
                                            </template>
                                        </q-select>
                                    </div>
                                    <br>
                                    <div class="container_input1">
                                        <q-input color="green" filled v-model="Presupuesto" class="modal_input" mask="#################"
                                            label="Presuouesto para el lote *" lazy-rules
                                            :rules="[(val) => !!val || 'Por favor ingrese un Presupuesto']">
                                            <template v-slot:prepend>
                                                <svg class="icono" xmlns="http://www.w3.org/2000/svg" width="128"
                                                    height="128" viewBox="0 0 26 26">
                                                    <path fill="#999999"
                                                        d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557" />
                                                </svg>
                                            </template>
                                        </q-input>
                                    </div>
                                    <div class="contenedor_botones">
                                        <q-btn flat v-close-popup class="btnagregar1" type="reset" label="Cancelar" />
                                        <q-btn label="Agregar" class="btnagregar2" @click="agregaritempresupuesto()"
                                            v-if="btnagregar" type="submit" />
                                        <q-btn label="Aceptar" class="btnagregar2" @click="agregaritempresupuesto()"
                                            v-if="btnaceptar" type="submit" />
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
import { uselotestore } from "../stores/Lote.js";
import { useitempresupuestostore } from "../stores/ItemPresupuesto.js";
import { usedistribucionpresupuestostore } from "../stores/DistribucionPreupuesto.js"

/* const $q = useQuasar(); */

const lotestore = uselotestore();
const itempresupuestostore = useitempresupuestostore();
const distribucionpresupuestostore = usedistribucionpresupuestostore();
let rows = ref([]);
let xd = ref(0);

import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const idDistribucion = ref([]);

const distribucionItemLote = async () => {
  idDistribucion.value = route.params.idDistribucion;
};

function goLoteFicha(idDistribucionPresupuesto){
    router.push(`/distribucion-lote-ficha/${idDistribucionPresupuesto}`);
}

function goToItem(){
    router.push(`/item`);
}
onMounted(distribucionItemLote);
/* let fixed = ref(false); */

const $q = useQuasar();
let Presupuesto = ref();
let Lote_id = ref("")
let ItemPresupuesto_id = ref("")
const filter = ref("")
let distribucionpresupuestos = ref([]);
let text = ref("Editar distribucion");
let btnaceptar = ref(false);
let btnagregar = ref(true);
const prompt = ref(false);
let dispresupuesto = ref([]);
const optionsLote_id = ref([]);
const optionsitem = ref([]);
function agregar() {
    console.log("FDfsd");
    prompt.value = true;
    xd.value = 0;
    limpiar();
    text.value = "Agregar Distribucion";
    btnaceptar.value = false;
    btnagregar.value = true;
}
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
let notification;
const columns = [
    {
        name: "Presupuesto",
        label: "Presupuesto",
        field: "Presupuesto",
        headerStyle: {
            fontWeight: "bold",
            fontSize: "15px",
        },
        align: "center",
        format: (val) => formatearPrecio(val),

    },
    {
        name: "Lote_id",
        label: "Lote",
        field: (row) => `${row.Lote_id?.Nombre}`,
        headerStyle: {
            fontWeight: "bold",
            fontSize: "15px",
        },
        align: "center",
    },
    {
        name: "ItemPresupuesto_id",
        label: "Programa al que pertenece el presupuesto",
        field: (row) => `${row.ItemPresupuesto_id?.Nombre}`,
        headerStyle: {
            fontWeight: "bold",
            fontSize: "15px",
        },
        align: "center",
    },
    {
        name: "ItemPresupuesto_id",
        label: "Presupuesto general",
        field: (row) => `${row.ItemPresupuesto_id?.Presupuesto}`,
        headerStyle: {
            fontWeight: "bold",
            fontSize: "15px",
        },
        align: "center",
        format: (val) => formatearPrecio(val),
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
const formatearPrecio = (precio) => {
    const partes = precio.toString().split(/(?=(?:\d{3})+(?:\.|$))/);
    return partes.join(".");
};
async function obtenerlote() {
    try {
        await lotestore.obtenerinfolote();
        optionsLote_id.value = lotestore.lote.map((lote) => ({
            label: `${lote.Nombre} `,
            value: String(lote._id),
        }));
    } catch (error) {
        console.log(error);
    }
}
async function obteneritempresu() {
    try {
        await itempresupuestostore.obtenerinfoitempresupuesto();
        optionsitem.value = itempresupuestostore.itempresupuesto.map((itempresupuesto) => ({
            label: `${itempresupuesto.Presupuesto} - ${itempresupuesto.Nombre}`,
            value: String(itempresupuesto._id),
        }));
    } catch (error) {
        console.log(error);
    }
}
function limpiar() {
    Presupuesto.value = "";
    ItemPresupuesto_id.value = "";
    Lote_id.value = "";

}
async function agregaritempresupuesto() {
    if (xd.value == 0) {
        console.log("va a agregar");
        try {

            showDefault();
            await distribucionpresupuestostore.postinfodistribucionpresupuesto({
                Presupuesto: Presupuesto.value,
                Lote_id: Lote_id._rawValue.value,
                ItemPresupuesto_id: ItemPresupuesto_id._rawValue.value,
            });
            obtenerInfo();
            if (notification) {
                notification();
            }
            limpiar();
            $q.notify({
                spinner: false,
                message: "Distribucion Agregada",
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
    } else {
        console.log("va a editar");
        let id = iddistribucionpresupuesto.value;
        if (id) {

            try {
                showDefault();
                await distribucionpresupuestostore.puteditardistribucionpresupuesto(id, {
                    Presupuesto: Presupuesto.value,
                    Lote_id: Lote_id._rawValue.value,
                    ItemPresupuesto_id: ItemPresupuesto_id._rawValue.value,
                });
                btnagregar.value = true;
                btnaceptar.value = false;
                text.value = "Agregar distribucion";
                xd.value = 0;
                if (notification) {
                    notification();
                }
                limpiar();
                $q.notify({
                    spinner: false,
                    message: "Distribucion Actualizada",
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

let iddistribucionpresupuesto = ref("");
async function editarpresupuesto(id) {
    prompt.value = true
    obteneritempresu();
    obtenerlote();
    xd.value = 1;
    const dispeselect = dispresupuesto.value.find((distribucionpresupuesto) => distribucionpresupuesto._id === id);
    if (dispeselect) {
        iddistribucionpresupuesto.value = String(dispeselect._id);
        btnagregar.value = false;
        btnaceptar.value = true;
        text.value = "Editar Distribucion presupuesto";
        Presupuesto.value = dispeselect.Presupuesto;



        Lote_id.value = {
            label: `${dispeselect.Lote_id.Nombre}`,
            value: String(dispeselect.Lote_id._id),
        };
        ItemPresupuesto_id.value = {
            label: `${dispeselect.ItemPresupuesto_id.Presupuesto}-${dispeselect.ItemPresupuesto_id.Nombre}`,
            value: String(dispeselect.ItemPresupuesto_id._id),
        };

        /* Presupuesto.value = areaseleccionada.Presupuesto;
            niveldeformacion.value = areaseleccionada.NivelFormacion;
            area_id.value = {
                label: `${areaseleccionada.Area_Id.Presupuesto}`,
                value: String(areaseleccionada.Area_Id._id),
            };
            fechafin.value = format(new Date(areaseleccionada.FechaFin), "yyyy-MM-dd");
            fechainicio.value = format(
                new Date(areaseleccionada.FechaInicio),
                "yyyy-MM-dd"
            ); */
    }
}
async function obtenerInfo() {
    try {
        const response = await distribucionpresupuestostore.obtenerinfodistribucionpresupuesto();
        console.log(response);
        distribucionpresupuestos.value = distribucionpresupuestostore.distribucionpresupuesto;
        rows.value = distribucionpresupuestostore.distribucionpresupuesto;
        dispresupuesto.value = distribucionpresupuestostore.distribucionpresupuesto;
        obteneritempresu();
        obtenerlote();
    } catch (error) {
        console.log(error);
    }
}
async function inactivarpresu(id) {
    try {
        showDefault();
        await distribucionpresupuestostore.putInactivardistribucionpresupuesto(id);
        cancelShow();
        greatMessage.value = "Presupuesto Inactiva";
        showGreat();
        obtenerInfo();
    } catch (error) {
        cancelShow();
        badMessage.value = error.response.data.error.errors[0].msg;
        showBad();
    }
}

async function activarpresupuesto(id) {
    try {
        showDefault();
        await distribucionpresupuestostore.putActivardistribucionpresupuesto(id);
        cancelShow();
        greatMessage.value = "Presupuesto Activo";
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

onMounted(async () => {
    obtenerInfo();
});
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
    color: whitesmoke;
    margin: 0;
    text-align: center;
    padding: 10px 0px;
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
    background-position: 430px;
    background-size: auto 260px;
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