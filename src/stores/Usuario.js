import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';


export const useusuariostore = defineStore('usuario', () => {
    const usuario = ref([]);

    const obtenerinfousuario = async () => {
        try {
            let responseusuario = await axios.get('usuario/usuariobusca');
            console.log(responseusuario);
            usuario.value = responseusuario.data.usuarios;
        } catch (error) {
            throw error
        }
    };

    const postinfousuario = async (data) => {
        try {
            let responseusuario = await axios.post('usuario/usuariocrear', data);
            return responseusuario
        } catch (error) {
            throw error
        }
    };

    const puteditarusuario = async (id, data) => {
        try {
            let responseusuario = await axios.put(`usuario/usuariomodificar/${id}`, data);
            return responseusuario
        } catch (error) {
            throw error;
        }
    };

    const putInactivarusuario = async (id) => {
        try {
            let responseusuario = await axios.put(`usuario /usuarioinac/ ${id}`)
            return responseusuario
        } catch (error) {
            console.log(error, "Error al cambiar el estado del usuario");
        }
    };
    const putActivarusuario = async (id) => {
        try {
            let responseusuario = await axios.put(`usuario / usuarioact / ${id}`)
            return responseusuario
        } catch (error) {
            console.log(error, "Error al cambiar el estado del usuario");
        }
    };
    const usuarios = ref([])
    const login = async (data) => {
        try {

            let r = await axios.post(`usuario/login`, data)
            
            usuarios.value = r.data.usuario
            return r.status
        } catch (error) {
            console.log(error);
            return error.response.data
        }
    }

    return {
        usuario, usuarios,
        obtenerinfousuario,login, postinfousuario, puteditarusuario, putInactivarusuario, putActivarusuario
    };
});