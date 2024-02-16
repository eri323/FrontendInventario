<template>
  <div>
    <h3 style="text-align: center">Perfil</h3>
    <div class="row justify-center">
      <q-card
        class="col-4"
        style="max-width: 500px; border-radius: 20px 0 0 20px; border: 0"
      >
        <q-card-section>
          <h4>Nombre {{ usuario.Nombre }}</h4>
          <img
            v-if="
              usuario &&
              usuario.Imagen &&
              usuario.Imagen.contentType &&
              usuario.Imagen.data
            "
            :src="`${
              usuario.Imagen.contentType
            };base64,${usuario.Imagen.data.toString('base64')}`"
            :alt="usuario.Imagen.nombre"
          />
          <img v-else :src="imageUrl" alt="Imagen predeterminada" />

          <div>
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              @change="handleFileChange"
            />
            <q-btn @click="openFileExplorer" class="boton"
              >Seleccionar Imagen</q-btn
            >
          </div>
        </q-card-section>
      </q-card>
      <q-card class="Medio" style="max-width: 900px; border-radius: 0">
        <h1>Rol</h1>
        <q-card-section class="mitad">
          <q-card-section class="sepa" style="width: 200px">
            <ul v-if="usuario">
              <li><strong>Nombre:</strong> {{ usuario.Nombre }}</li>
              <li>
                <strong>Identificación:</strong> {{ usuario.Identificacion }}
              </li>
              <li><strong>Teléfono:</strong> {{ usuario.Telefono }}</li>
              <li><strong>Email:</strong> {{ usuario.Correo }}</li>
            </ul>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
    <div>
      <q-separator
        style="
          border: 1px solid rgba(0, 173, 0, 255);
          margin-top: 20px;
          margin-bottom: 20px;
          height: 0;
        "
      />
      <div class="row justify-center">
        <q-btn class="boton" label="Atras" style="margin: 10px" />
        <q-btn class="boton" label="¿Ayuda?" style="margin: 10px" />
        <q-btn
          class="boton"
          label="Editar perfil"
          @click="showProfileDialog"
          style="margin: 10px"
        />

        <q-dialog v-model="profileDialog">
          <q-card>
            <q-card-section>
              <p style="font-size: 25px">Editar datos</p>
              <!-- Formulario -->
              <div class="form">
                <div class="q-pa-md" style="max-width: 200px">
                  <q-form
                    @submit="onSubmit"
                    @reset="onReset"
                    class="q-gutter-md"
                  >
                    <!--  -->
                    <q-input
                      filled
                      v-model="nombre"
                      label="Ingrese su Nombre"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') ||
                          'Porfavor ingresa tu Nombre ',
                      ]"
                    />
                    <!--  -->
                    <q-input
                      filled
                      v-model="identificacion"
                      label="Numero deiidentificacion"
                      type="number"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Porfavor escribe tu nuevo numero de identificacion',
                      ]"
                    />
                    <!--  -->
                    <q-input
                      filled
                      v-model="Telefono"
                      label="Numero de telefono"
                      type="number"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Porfavor escribe tu nuevo numero de telefono',
                      ]"
                    />
                    <!--  -->
                    <q-input
                      filled
                      v-model="Correo"
                      label="Ingrese su nuevo gmail"
                      :options="options"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') ||
                          'Porfavor Ingrese su nuevo correo ',
                      ]"
                    />
                    <!--  -->
                    <q-input
                      filled
                      v-model="Contraseña"
                      label="Ingrese su nueva contraseña"
                      :options="options"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') ||
                          'Porfavor ingrese su nueva contraseña ',
                      ]"
                    />

                    <div class="btn-agregar">
                      <button
                        class="btnagregar"
                        @click="agregaryediperfil()"
                        v-if="btnagregar"
                      >
                        Aceptar
                      </button>
                      <button class="btnagregar" @click="closeProfileDialog">
                        Cerrar
                      </button>
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
const Imagen = ref("");
const options = ref([]);
const btnagregar = ref(true); // Inicializa según tus necesidades
const btnaceptar = ref(false); // Inicializa según tus necesidades
const idusuario = ref("");
const xd = ref(0);
let notification;
const fileInput = ref(null); // Add this line to define fileInput

//Abrir y cerrar modal
const showProfileDialog = () => {
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
    await usuariostore.obtenerinfousuario();

  } catch (error) {
    console.error("Error al obtener la información del usuario:", error);
  }
};

onMounted(() => {
  obtenerInfo();
});

const usuario = usuariostore.usuario;
</script>

<style scoped>
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
