<template>
    <div class="body">
        <div class="container">
            <h2>Recuperar contraseña</h2>
            <p class="texto1">Por favor, introduce la dirección de correo electrónico asociada a tu
                cuenta de Gmail. Te enviaremos un enlace seguro para restablecer tu
                contraseña.</p>
            <form @submit.prevent="enviarCorreo">
                <div class="contenedor1">
                    <h1 style="font-size: 20px; height: 50px;">Ingrese su correo electrónico</h1>
                    <div class="contenedor_input">
                        <input type="email" class="input1" placeholder="Correo electrónico" v-model="correoElectronico"
                            required />
                    </div>
                    <div class="contenedor2">
                        <p v-if="!correoValido" class="texto1">Por favor ingrese un correo </p>
                        <router-link to="/CodigoRecuperar"><button class="enviar" style="height: 40px; width:150px;" type="submit"
                            :disabled="!correoValido">Enviar correo</button></router-link>
                        <router-link to="/"><button>Volver</button></router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const correoElectronico = ref('');
const codigoVerificacion = ref('');

const enviarCorreo = () => {
    // Realizar validación antes de enviar el correo
    if (correoValido.value) {
        // Lógica para enviar el correo
        console.log('Correo válido, enviando...');
    } else {
        // Mostrar mensaje de error o tomar la acción correspondiente
        console.error('Por favor ingrese un correo ');
    }
};

const correoValido = computed(() => {
    return !!correoElectronico.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoElectronico.value);
});

const codigoValido = computed(() => {
    return !!codigoVerificacion.value;
});
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
    display: flex;
    flex-direction: column;
}

.container {
    background-color: #fff;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    height: 500px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.contenedor1 {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h2 {
    display: flex;
    text-align: center;
    margin: 0;
    padding: 0;
}

.contenedor_input {
    padding: 10px;
}

.input1 {

    border-radius: 5px;
    height: 40px;

}

.contenedor2 {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.enviar {
  display: block;
  width: 90%;
  font-weight: bold;
  background: -webkit-linear-gradient(bottom, #2dbd6e, #a6f77b);
  color: white;
  border-radius: 20px;
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
  border: none;
  transition: all 0.2s ease-in-out;
  margin-bottom: 30px;
}

.texto1 {
    margin: 0 0 16px;
    height: 30px;
    width: auto;
    font-size: 17px;
}
</style>