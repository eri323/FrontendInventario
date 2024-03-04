<template>
  <div>
    <h3 style="text-align: center;">Perfil</h3>
    <div class="container">
      <!-- display: flex; align-items: center; -->
      <q-card class="col-4" style="max-width: 500px; border-radius: 20px 0 0 20px; height: 500px; ">
        <q-card-section class="info1">
          <h4>Nombre: <span class="nombre">{{ usuarioLogeado && usuarioLogeado.Nombre }}</span></h4>
          <img v-if="usuarioLogeado && usuarioLogeado.Imagen" :src="getImagenUrl(usuarioLogeado.Imagen)"
            :alt="usuarioLogeado.Nombre">
          <img v-else :src="imageUrl" alt="Imagen predeterminada" class="img"
            style=" height: 220px; width: 220px; margin-bottom:  40px;">
          <div>
            <input type="file" ref="fileInput" style="display:none" @change="handleFileChange">
            <q-btn @click="openFileExplorer" class="boton">Seleccionar Imagen</q-btn>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="Medio" style="width: 500px; border-radius: 0; height: 500px">
        <h1 style="position: relative; left: 30px; top:-10px; font-size: 30px;">Rol {{ usuarioLogeado && usuarioLogeado.Rol
        }} </h1>
        <q-card-section class="sepa">
          <ul v-if="usuarioLogeado">
            <li><strong>Nombre:</strong> {{ usuarioLogeado.Nombre }}</li>
            <li><strong>Identificación:</strong> {{ usuarioLogeado.Identificacion }}</li>
            <li><strong>Teléfono:</strong> {{ usuarioLogeado.Telefono }}</li>
            <li><strong>Email:</strong> {{ usuarioLogeado.Correo }}</li>
          </ul>
        </q-card-section>
      </q-card>

    </div>
    <div>
      <q-separator style="border: 1px solid rgba(0,173,0,255); margin-top: 20px; margin-bottom: 20px; height: 0;" />
      <div class="row justify-center">
        <q-btn class="boton" label="Atras" style="margin: 10px; " />
        <q-btn class="boton" label="¿Ayuda?" style="margin: 10px; " />
        <q-btn class="boton" label="Editar perfil" @click="showProfileDialog" style="margin: 10px;" />

        <q-dialog v-model="profileDialog">
          <q-card>
            <q-card-section>
              <p style="font-size: 25px;">Editar datos</p>
              <div class="linea"></div>
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

                    <div class="contenedor_botones">
                      <button class="btnagregar1" @click="agregaryediperfil()" v-if="btnagregar">
                        Aceptar
                      </button>
                      <button class="btnagregar2" @click="closeProfileDialog">Cerrar</button>

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
import { useusuariostore } from "../stores/Usuario";

const $q = useQuasar();
const usuariostore = useusuariostore();
const imageUrl = ref("../assets/user.jpg");
const profileDialog = ref(false);
const nombre = ref("");
const identificacion = ref("");
const Telefono = ref("");
const Correo = ref("");
const Contraseña = ref("");
const options = ref([]);
const btnagregar = ref(true); // Inicializa según tus necesidades
const btnaceptar = ref(false); // Inicializa según tus necesidades
const xd = ref(0);
const usuarioLogeado = ref(null);

let notification;
const fileInput = ref(null); // Add this line to define fileInput

//Abrir y cerrar modal
const showProfileDialog = () => {
  nombre.value = usuarioLogeado.Nombre;
  identificacion.value = usuarioLogeado.Identificacion;
  Telefono.value = usuarioLogeado.Telefono;
  Correo.value = usuarioLogeado.Correo;
  profileDialog.value = true;
};
const closeProfileDialog = () => {
  profileDialog.value = false;
};

//Abrir explroador de archivos
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

function limpiar() {
  nombre.value = "";
  identificacion.value = "";
  Telefono.value = "";
  Correo.value = "";
  Contraseña.value = "";
}

async function agregaryediperfil() {
  if (xd.value === 0) {
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
    const id = idusuario.value;
    if (id) {
      try {
        showDefault();
        await usuariostore.puteditarusuario(id, {
          Nombre: nombre.value,
          Identificacion: identificacion.value,
          Telefono: Telefono.value,
          Correo: Correo.value,
          Contraseña: Contraseña.value,
          Imagen: Imagen.value,
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

const showDefault = () => {
  notification = $q.notify({
    spinner: true,
    message: "Please wait...",
    timeout: 0,
  });
};

const obtenerInfo = async () => {
  try {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (!token) {
      console.error("No hay ningún token almacenado.");
      return;
    }
    usuariostore.setToken(token);
    const usuarioDataString = localStorage.getItem("usuarioData");
    if (usuarioDataString) {
      const usuarioData = JSON.parse(usuarioDataString);
      usuariostore.setUsuarioLogeado(usuarioData);
      usuarioLogeado.value = usuarioData;
    }
  } catch (error) {
    console.error("Error al obtener la información del usuario:", error);
  }
};

onMounted(() => {
  obtenerInfo();
});

// Función para obtener la URL de la imagen del usuario
const getImagenUrl = (imagen) => {
  if (imagen && imagen.contentType && imagen.data) {
    return `${imagen.contentType};base64,${imagen.data.toString('base64')}`;
  } else {
    return imageUrl.value;
  }
};
</script>

<style scoped>
.info1 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 35px;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 90px;
}

.boton {
  background-color: #21ba45;
  font-size: 14px;
}

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
  flex-direction: column;
}

.sepa {
  width: 500px;
  height: auto;
  font-size: 20px;
  display: flex;
}

.form {
  height: 550px;
  width: 350px;
}

.q-gutter-md {
  width: 335px;
}

.nombre {
  color: #21ba45;
  font-weight: bold;
}

.linea {
  border-bottom: 4px solid #21ba45;
  border-radius: 5px;
  width: 85%;
  margin: 0 auto;
}

.contenedor_botones {
  display: flex;
  height: 35px;
  justify-content: space-between;
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
</style>
