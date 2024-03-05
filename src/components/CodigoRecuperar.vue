<template>
    <div class="body">
      <div class="container">
        <h2>Codigo de verificacion</h2>
        <p v-if="!correoValido" class="texto1">Por favor ingrese un correo</p>
        <form @submit.prevent="verificarCodigo">
          <div class="contenedor1">
            <div class="contenedor_input">
              <input type="text" class="input1" placeholder="Código de verificación" v-model="codigoVerificacion" required />
            </div>
            <div class="contenedor2">
              <p v-if="!codigoValido" class="texto1">Por favor ingrese un código válido </p>
              <button class="enviar" style="height: 40px; width:150px;" type="submit" :disabled="!codigoValido">Verificar Código</button>
              <router-link to="/" class="volver">Volver</router-link>
            </div>
          </div>
        </form>
        <router-link to="/cambiar-contrasena" class="forgot-password">
          <span class="forgot-password">¿Olvidaste la contraseña?</span>
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useusuariostore } from "../stores/Usuario.js";
  import { Cookies } from 'quasar';
  
  const correoElectronico = ref('');
  const codigoVerificacion = ref('');
  const useUsuario = useusuariostore();
  const router = useRouter();
  
  const correoValido = computed(() => {
    return !!correoElectronico.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoElectronico.value);
  });
  
  const codigoValido = computed(() => {
    return !!codigoVerificacion.value;
  });
  
  async function verificarCodigo() {
    try {
      // Hacer una solicitud al servidor para verificar el código
      const response = await useUsuario.verificarCodigo(codigoVerificacion.value);
  
      if (response.status === 200) {
        Cookies.set('codigo', codigoVerificacion.value, {expires: 1})
        router.push('/NuevaContrasena');
      } else {
        // Manejar el caso en el que el código no es válido
        console.log('Código no válido');
      }
    } catch (error) {
      console.log(error);
    }
  }


async function enviarCorreo() {
  try {
    const response = await useUsuario.sendemail({ Correo: correoElectronico.value });

    if (response.status === 200) {
      Cookies.set('correo', correoElectronico.value, { expires: 1 });
      activar.value = true;
      router.push('/codigo-recuperacion');
    }
  } catch (error) {
    console.log(error);
  }
}
  </script>

<style scoped>

.body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
}

.container {
    background-color: #fff;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;

}


h2 {
    display: flex;
    text-align: center;
    margin: 0;
    padding: 0;
}


form {
    display: flex;
    flex-direction: column;
}

fieldset {
    border: none;
    padding: 0;
    margin-bottom: 20px;
}

legend {
    margin-bottom: 10px;
    font-weight: bold;
}

.contenedor_input {
    padding: 10px;
}

.input1 {
    border: 1px solid black;
    border-radius: 5px;
}

.contenedor_boton {
    display: flex;
    margin-top: 30px;
    justify-content: space-around;
    flex-wrap: wrap;
}

.texto1{
    padding: 10px;
    margin-top: 15%;
}

.texto2{
    text-align: center;
    padding: 15px;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}

button[type="reset"] {
    background-color: #6c757d;
}

button[type="reset"]:hover {
    background-color: #5a6268;
}

@media screen and (max-width: 350px) {
    .body {
        justify-content: flex-start;
        padding: 20px;
    }

    .container {
        border-radius: 0;
        max-width: 100%;
    }

    p {
        padding: 15px;
        margin-top: 10px;
    }

    h2 {
        font-size: 3em;
    }

    .contenedor_boton {
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    button {
        margin-bottom: 10px;
    }
}</style>