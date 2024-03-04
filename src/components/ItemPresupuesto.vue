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
                        <h5 class="title">Programas</h5>
                        <button class="btnag" @click="agregar()">
                            <h5>Agregar</h5>
                            <i class="fa-regular fa-square-plus"></i>
                        </button>
                    </div>

                    <q-table flat bordered title="" class="tabla" :rows="rows" :columns="columns" row-key="index"
                        virtual-scroll :rows-per-page-options="[0]">
                        <template v-slot:body-cell-Estado="props">
                            <q-td :props="props">
                                <label for="" v-if="props.row.Estado == 1"
                                    style="color: green; font-weight: bold">Activo</label>
                                <label for="" v-else style="color: red; font-weight: bold">Inactivo</label>
                            </q-td>
                        </template>
                        <template v-slot:body-cell-opciones="props">
                            <q-td class="opciones" :props="props">
                                <button class="btnedit" @click="editaritempresupuesto(props.row._id)">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button class="btninac" @click="inactivaritempresupuesto(props.row._id)"
                                    v-if="props.row.Estado == 1">
                                    <i class="fa-solid fa-xmark" style="color: #ff0000"></i>
                                </button>
                                <button class="btnact" @click="activaritempresupuesto(props.row._id)" v-else>
                                    <i class="fa-solid fa-check" style="color: #006110"></i>
                                </button>
                                <button class="btnenv" @click="goItemLote(props.row._id)">
                                    <i class="fa-solid fa-share"></i>
                                </button>
                            </q-td>
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
                                    <!------------------------------->

                                    <div class="container_input1">
                                        <q-input color="green" filled v-model="Nombre" class="modal_input" type="text"
                                            label="Nombre del item de presupuesto *" lazy-rules
                                            :rules="[(val) => !!val || 'Por favor ingrese el iten de presupuesto']">
                                            <template v-slot:prepend>
                                                <svg class="icono" xmlns="http://www.w3.org/2000/svg" width="128"
                                                    height="128" viewBox="0 0 26 26">
                                                    <path fill="#999999"
                                                        d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557" />
                                                </svg>
                                            </template>
                                        </q-input>
                                    </div>

                                    <!------------------------------->


                                    <!------------------------------->

                                    <div class="container_input1">
                                        <q-input color="green" filled type="number" v-model="Presupuesto"
                                            class="modal_input" label="Presupuesto *" lazy-rules :rules="[
                                                val => val !== null && val !== '' || 'Por favor ingresar el presupuesto',
                                                val => val > 0 || 'Por favor ingresar un número válido mayor a 0'
                                            ]">
                                            <template v-slot:prepend>
                                                <svg class="icono" xmlns="http://www.w3.org/2000/svg" width="128"
                                                    height="128" viewBox="0 0 48 48">
                                                    <circle cx="24" cy="24" r="21.5" fill="none" stroke="#999999"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                    <path fill="none" stroke="#999999" stroke-linecap="round"
                                                        stroke-linejoin="round" d="M2.5 24h43" />
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
import { useitempresupuestostore } from "../stores/ItemPresupuesto.js";
import { useRouter } from 'vue-router';

const router = useRouter();
const $q = useQuasar();
const itempresupuestostore = useitempresupuestostore();

let notification;
let rows = ref([]);
let itempresupuesto = ref([]);
let prompt = ref(false);

let Nombre = ref("");
/* let Codigo = ref("");
let Descripcion = ref("");
let UnidadMedida = ref("");
let PrecioUnitario = ref("");
let Iva = ref(""); */
let Presupuesto = ref("");
let idItemPresupuesto = ref("");
let text = ref("Agregar programa");
let btnaceptar = ref(false);
let btnagregar = ref(true);
let xd = ref(0);
function agregar() {
    prompt.value = true;
    xd.value = 0;
    limpiar();
    text.value = "Agregar programa";
    btnaceptar.value = false;
    btnagregar.value = true;
}
const cargando = ref(false);
function goItemLote(idDistribucion){
  router.push(`/DistribucionPresupuesto/${idDistribucion}`);
}
const columns = [

    {
        name: "Nombre",
        label: "Nombre",
        align: "center",
        field: "Nombre",
        headerStyle: {
            fontWeight: "bold",
            fontSize: "15px",
        },
        align: "center",
    },



    {
        name: "Presupuesto",
        label: "Presupuesto",
        align: "center",
        field: "Presupuesto",
        headerStyle: {
            fontWeight: "bold",
            fontSize: "15px",
        },
        align: "center",
        format: (val) => formatearPrecio(val)
    },
    {
        name: "Estado",
        label: "Estado",
        align: "center",
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
        align: "center",
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
        const response = await itempresupuestostore.obtenerinfoitempresupuesto();
        console.log(response);
        itempresupuesto.value = itempresupuestostore.itempresupuesto;
        rows.value = itempresupuestostore.itempresupuesto;
    } catch (error) {
        console.log(error);
    } finally {
        cargando.value = false;
    }
}

async function agregaritempresupuesto() {
    if (xd.value == 0) {
        try {
            showDefault();
            await itempresupuestostore.postinfoitempresupuesto({

                Nombre: Nombre.value,

                Presupuesto: Presupuesto.value,
            });
            obtenerInfo();
            if (notification) {
                notification();
            }
            limpiar();
            $q.notify({
                spinner: false,
                message: "Programa Agregado",
                timeout: 2000,
                type: "positive",
            });
            obtenerInfo();
            prompt.value= false;
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
        let id = idItemPresupuesto.value;
        if (id) {
            try {
                showDefault();
                await itempresupuestostore.puteditaritempresupuesto(id, {

                    Nombre: Nombre.value,

                    Presupuesto: Presupuesto.value,
                });
                btnagregar.value = true;
                btnaceptar.value = false;
                text.value = "Agregar programa";

                if (notification) {
                    notification();
                }
                limpiar();
                $q.notify({
                    spinner: false,
                    message: "Programa Actualizada",
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

    Presupuesto.value = "";
}

async function editaritempresupuesto(id) {
    prompt.value = true;
    xd.value = 1;
    const selecitempresupuesto = itempresupuesto.value.find(
        (itempresupuestoTT) => itempresupuestoTT._id === id
    );
    if (selecitempresupuesto) {
        idItemPresupuesto.value = String(selecitempresupuesto._id);
        btnagregar.value = false;
        btnaceptar.value = true;
        text.value = "Editar programa";
        Nombre.value = selecitempresupuesto.Nombre;
        Presupuesto.value = selecitempresupuesto.Presupuesto;
    }
}

// Inactivar producto
async function inactivaritempresupuesto(id) {
    try {
        showDefault();
        await itempresupuestostore.putInactivaritempresupuesto(id);
        cancelShow();
        greatMessage.value = "Programa Inactivo";
        showGreat();
        obtenerInfo();
    } catch (error) {
        cancelShow();
        badMessage.value = error.response.data.error.errors[0].msg;
        showBad();
    }
}

// Activar itempresupuesto
async function activaritempresupuesto(id) {
    try {
        showDefault();
        await itempresupuestostore.putActivaritempresupuesto(id);
        cancelShow();
        greatMessage.value = "Programa Activo";
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

const formatearPrecio = (precio) => {
  const partes = precio.toString().split(/(?=(?:\d{3})+(?:\.|$))/);
  return partes.join('.');
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
  background-position: 390px; 
  background-size: auto 330px; 
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
