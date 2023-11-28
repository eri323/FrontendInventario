<template>
  <div>
    <h1 style="text-align: center;">Perfil</h1>
    <div class="row justify-center">
      <q-card class="col-4" style="max-width: 500px; border-radius: 20px 0 0 20px; border: 0;">
        <q-card-section>
          <h4>Nombre</h4>
          <img src="../assets/user.jpg" alt="">
        </q-card-section>
      </q-card>

      <q-card class="col-4" style="max-width: 900px; border-radius: 0 ;">
        <q-card-section>
          <h4>Rol</h4>
        </q-card-section>

        <q-card-section style="border: none;">
          <li>edad</li>
          <li>ciudad</li>
          <li>telefono</li>
          <li>email</li>
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
        <q-btn label="¿Ayuda?" color="secondary" style="margin: 10px; "/>
        <q-btn label="Editar" color="secondary" style="margin: 10px; "/>
      </div>
    </div>

  </div>
</template>
  
<script>

</script>
  
<style scoped>
img{
  border-radius: 50%;
  height: 400px;
  width: 400px;
}

h4{
  margin: 28px;
}

span{
  color: black;
}
</style>
  