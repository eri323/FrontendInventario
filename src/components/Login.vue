<template>
  <div class="body">
    <div class="contenedor">
      <q-card class="my-card" id="My-card">
        <div class="Container1">
          <i
            class="fa-solid fa-boxes-stacked fa-2xl"
            id="icon"
            style="color: #24d600"
          ></i>
          <!--           <h1>SDS</h1> -->
        </div>

        <div class="Container2">
          <div id="card-title">
            <h2 class="log">Login</h2>
            <i class="fa-regular fa-circle-user" id="img"></i>
          </div>
          <div class="containerData">
            <q-card-actions class="texto">
              <q-input
                color="green"
                v-model="data.Identificacion"
                label="Identificacion"
              >
                <template v-slot:prepend>
                  <i class="fa-solid fa-user-lock"></i>
                </template>
              </q-input>

              <q-input
                color="green"
                v-model="data.Contraseña"
                label="Contraseña"
                type="password"
                id="inputpasswors"
              >
                <template v-slot:prepend>
                  <i class="fa-solid fa-file-signature"></i>
                </template>
              </q-input>
              <router-link to="./RecuContrasena" class="link">
                <p>¿Olvidaste tu Contraseña?</p>
              </router-link>
              <router-link to="./Registro" class="link">
                <p>Registrate</p>
              </router-link>
            </q-card-actions>
          </div>
          <!-- <div class="containerError" v-if="mostrarError">
                    <h4>Por favor digite el Nombre o Contraseña</h4>
                </div>
                <div class="containerError" v-if="error2">
                    <h4>{{ msj }}</h4>
                </div> -->
          <button @click="Login()" class="btn" :disabled="loading">
            <span v-if="!loading">Aceptar</span>
            <span v-else>
              <i class="fas fa-spinner fa-spin"></i> 
            </span>
          </button>
        </div>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useusuariostore } from "../stores/Usuario.js";
import { useRouter } from "vue-router";

const loading = ref(false);

const data = ref({
  Identificacion: "1101622995",
  Contraseña: "Erick#12",
});
let mostrarError = ref(false);
let MostrarData = ref(true);
let error2 = ref(false);
let error = ref("melo");
let msj = ref("");
let usuariostore = useusuariostore();
const router = useRouter();

/* const data = ref({
    Nombre: "",
    Contraseña: "",
});  */

async function Login() {
  try {
    loading.value = true;
    if (data.value.Identificacion == "" && data.value.Contraseña == "") {
      mostrarError.value = true;
      setTimeout(() => {
        mostrarError.value = false;
      }, 2200);
      showBad();
      return;
    } else {
      const res = await usuariostore.login(data.value);
      // console.log(res);
      if (res != 200) {
        error2.value = true;
        msj.value = res.msg;
        setTimeout(() => {
          error2.value = false;
        }, 2200);
      } else {
        router.push("./home");
      }
    }
  } catch (error) {
    console.error("Error in login:", error);
  } finally {
    loading.value = false;
  }
}
console.log(data.value);

function validar() {
  let validation = true;
  if (data.Nombre.value.trim() == "") {
    error.value = "paila";
    validation = false;
  }

  return validation;
}

let greatMessage = ref("");
let badMessage = ref("");

const showGreat = () => {
  notification = $q.notify({
    spinner: false,
    message: greatMessage,
    timeout: 2000,
    type: "positive",
  });
};

const showBad = () => {
  notification = $q.notify({
    spinner: false,
    message: badMessage,
    timeout: 2000,
    type: "negative",
  });
};
const showDefault = () => {
  notification = $q.notify({
    spinner: true,
    message: "Please wait...",
    timeout: 0,
  });
};
</script>
<style scoped>
* {
  font-family: "Ubuntu", sans-serif;
}

.body {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/fondo.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  font-family: "Ubuntu", sans-serif;
}

/* 
@font-face {
    font-family: "Letra";
    src: url("../fonts/Anta-Regular.ttf");
} */

.contenedor {
  display: flex;
  background: -webkit-linear-gradient(bottom, #2dbd6e, #a6f77b);
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
  border-radius: 4%;
  padding: 2%;
}
.link {
  /*    color: blue; */
  margin: 0;
  text-decoration: none;
}
#inputpasswors {
  margin: 0;
}
#My-card {
  align-items: center;
  padding: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.texto {
  display: flex;
  gap: 5px;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.bg-teal text-white {
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 65px;
}
.Container2 {
  padding: 15px 65px;
  border-left: solid 3px green;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.q-card {
  border-bottom: 0;
  /* border-bottom-left-radius: inherit; */
  /* border-bottom-right-radius: inherit; */
}
#submit-btn {
  background: -webkit-linear-gradient(right, #a6f77b, #2dbd6e);
  border: none;
  border-radius: 10px;

  cursor: pointer;
  color: white;
  font-family: "Raleway SemiBold", sans-serif;

  margin: 0;
  font-family: "Letra";
  transition: 0.25s;
}

.log {
  border-bottom: 3px solid rgb(45, 189, 110);
  margin: 0;
  padding: 0;
  width: 95px;
  display: flex;
  justify-content: center;
  font-family: "Letra";
  padding: 8px;
  font-family: "Ubuntu", sans-serif;
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

.containerError {
  background-color: rgba(255, 0, 0, 0.36);
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 8px;
  border: 3px solid red;
  margin-bottom: 15px;
}

.containerError h4 {
  font-size: 15px;
  margin: 0;
}
</style>
