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
        <h4>Rol</h4>
        <q-card-section class="mitad">
          <q-card-section class="sepa" style="width: 200px;">
              <li>edad</li>
              <li>ciudad</li>
              <li>telefono</li>
              <li>email</li>
          </q-card-section>
          <q-card-section class="sepa" style="border: none; ;">
            <p>Editar</p>
            <div class="form">
          <div class="q-pa-md" style="max-width: 200px">
            <h5 style="margin: 0; padding: 0px 0px 18px 0px; font-weight: bold">
              {{ text }}
            </h5>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input
                filled
                v-model="codigodeficha"
                label="Edad"
                type="number"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Porfavor escribe tu edad',
                ]"
              />

              <q-input
                filled
                v-model="nombre"
                label="Nombre de la ciudad"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Porfavor ingresa el nombre de la ciudad',
                ]"
              />
              <q-input
                filled
                v-model="niveldeformacion"
                label="escriba su edad"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Porfavor ingrese su edad',
                ]"
              />
              <q-select
                filled
                v-model="area_id"
                label="Porfavor inglrese su gmail"
                :options="options"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Porfavor seleccione un area ',
                ]"
              />

              <div class="btn-agregar">
                <button
                  class="btnagregar"
                  @click="agregarficha()"
                  v-if="btnagregar"
                >
                  Agregar
                </button>
                <button
                  class="btnagregar"
                  @click="agregarficha()"
                  v-if="btnaceptar"
                >
                  Aceptar
                </button>
              </div>
              <!--  <div>
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div> -->
            </q-form>
          </div>
        </div>
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
        <q-btn label="Editar" color="secondary" style="margin: 10px; " />
      </div>
    </div>

  </div>
</template>
  
<script>

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

span {
  color: black;
}

.Medio {
  width: 500px;
  display: flex;

}
.mitad{
display: flex;
align-items: center;
margin-right: 100px;
}
.sepa{
  width: 300px;
}
</style>
  