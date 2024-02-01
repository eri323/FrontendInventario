<template>
  <div>
    <h3 style="text-align: center;">Perfil</h3>
    <div class="row justify-center">
      <q-card class="col-4" style="max-width: 500px; border-radius: 20px 0 0 20px; border: 0;">
        <q-card-section>
          <h4>Nombre</h4>
          <img src="../assets/user.jpg" alt="">
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
      <q-card class="col-4" style="max-width: 900px; border-radius: 0 20px 20px 0;">
        <q-card-section>
          <h4>Historial</h4>
        </q-card-section>
        <q-card-section style="border: none;">
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
                    <q-select filled v-model="Correo" label="Ingrese su nuevo gmail" :options="options" lazy-rules
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') || 'Porfavor Ingrese su nuevo correo ',
                      ]" />
                      <!--  -->
                      <q-select filled v-model="Contraseña" label="Ingrese su nueva contraseña" :options="options" lazy-rules
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') || 'Porfavor ingrese su nuevo correo ',
                      ]" />

                    <button class="btnagregar" @click="agregarperfil()" v-if="btnagregar">
                      Aceptar datos
                    </button>

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
import { ref } from "vue";
let xd = ref(0);
let notification;
let perfilstore
let nombre = ref("")
let identificacion = ref("")
let Telefono = ref("")
let Correo = ref("")
let Contraseña = ref ("")
const options = ref([]);




async function agregarperfil() {
  if (xd.value == 0) {
    try {
      showDefault();
      await perfilstore.postinfoproducto({
        Nombre: nombre.value,
        Identificacion: identificacion.value,
        Telefono: Telefono.value,
        Correo: Correo.value,
        Contraseña: Contraseña.value,


      });
      obtenerInfo();
      if (notification) {
        notification();
      }
      limpiar();
      $q.notify({
        spinner: false,
        message: "Ficha Agregada",
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
    let id = idficha.value;
    if (id) {
      try {
        showDefault();
        await fichastore.puteditarficha(id, {
          CodigoFicha: codigodeficha.value,
          Nombre: nombre.value,
          NivelFormacion: niveldeformacion.value,
          FechaInicio: fechainicio.value,
          FechaFin: fechafin.value,
          Area_Id: area_id._rawValue.value,
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



// Inactivar ficha
async function inactivarficha(id) {
  try {
    showDefault();
    await fichastore.putinactivarficha(id);
    cancelShow();
    greatMessage.value = "Ficha Inactiva";
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
    greatMessage.value = "Ficha Activa";
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











//Abrir modal
const profileDialog = ref(false);

const showProfileDialog = () => {
  profileDialog.value = true;
};


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
.q-gutter-md{
  width: 335px;
}
</style>
