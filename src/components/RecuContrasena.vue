<template>
    <div class="body" v-if="!activar">
        <div class="container">
            <h2>Recuperar contraseña</h2>
            <p class="texto1">Por favor, introduce la dirección de correo electrónico asociada a tu
                cuenta de Gmail. Te enviaremos un enlace seguro para restablecer tu
                contraseña.</p>
            <form @submit="enviarCorreo">
                <div class="contenedor1">
                    <h1 style="font-size: 20px; height: 50px;">Ingrese su correo electrónico</h1>
                    <div class="contenedor_input">
                        <input type="email" class="input1" placeholder="Correo electrónico" v-model="correoElectronico"
                            required />
                    </div>
                    <div class="contenedor2">
                        <p v-if="!correoValido" class="texto1">Por favor ingrese un correo </p>
                     <button class="enviar" style="height: 40px; width:150px;" type="submit"
                            :disabled="!correoValido">Enviar correo</button>
                        <router-link to="/"><button class="volver">Volver</button></router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <Codigo v-if="activar"></Codigo>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useusuariostore } from "../stores/Usuario.js";
import Codigo from './CodigoRecuperar.vue';
import { Cookies } from 'quasar';

const correoElectronico = ref('');
const codigoVerificacion = ref('');

const useUsuario = useusuariostore();

const activar = ref(false)

const router = useRouter()
async function enviarCorreo(){
    try {
        const r = await useUsuario.sendemail({Correo: correoElectronico.value})
        console.log(r);

        if(r.status===200) {
            activar.value = true
            Cookies.set('correo', correoElectronico.value, {expires: 1})
            // const correo = Cookies.get('correo')
        }
    } catch (error) {
        console.log(error);
    }
}

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
    background: linear-gradient(to top, rgba(162, 211, 162, 0.774), white);
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


.volver{
  display: block;
  font-weight: bold;
  background: -webkit-linear-gradient(bottom, #2a9cdf, #0077ff);
  color: white;
  border-radius: 20px;
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
  border: none;
  transition: all 0.2s ease-in-out;
  height: 35px;
width: 150px;
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