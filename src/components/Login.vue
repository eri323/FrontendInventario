<template>
    <div class="container">
        <h1>Log in</h1>
        <div class="row justify-center  ">
            <q-card class="col-4" style="max-width: 600px; border-radius: 20px 0 0 20px; border: 0;">
                <q-card-section>
                </q-card-section>

                <q-card-section style="border: none;">
                    <img src="../assets/user.jpg" alt="">
                </q-card-section>
            </q-card>

            <q-card class="col-4" style="max-width: 600px; border-radius: 0 20px 20px 0;">
                <q-card-section>
                    <h4>Digite sus datos</h4>
                </q-card-section>

                <q-card-section style="border: none;">
                    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                        <q-input filled v-model="nombre" label="Escriba su nombre *" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Este campo es requerido']" />

                        <q-input filled type="password" v-model="contraseña" label="DIgite su contraseña *" lazy-rules
                            :rules="[
                                val => val !== null && val !== '' || 'Este campo es requerido'
                            ]" />
                        
                            <a class="link" href="">¿Olvidaste tu Contraseña?</a>

                        <div class="row justify-center">
                            <q-btn label="Ingresar" type="submit" color="secondary" />
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>
  
<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
    setup() {
        const $q = useQuasar()

        const name = ref(null)
        const age = ref(null)
        const accept = ref(false)

        return {
            name,
            password: ref(''),
            accept,
            inception: ref(false),
            secondDialog: ref(false),

            onSubmit() {
                if (accept.value !== true) {
                    $q.notify({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'warning',
                        message: 'You need to accept the license and terms first'
                    })
                }
                else {
                    $q.notify({
                        color: 'green-4',
                        textColor: 'white',
                        icon: 'cloud_done',
                        message: 'Submitted'
                    })
                }
            },

            onReset() {
                name.value = null
                age.value = null
                accept.value = false
            }
        }
    },
    methods: {

        tomarFoto() {
            console.log("Tomar foto");
        },

        subirDesdeEquipo() {
            console.log("Subir desde tu equipo");
        },
    }

}
</script>
  
<style>
* {
    color: black;
}

body {
    background: linear-gradient(to top, rgba(162, 211, 162, 0.774), white);
    height: 100vh;
}

.link{
    text-align: center;
}

h1{
    text-align: center;
}
img {
    border-radius: 50%;
    height: 400px;
    width: 400px;
}
</style>
  