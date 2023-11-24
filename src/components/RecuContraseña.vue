<template>
    <div class="body">
        <div class="container">
            <h2>Restablecer Contraseña</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores aliquid, suscipit iste repudiandae placeat, accusamus voluptatum molestiae labore sint aliquam eum rerum, dignissimos deserunt sit ducimus delectus culpa nihil iusto?</p>
            <form>
                <label for="email">E-mail:</label>
                <input type="email" id="email" name="email" required>
                <label for="code">Código de verificación:</label>
                <input type="text" id="code" name="code" required>
                <div class="contenedor_boton">
                <button type="submit">Restablecer</button>
                <button type="reset">Cancelar</button>
            </div>
            </form>
        </div>
    </div>
    </template>
    
    
    <script setup>
    
    
    </script>
    
    
    <style scoped>
    .body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f0f0f0;
    }
    
    .container {
        background-color: #fff;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        height: 80%;
        width: 100%;
    }
    p{
        text-align: center;
    }
    
    h2 {
        margin-bottom: 1.5rem;
        text-align: center;
    }
    
    form {
        display: flex;
        flex-direction: column;
    }
    
    label {
        margin-bottom: 0.5rem;
    }
    
    input {
        margin-bottom: 1.5rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    
    button {
        margin-bottom: 1rem;
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .contenedor_boton{
        display: flex;
        justify-content: space-between;
    }
    
    button:hover {
        background-color: #0056b3;
    }
    
    button[type="reset"] {
        background-color: #6c757d;
    }
    
    button[type="reset"]:hover {
        background-color: #5a6268;
    }
    
    
    </style>