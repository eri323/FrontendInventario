<template>
  <div class="body">
    <div class="contenedor">
      <div class="arriba">
        <h2>Bienvenido</h2>
        <img style="height: 100px; width: 100px;" src="/src/img/sena2.png" alt="">
      </div>

      <div class="conte">
        <div class="Container1">
          <div id="card-title">
            <h2 class="log">Login</h2>
          </div>
          <div class="containerData">
            <q-card-actions class="texto">
              <q-input color="green" v-model="usuario.Identificacion" label="Identificacion" class="input">
                <template v-slot:prepend>
                  <i class="fa-solid fa-user-lock"></i>
                </template>
              </q-input>

              <q-input color="green" v-model="usuario.Contraseña" label="Contraseña" type="password" id="inputpasswors"
                class="input">
                <template v-slot:prepend>
                  <i class="fa-solid fa-file-signature"></i>
                </template>
              </q-input>
              <router-link to="./RecuContrasena" class="link">
                <p style="position: relative; top: 10px; ">¿Olvidaste tu Contraseña?</p>
              </router-link>
            </q-card-actions>
          </div>

          <button @click="Login()" class="btn" :disabled="loading">
            <span v-if="!loading">Aceptar</span>
            <span v-else>
              <i class="fas fa-spinner fa-spin"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useusuariostore } from "../stores/Usuario.js";
import { useRouter } from "vue-router";
import { useQuasar } from 'quasar';

const loading = ref(false);
const $q = useQuasar();
const usuario = ref({
  Identificacion: "1101622995",
  Contraseña: "Erick#12",
});
let mostrarError = ref(false);
let error2 = ref(false);
let msj = ref("");
let usuariostore = useusuariostore();
const router = useRouter();

async function Login() {
  try {
    loading.value = true;
    if (!usuario.value.Identificacion || !usuario.value.Contraseña) {
      mostrarError.value = true;
      setTimeout(() => {
        mostrarError.value = false;
      }, 2200);
      showBad();
      return;
    } else {
      const res = await usuariostore.login(usuario.value);
      console.log(res);
      if (res.status === 200 && res.token) {
        await usuariostore.obtenerinfousuario();
        // console.log(usuariostore.usuario);
        router.push("./Home");
      } else {
        error2.value = true;
        msj.value = res.msg;
        setTimeout(() => {
          error2.value = false;
        }, 2200);
      }
    }
  } catch (error) {
    console.error("Error in login:", error);
  } finally {
    loading.value = false;
  }
}

const showBad = () => {
  notification = $q.notify({
    spinner: false,
    message: "Error: Ingrese Identificacion y Contraseña",
    timeout: 2000,
    type: "negative",
  });
};
</script>
<style scoped>
* {
  font-family: "Ubuntu", sans-serif;
}

* {
  font-family: "save";
}

.conte {
  display: flex;
  gap: 150px;
}

.contenedor {
  display: flex;
  flex-direction: column;
  background: -webkit-linear-gradient(bottom, #2dbd6e, #a6f77b);
  background-repeat: no-repeat;
  align-items: center;
  height: 100vh;
  gap: 10px;
}

.link {
  /*    color: blue; */
  margin: 0;
  text-decoration: none;
  color: black;
}

.input {
  font-size: 23px;
  line-height: 24px;
  padding-top: 24px;
  padding-bottom: 8px;
}

.texto {
  display: flex;
  font-size: 20px;
  align-items: center;
  flex-direction: column;
  text-align: center;
  position: relative;
}

.t .bg-teal text-white {
  background-color: transparent;
}

#card-title {
  font-family: "Raleway Thin", sans-serif;
  letter-spacing: 4px;
  padding-bottom: 23px;
  padding-top: 13px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
}

.Container1 {
  width: 50vh;
  height: 50vh;
  padding: 1.5rem;
  border-radius: 0.8rem;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


#submit-btn {
  background: -webkit-linear-gradient(right, #a6f77b, #2dbd6e);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  font-family: "Raleway SemiBold", sans-serif;
  margin: 0;
  font-family: "save";
  transition: 0.25s;
}

.log {
  border-bottom: 3px solid rgb(45, 189, 110);
  margin: 0;
  padding: 0;
  width: 95px;
  display: flex;
  justify-content: center;
  font-family: "save";
  font-size: 65px;
  padding: 8px;
}


#submit-btn:hover {
  box-shadow: 0px 1px 10px #24c64f;
}

.containerData {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#icon {
  font-size: 150px;
}

#input {
  display: flex;
  text-align: center;
}

#img {
  font-size: 200px;
}

@font-face {
  font-family: "save";
  src: url("../fonts/Anta-Regular.ttf");
}

.btn {
  width: 100px;
  font-size: 18px;
  border-radius: 5px;
  border: none;
  padding: 10px;
  cursor: pointer;
  background: -webkit-linear-gradient(bottom, #2dbd6e, #a6f77b);
}

.btn:hover {
  transition: ease-in-out 0.5s;
  transform: scale(1.1);
}

.arriba{
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5% ;
}
</style>
