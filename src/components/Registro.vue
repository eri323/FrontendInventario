<template>
    <div class="row justify-center">
    <div class="col-4">
        <h4>Registro de datos</h4>
        <i class="fa-regular fa-circle-user" id="img"></i>
        <img src="" alt="">
        <div>
          <q-btn label="Subir foto" type="submit" color="primary"/>
        </div>
    </div>

    <div class="col-4">
    <h4>Digite sus datos</h4>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="nombre"
          label="Escriba su nombre *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          v-model="apellido"
          label="Escriba su apellido *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
  
        <q-input
          filled
          type="number"
          v-model="documento"
          label="DIgite el numero de su documento *"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Please type your age',
            val => val > 0 && val < 100 || 'Please type a real age'
          ]"
        />

        <q-input
          filled
          v-model="departamento"
          label="Digite el departamento de residencia *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
  
        <q-input
          filled
          v-model="ciudad"
          label="Digite la ciudad de residencia *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
  
        <q-input
          filled
          v-model="direccion"
          label="Escriba su direccion *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
  
        <q-input
          filled
          type="tel"
          v-model="telefono"
          label="DIgite el numero de su documento *"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Please type your age',
            val => val > 0 && val < 100 || 'Please type a real age'
          ]"
        />

        <q-input
          filled
          type="email"
          v-model="email"
          label="Digite su email *"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Please type your age',
            val => val > 0 && val < 100 || 'Please type a real age'
          ]"
        />
  
        <div>
          <q-btn label="Crear cuenta" type="submit" color="primary"/>
        </div>
      </q-form>
  
    </div>
</div>
</template>
  
  <script>
  import { useQuasar } from 'quasar'
  import { ref } from 'vue'
  
  export default {
    setup () {
      const $q = useQuasar()
  
      const name = ref(null)
      const age = ref(null)
      const accept = ref(false)
  
      return {
        name,
        age,
        accept,
  
        onSubmit () {
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
  
        onReset () {
          name.value = null
          age.value = null
          accept.value = false
        }
      }
    }
  }
  </script>
  
<style>
  #img {
    font-size: 200px;
}
</style>