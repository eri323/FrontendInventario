<template>
  <div>
    <div class="row justify-center">
      <q-card class="col-4" style="max-width: 500px; border-radius: 20px 0 0 20px; border: 0;">
        <q-card-section>
          <h4>Registro de datos</h4>
        </q-card-section>

        <q-card-section style="border: none;">
          <img src="../assets/user.jpg" alt="">
        </q-card-section>
        <div class="row justify-center" style="margin-top: 100px;">
          <q-btn label="Subir foto" color="secondary" @click="inception = true" />
        </div>
      </q-card>

      <q-card class="col-4" style="max-width: 900px; border-radius: 0 20px 20px 0;">
        <q-card-section>
          <h4>Digite sus datos</h4>
        </q-card-section>

        <q-card-section style="border: none;">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input filled v-model="nombre" label="Escriba su nombre *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Este campo es requerido']" />

            <q-input filled v-model="apellido" label="Escriba su apellido *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Este campo es requerido']" />

            <q-input filled type="number" v-model="documento" label="DIgite el numero de su documento *" lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Please type your age',
                val => val > 0 && val < 100 || 'Please type a real age'
              ]" />

            <q-input filled v-model="departamento" label="Digite el departamento de residencia *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Este campo es requerido']" />

            <q-input filled v-model="ciudad" label="Digite la ciudad de residencia *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Este campo es requerido']" />

            <q-input filled v-model="direccion" label="Escriba su direccion *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Este campo es requerido']" />

            <q-input filled type="tel" v-model="telefono" label="DIgite el numero de su documento *" lazy-rules :rules="[
              val => val !== null && val !== '' || 'Please type your age',
              val => val > 0 && val < 100 || 'Please type a real age'
            ]" />

            <q-input filled type="email" v-model="email" label="Digite su email *" lazy-rules :rules="[
              val => val !== null && val !== '' || 'Please type your age',
              val => val > 0 && val < 100 || 'Please type a real age'
            ]" />

            <div class="row justify-center">
              <q-btn label="Crear cuenta" type="submit" color="secondary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="inception">
      <q-card>
        <q-card-section>
          <div class="text-h6">Foto de perfil</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn label="Tomar foto" color="secondary" @click="tomarFoto" />
          <q-btn label="Subir desde tu equipo" color="secondary" @click="subirDesdeEquipo" style="margin-left: 10px;" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cerrar" v-close-popup color="secondary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      age,
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
*{
  color: black;
}
body {
  background: linear-gradient(to top, rgba(162, 211, 162, 0.774), white);
}

img {
  border-radius: 50%;
  height: 400px;
  width: 400px;
}
</style>
