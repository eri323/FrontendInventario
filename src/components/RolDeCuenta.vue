<template>
    <div class="body">
        <h2>Elige el rol de tu cuenta</h2>
        <p class="text">Felicitaciones todos tus datos son correctos. <br>Ahora selecciona tu rol.</p>
        <div class="Opc">
            <div class="Opcs">
                <i class="fa-solid fa-user-tie"></i>
                <p>Administrador</p>
            </div>
            <div class="Opcs"> 
                <i class="fa-solid fa-person-chalkboard"></i>
                <p>Instructor</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
*{
    font-family: 'Ubuntu', sans-serif;
}
.body{
    text-align: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
}
.Opc{
    display: flex;
    gap: 505px;
}
.Opcs i{
    font-size: 105px;
}
.Opcs p{
    margin: 0;
}
.text{
    font-size: 20px;
}
.Opcs{
    flex-direction: column;
    display: flex;
    gap: 15px;
    background-color: white;
    padding: 15px;
    border-radius: 25px;
    width: 170px;
    cursor: pointer;
}
</style>

<script setup>
import { ref } from "vue";
</script>