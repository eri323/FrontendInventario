<template>
  <div style="margin-top: 100px;">
    <h3 class="text-center">Presupuesto de programa</h3>
  </div>

  <div class="" style="margin-top: 90px; margin-bottom: 110px;">
    <div class="cardcontent">

      <div class="card">
        <div class="tools">
          <div class="circle">
            <span class="red box"></span>
          </div>
          <div class="circle">
            <span class="yellow box"></span>
          </div>
          <div class="circle">
            <span class="green box"></span>
          </div>
        </div>
        <div class="card__content">
          <p class="title">Fichas</p>
          <hr>
          <p class="content">
            <img class="imagenes_icon" src="../img/fichas1.png" alt="">
          </p>
        </div>
      </div>

      <div class="card">
        <div class="tools">
          <div class="circle">
            <span class="red box"></span>
          </div>
          <div class="circle">
            <span class="yellow box"></span>
          </div>
          <div class="circle">
            <span class="green box"></span>
          </div>
        </div>
        <div class="card__content">
          <p class="title">Productos</p>
          <hr>
          <p class="content">
            <img class="imagenes_icon" src="../img/productos.png" alt="">
          </p>
        </div>
      </div>

      <div class="card">
        <div class="tools">
          <div class="circle">
            <span class="red box"></span>
          </div>
          <div class="circle">
            <span class="yellow box"></span>
          </div>
          <div class="circle">
            <span class="green box"></span>
          </div>
        </div>
        <div class="card__content">
          <p class="title">Usuarios</p>
          <hr>
          <p class="content">
            <img class="imagenes_icon" src="../img/Usuario.png" alt="">
          </p>
        </div>
      </div>

      <div class="card">
        <div class="tools">
          <div class="circle">
            <span class="red box"></span>
          </div>
          <div class="circle">
            <span class="yellow box"></span>
          </div>
          <div class="circle">
            <span class="green box"></span>
          </div>
        </div>
        <div class="card__content">
          <p class="title">Areas</p>
          <hr>
          <p class="content">
            <img class="imagenes_icon" src="../img/area.png" alt="">
          </p>
        </div>
      </div>

      <div class="card">
        <div class="tools">
          <div class="circle">
            <span class="red box"></span>
          </div>
          <div class="circle">
            <span class="yellow box"></span>
          </div>
          <div class="circle">
            <span class="green box"></span>
          </div>
        </div>
        <div class="card__content">
          <p class="title">Lotes</p>
          <hr>
          <p class="content">
            <img class="imagenes_icon" src="../img/lotes.png" alt="">
          </p>
        </div>
      </div>

      <div class="card">
        <div class="tools">
          <div class="circle">
            <span class="red box"></span>
          </div>
          <div class="circle">
            <span class="yellow box"></span>
          </div>
          <div class="circle">
            <span class="green box"></span>
          </div>
        </div>
        <div class="card__content">
          <p class="title">Pedido</p>
          <hr>
          <p class="content">
            <img class="imagenes_icon" src="../img/pedido.png" alt="">
          </p>
        </div>
      </div>

      <div class="card">
        <div class="tools">
          <div class="circle">
            <span class="red box"></span>
          </div>
          <div class="circle">
            <span class="yellow box"></span>
          </div>
          <div class="circle">
            <span class="green box"></span>
          </div>
        </div>
        <div class="card__content">
          <p class="title">Perfil</p>
          <hr>
          <p class="content">
            <img class="imagenes_icon" src="../img/perfil.png" alt="">
          </p>
        </div>
      </div>

      <div class="card">
        <div class="tools">
          <div class="circle">
            <span class="red box"></span>
          </div>
          <div class="circle">
            <span class="yellow box"></span>
          </div>
          <div class="circle">
            <span class="green box"></span>
          </div>
        </div>
        <div class="card__content">
          <p class="title">Historial</p>
          <hr>
          <p class="content">
            <img class="imagenes_icon" src="../img/fichas1.png" alt="">
          </p>
        </div>
      </div>

      <div class="card">
        <div class="tools">
          <div class="circle">
            <span class="red box"></span>
          </div>
          <div class="circle">
            <span class="yellow box"></span>
          </div>
          <div class="circle">
            <span class="green box"></span>
          </div>
        </div>
        <div class="card__content">
          <p class="title">Item de Presupuesto</p>
          <hr>
          <p class="content">
            <img class="imagenes_icon" src="../img/fichas1.png" alt="">
          </p>
        </div>
      </div>

      <div class="card">
        <div class="tools2">
          <div class="circle">
            <span class="red box"></span>
          </div>
          <div class="circle">
            <span class="yellow box"></span>
          </div>
          <div class="circle">
            <span class="green box"></span>
          </div>
        </div>
        <div class="card__content">
          <p class="title">Item de Presupuesto</p>
          <hr>
          <p class="content">
            <img class="imagenes_icon" src="../img/fichas1.png" alt="">
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="row justify-start q-pa-xl">
    <q-btn label="¿Ayuda?" type="submit" color="secondary" />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      model: ref("one"),
      search1: ref(""),
      search2: ref(""),
      options: [
        { label: "Descargar datos en pdf", value: "Descargarpdf" },
        { label: "Descargar datos CSV o EXEL", value: "two" },
      ],
    };

  },
};
</script>

<style scoped>
* {
  font-family: "save";
}

.card {
  width: 200px;
  height: 250px;
  margin: 0 auto;
  background-color: #f4f4f3;
  border-radius: 8px;
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.card:hover {
  transform: scale(0.9);
  transition: ease 0.6s;
}

.card::after {
  position: absolute;
  content: '';
  background-color: #21ba45;
  width: 50px;
  height: 100px;
  z-index: -1;
  border-radius: 8px;
}

.cardcontent{
  display: flex;
  flex-wrap: wrap;
  padding: 0px 150px;
  gap: 120px;
}
.tools {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px 0px 10px;
  background: #21ba45;
  margin-top: -2px;
}

.tools2 {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius:10px 0px 10px 0px;
  background: #21ba45;
  margin-top: -2px;
}

.circle {
  padding: 0 4px;
}

.card__content {
  margin: 0px;
  border-radius: 8px;
  background: #f4f4f3;
  padding: 10px;
}

.title {
  font-size: 25px;
  text-align: center;
  margin: 0;
}

.content {
  font-size: 14px;
}

.imagenes_icon {
  width: 100%;
}

.box {
  display: inline-block;
  align-items: center;
  width: 10px;
  height: 10px;
  padding: 1px;
  border-radius: 50%;
}

.red {
  background-color: #ffffff;
}

.yellow {
  background-color: #ffffff;
}

.green {
  background-color: #ffffff;
}
</style>

