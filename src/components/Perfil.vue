<template>
  <div>
    <h3 style="text-align: center;">Perfil</h3>
    <div class="row justify-center">
      <q-card class="col-4" style="max-width: 500px; border-radius: 20px 0 0 20px; border: 0;">
        <q-card-section>
          <h4>Nombre</h4>
          <img v-if="usuario && usuario.Imagen && usuario.Imagen.contentType && usuario.Imagen.data"
            :src="`${usuario.Imagen.contentType};base64,${usuario.Imagen.data.toString('base64')}`"
            :alt="usuario.Imagen.nombre">
          <img v-else :src="imageUrl" alt="Imagen predeterminada">


          <div>
            <input type="file" ref="fileInput" style="display:none" @change="handleFileChange">
            <q-btn @click="openFileExplorer" color="primary">Seleccionar Imagen</q-btn>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="Medio" style="max-width: 900px; border-radius: 0 ;">
        <h1>Rol</h1>
        <q-card-section class="mitad">
          <q-card-section class="sepa" style="width: 200px;">
            <li>edad</li>
            <li>ciudad</li>
            <li>telefono</li>
            <li>email</li>
          </q-card-section>
        </q-card-section>
      </q-card>


    </div>
    <div>
      <q-separator style="border: 1px solid rgba(0,173,0,255); margin-top: 20px; margin-bottom: 20px; height: 0;" />
      <div class="row justify-center">
        <q-btn label="Atras" color="secondary" style="margin: 10px; " />
        <q-btn label="¿Ayuda?" color="secondary" style="margin: 10px; " />
        <q-btn label="Editar perfil" @click="showProfileDialog" color="secondary" style="margin: 10px;" />

        <q-dialog v-model="profileDialog">
          <q-card>
            <q-card-section>
              <p style="font-size: 25px;">Editar datos</p>
              <!-- Formulario -->
              <div class="form">
                <div class="q-pa-md" style="max-width: 200px">

                  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                    <!--  -->
                    <q-input filled v-model="nombre" label="Ingrese su Nombre" lazy-rules :rules="[
                      (val) =>
                        (val !== null && val !== '') || 'Porfavor ingresa tu Nombre ',
                    ]" />
                    <!--  -->
                    <q-input filled v-model="identificacion" label="Numero deiidentificacion" type="number" lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Porfavor escribe tu nuevo numero de identificacion',
                      ]" />
                    <!--  -->
                    <q-input filled v-model="Telefono" label="Numero de telefono" type="number" lazy-rules :rules="[
                      (val) => (val && val.length > 0) || 'Porfavor escribe tu nuevo numero de telefono',
                    ]" />
                    <!--  -->
                    <q-input filled v-model="Correo" label="Ingrese su nuevo gmail" :options="options" lazy-rules :rules="[
                      (val) =>
                        (val !== null && val !== '') || 'Porfavor Ingrese su nuevo correo ',
                    ]" />
                    <!--  -->
                    <q-input filled v-model="Contraseña" label="Ingrese su nueva contraseña" :options="options" lazy-rules
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') || 'Porfavor ingrese su nueva contraseña ',
                      ]" />

                    <div class="btn-agregar">
                      <button class="btnagregar" @click="agregaryediperfil()" v-if="btnagregar">
                        Aceptar
                      </button>
                      <button class="btnagregar" @click="closeProfileDialog">Cerrar</button>

                    </div>
                  </q-form>
                </div>
              </div>

            </q-card-section>
          </q-card>
        </q-dialog>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useusuariostore } from "../stores/Usuario.js";
let btnagregar = ref(true); // Inicializa según tus necesidades
let btnaceptar = ref(false); // Inicializa según tus necesidades
const $q = useQuasar();
let idusuario = ref("");
let xd = ref(0);
let notification;
let Perfil = ref([]);
let nombre = ref("")
let identificacion = ref("")
let Telefono = ref("")
let Correo = ref("")
let Contraseña = ref("")
let Imagen = ref("")
const options = ref([]);
const usuariostore = useusuariostore();
const usuario = ref(null);
const fileInput = ref(null);
const imageUrl = ref("../assets/user.jpg");





const openFileExplorer = () => {
  fileInput.value.click();
};
const handleFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    imageUrl.value = e.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};

onMounted(async () => {
  try {
    const response = await usuariostore.obtenerinfousuario();
    console.log(response);
    usuario.value = usuariostore.usuario;
    // ... Otras lógicas relacionadas con la obtención de datos
  } catch (error) {
    console.log(error);
  }
});



async function obtenerInfo() {
  try {
    const response = await usuariostore.obtenerinfousuario();
    console.log(response);
    Perfil.value = usuariostore.usuario;
    rows.value = usuariostore.usuario;
  } catch (error) {
    console.log(error);
  }
}
function limpiar() {
  nombre.value = "";
  identificacion.value = "";
  Telefono.value = "";
  Correo.value = "";
  Contraseña.value = "";
}

async function agregaryediperfil() {
  if (xd.value == 0) {
    try {
      showDefault();
      await usuariostore.postinfousuario({
        Nombre: nombre.value,
        Identificacion: identificacion.value,
        Telefono: Telefono.value,
        Correo: Correo.value,
        Contraseña: Contraseña.value,
        Imagen: Imagen.value,


      });
      obtenerInfo();
      if (notification) {
        notification();
      }
      limpiar();
      $q.notify({
        spinner: false,
        message: "Datos actualizados",
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
    let id = idusuario.value;
    if (id) {
      try {
        showDefault();
        await usuariostore.puteditarusuario(id, {
          Nombre: nombre.value,
          Identificacion: identificacion.value,
          Telefono: Telefono.value,
          Correo: Correo.value,
          Contraseña: Contraseña.value,
          Imagen: Imagen.value

        });
        btnagregar.value = true;
        btnaceptar.value = false;
        text.value = "Agregar ficha";
        xd.value = 0;
        if (notification) {
          notification();
        }
        limpiar();
        $q.notify({
          spinner: false,
          message: "Ficha Actualizada",
          timeout: 2000,
          type: "positive",
        });
        obtenerInfo();
        fixed.value = false;
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











//Abrir modal
const profileDialog = ref(false);

const showProfileDialog = () => {
  profileDialog.value = true;
};
//Cerrar modal
function closeProfileDialog() {
  profileDialog.value = false;
}









</script>

<style scoped>
img {
  border-radius: 50%;
  height: 400px;
  width: 400px;
}

h4 {
  margin: 28px;
}

h1 {
  font-size: 45px;
}

span {
  color: black;
}

.Medio {
  width: 500px;
  display: flex;
  justify-content: center;
}

.mitad {
  display: flex;
  align-items: center;
}

.form {
  height: 550px;
  width: 350px;
}

.q-gutter-md {
  width: 335px;
}
</style>
