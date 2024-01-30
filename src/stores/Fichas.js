import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';


export const usefichastore = defineStore('ficha', () => {
    const fichas = ref([]);

    const obtenerinfoficha = async () => {
        try {
            let responseficha = await axios.get('ficha/fichabusca');
            console.log(responseficha);
            fichas.value = responseficha.data.fichas; 
        } catch (error) {
            throw error
        }
    };

    const postinfoficha = async (data) =>{
        try {
            let res = await axios.post('ficha/fichacrear', data);
            console.log(res);
            console.log(data);
            return res
        } catch (error) {
            throw error
        }
    }

    const puteditarficha = async (id, data) => {
        try {
            let res = await axios.put(`ficha/fichamodificar/${id}`, data);
            return res
        } catch (error) {
            throw error;
        }
    };

    const putinactivarficha = async (id)=>{
        try {
            let r = await axios.put(`ficha/fichainac/${id}`)
            return r
        } catch (error) {
            console.log(error, "Error al cambiar el estado el ficha");
        }
    }
    const putactivarficha = async (id)=>{
        try {
            let r = await axios.put(`ficha/fichaact/${id}`)
            return r
        } catch (error) {
            console.log(error, "Error al cambiar el estado el ficha");
        }
    }

    return{
        fichas,
        obtenerinfoficha, postinfoficha, puteditarficha, putinactivarficha, putactivarficha
    };
});