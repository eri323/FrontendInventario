<template>
  <body>
    <div class="contenedor_principal">
      <div class="contenedor_titulos">
        <p class="titulo" >Distribucion de Inventario</p>
        <p class="titulo2">Version 1.0</p>
      </div>
      <div class="contenedor">
        <div class="contenedor2">

          

          <div class="row justify-start q-pa-xl">
            <q-btn label="¿Ayuda?" type="submit" color="secondary" />
          </div>

        </div>
      </div>
    </div>
  </body>
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

body {
  margin: 0;
  background-color: #ecf0f5;
}

.contenedor_principal {
  background-color: #ecf0f5;
}

.contenedor_titulos{
  display: flex;
}

.titulo {
  margin: 0;
  font-size: 25px;
  margin-left: 12px;
}

.titulo2 {
  position: relative;
  top: 13px;
  color: #747272af;
  margin-left: 12px;
  font-size: 13px;
}

.contenedor {
  height: 100%;
}

.contenedor2 {
  margin: 14px;
  background: #ffffff;
  height: 100%;
  border-radius: 2px;
  border-top: 3px solid rgba(170, 168, 168, 0.575);
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
  border-radius: 10px 0px 10px 0px;
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

