<template>
  <body>
    <div class="contenedor_principal">
      <div class="contenedor_titulos">
        <p class="titulo">Distribucion de Inventario</p>
        <p class="titulo2">Version 1.0</p>
      </div>
      <div class="contenedor">
        <div class="q-pa-md" style="width: 100%;">
          <q-list padding bordered class="rounded-borders" default-opened
            style="background-color: rgba(255, 255, 255, 0.575); border-top: 3px solid rgba(170, 168, 168, 0.575);">
            <q-expansion-item dense dense-toggle expand-separator icon="menu" v-model="isExpanded" label="Menu">
              <q-card>
                <q-card-section>
                  <div class="contenedor_caja1">
                    <router-link to="./TablaFichas" style="text-decoration: none; color: black; ">
                      <div class="contenedor_caja2">
                        <img class="caja_imagen" src="../img/fichas1.png" alt="">
                        <p class="nombre_img">Fichas</p>
                      </div>
                    </router-link>
                    <!-- ---------- -->
                    <router-link to="./TablaProductos" style="text-decoration: none; color: black; ">
                      <div class="contenedor_caja2">
                        <img class="caja_imagen" src="../img/productos.png" alt="">
                        <p class="nombre_img">Productos</p>
                      </div>
                    </router-link>
                    <!-- ---------- -->
                    <router-link to="./TablaUsuarios" style="text-decoration: none; color: black;">
                      <div class="contenedor_caja2">
                        <img class="caja_imagen" src="../img/Usuario.png" alt="">
                        <p class="nombre_img">Usuarios</p>
                      </div>
                    </router-link>
                    <!-- ---------- -->
                    <router-link to="./TablaArea" style="text-decoration: none; color: black;">
                      <div class="contenedor_caja2">
                        <img class="caja_imagen" src="../img/area.png" alt="">
                        <p class="nombre_img">Areas</p>
                      </div>
                    </router-link>
                    <!-- ---------- -->
                    <router-link to="./TablaLotes" style="text-decoration: none; color: black;">
                      <div class="contenedor_caja2">
                        <img class="caja_imagen" src="../img/lotes.png" alt="">
                        <p class="nombre_img">Lotes</p>
                      </div>
                    </router-link>
                    <!-- ---------- -->
                    <router-link to="./TablaPedidos" style="text-decoration: none; color: black;">
                      <div class="contenedor_caja2">
                        <img class="caja_imagen" src="../img/pedido.png" alt="">
                        <p class="nombre_img">Pedidos</p>
                      </div>
                    </router-link>
                    <!-- ---------- -->
                    <router-link to="/Perfil" style="text-decoration: none; color: black;">
                      <div class="contenedor_caja2">
                        <img class="caja_imagen" src="../img/perfil.png" alt="">
                        <p class="nombre_img">Perfil</p>
                      </div>
                    </router-link>
                    <!-- ---------- -->
                    <router-link to="./TablaHistorial" style="text-decoration: none; color: black;">
                      <div class="contenedor_caja2">
                        <img class="caja_imagen" src="../img/historial.png" alt="">
                        <p class="nombre_img">Historial</p>
                      </div>
                    </router-link>
                    <!-- ---------- -->
                    <router-link to="./ItemPresupuesto" style="text-decoration: none; color: black;">
                      <div class="contenedor_caja2">
                        <img class="caja_imagen2" src="../img/programa.png" alt="">
                        <p class="nombre_img">Presupuesto</p>
                      </div>
                    </router-link>
                    <!-- ---------- -->
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
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
    const isExpanded = ref(true);
    return {
      model: ref("one"),
      search1: ref(""),
      search2: ref(""),
      options: [
        { label: "Descargar datos en pdf", value: "Descargarpdf" },
        { label: "Descargar datos CSV o EXEL", value: "two" },
      ],
      isExpanded,
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
  height: 100vh;
}

.contenedor_titulos {
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

.contenedor_caja1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}


.contenedor_caja2 {
  display: grid;
  align-items: center;
  justify-content: center;
  width: 90px;
  background-color: #efeff0;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
}

.contenedor_caja2:hover {
  transform: scale(1.1);
  transition: all 700ms;
  background-color: #dadada;
  border: 1px solid rgb(138, 138, 138);
}

.caja_imagen {
  margin-top: 5px;
  height: 50px;
  width: 50px;
  background-size: contain;
}

.caja_imagen2 {
  position: relative;
  left: 15px;
  margin-top: 5px;
  height: 50px;
  width: 50px;
  background-size: contain;
}

.nombre_img {
  margin-top: 12px;
  font-weight: 600;
}

.contenedor2 {
  margin: 0px 16px 0px 16px;
  background: #ffffff;
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

