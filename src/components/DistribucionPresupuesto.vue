<template>
    <div class="a">
        <div class="aa">
            <div class="title">
                <h4>DistribucionPresupuesto</h4>
            </div>
            <div class="data">
                <h6>{{ Lote_Id }}</h6>
                <h6>{{ item2 }}</h6>
                <h6>{{ item3 }}</h6>
            </div>
        </div>
       
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useitempresupuestostore } from "../stores/ItemPresupuesto.js"
/* import { uselotestore } from "../stores/Lote.js"; */
const itempresupuestostore = useitempresupuestostore();
const lotestore = uselotestore();
let Lote_Id = ref("");
let item2 = ref("");
let item3 = ref("");

onMounted(() => {
    fetchData();
});

async function fetchData() {
    const data = await lotestore.obtenerinfolote(); // Suponiendo que haya una función en tu store para obtener los datos
    Lote_Id.value = data.Lote_Id;
    item2.value = data.item2;
    item3.value = data.item3;
}
</script>

<style scoped>
.a {
   
    height: 100vh;
}
.aa{
    background-color: white;
}
.title{
    display: flex;
justify-content: center;
}

</style>
