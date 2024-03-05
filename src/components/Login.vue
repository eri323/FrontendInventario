<template>
  <div class="body">
    <div class="contenedor">
      <h4 class="titulo">Bienvenido</h4>
      <div class="contenedor_doble">
        <div class="contenedor_izquierdo">
          <div class="contenedor_logo">
            <img class="logo" src="../img/sena2.png" alt="" />
            <!-- <img class="logo" src="../img/logo3d.gif" alt=""> -->
          </div>
        </div>

        <div class="contenedor_derecho">
          <div class="container">
            <div class="container2">
              <div class="heading">Iniciar sesión</div>
              <form action="" class="form">
                <input
                  required=""
                  class="input"
                  v-model="usuario.Identificacion"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Identificacion"
                />
                <input
                  required=""
                  class="input"
                  v-model="usuario.Contraseña"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
                <router-link to="./RecuContrasena" class="forgot-password">
                  <span class="forgot-password">¿Olvidaste tu contraseña?</span>
                </router-link>
                <q-btn
                  :loading="loading"
                  class="login-button"
                  @click="Login()"
                  label="Aceptar"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<style scoped>
* {
  font-family: "Ubuntu", sans-serif;
}

.contenedor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("https://maestriasydiplomadostec.blob.core.windows.net/maestriasydiplomados/uploads/programaec/imagen/496/Administraci_n-de-Inventarios.jpg");
  background-size: cover;
  background-position: center;
  /* background: -webkit-linear-gradient(bottom, #2dbd6e, #a6f77b); */
  height: 100vh;
}

.titulo {
  margin: 10px;
  color: rgb(255, 255, 255);
  font-size: 70px;
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.671);
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60%;
}

.contenedor_doble {
  display: flex;
  margin: 10px;
  border-radius: 15px;
  flex-wrap: wrap;
  background-color: rgb(226, 234, 255);
  /*   background-color: rgb(226, 252, 235); */
  max-width: 850px;
  height: 85%;
  box-shadow: rgba(160, 219, 149, 0.878) 0px 30px 30px -20px;
}

.contenedor_izquierdo {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: -webkit-linear-gradient(bottom, #2dbd6e, #a6f77b);
  background-size: cover;
  border-radius: 15px 0px 0px 15px;
  background-position: center;
  border: 20px solid white;
}

.contenedor_derecho {
  display: grid;
  align-items: center;
  justify-content: center;
  flex: 1;
}

/* Estilos del login  */

.container {
  height: 100%;
  border-radius: 15px;
  display: flex;
  align-items: center;
}

.container2 {
  margin-top: 40px;
  padding: 25px 35px;
}

.heading {
  text-align: center;
  font-weight: 900;
  font-size: 30px;
  color: rgb(0, 0, 0);
  text-shadow: 4px 4px 4px rgb(255, 255, 255);
}

.form {
  margin-top: 5px;
}

.form .input {
  width: 100%;
  background: white;
  border: none;
  padding: 15px 20px;
  border-radius: 20px;
  margin-top: 30px;
  box-shadow: #bbfdc8 0px 0px 10px 3px;
  border-inline: 2px solid transparent;
}

.form .input::-moz-placeholder {
  color: rgb(170, 170, 170);
}

.form .input::placeholder {
  color: rgb(170, 170, 170);
}

.form .input:focus {
  outline: none;
  border-inline: 2px solid #12d152;
}

.form .forgot-password {
  display: block;
  text-align: center;
  text-decoration: none;
  margin-top: 25px;
}

.form .forgot-password span {
  font-size: 13px;
  color: #000000;
}

.form .login-button {
  display: block;
  width: 90%;
  font-weight: bold;
  background: -webkit-linear-gradient(bottom, #2dbd6e, #a6f77b);
  color: white;
  padding-block: 15px;
  margin: 40px auto;
  border-radius: 20px;
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
  border: none;
  transition: all 0.2s ease-in-out;
}

.form .login-button:hover {
  transform: scale(1.03);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
}

.form .login-button:active {
  transform: scale(0.95);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
}

@media screen and (max-width: 615px) {
  .contenedor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: -webkit-linear-gradient(bottom, #2dbd6e, #a6f77b);
    height: 100%;
  }

  .container2 {
    margin: 0;
  }

  .contenedor_doble {
    flex-direction: column;
    height: auto;
    width: 95%;
  }

  .logo {
    width: 100px;
    height: 90px;
  }

  .contenedor_izquierdo {
    flex: 1;
    width: 90%;
    margin-left: 25px;
    border-radius: 0px 0px;
    background: -webkit-linear-gradient(bottom, #2dbd6e, #a6f77b);
  }

  .contenedor_derecho {
    flex: 1;
  }
}

@media screen and (max-width: 400px) {
  .contenedor_izquierdo {
    display: none;
  }

  .titulo {
    font-size: 40px;
  }

  .contenedor_derecho {
    flex: 1;
  }

  .container {
    height: auto;
    background: #f8f9fd;
    background: linear-gradient(
      0deg,
      rgb(255, 255, 255) 0%,
      rgb(244, 247, 251) 100%
    );
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
    margin: 10px;
  }
}

@font-face {
  font-family: "Ubuntu";
  src: url("../fonts/Anta-Regular.ttf");
}
</style>



<script setup>
import { ref } from "vue";
import { useusuariostore } from "../stores/Usuario.js";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

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
    console.log("Iniciando sesión...");
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
        console.log("Inicio de sesión exitoso. Redirigiendo a Home...");
        usuariostore.setToken(res.token);
        router.push("/Home");
      } else {
        error2.value = true;
        msj.value = res.msg;
        setTimeout(() => {
          error2.value = false;
        }, 2200);
      }
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
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