import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';


export const usefichastore = defineStore('ficha', () => {
    const ficha = ref([]);

    const obtenerinfoficha = async () => {
        try {
            let responseficha = await axios.get('ficha/fichabusca');
            ficha.value = responseficha.data.ficha; 
        } catch (error) {
            throw error
        }
    };

    const postinfoficha = async (data) =>{
        try {
            let res = await axios.post('ficha/fichacrear', data);
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

    const putinactivar = async (id)=>{
        try {
            let r = await axios.put(conductor/conductorinac/${id})
            return r
        } catch (error) {
            console.log(error, "Error al cambiar el estado el conductor");
        }
    }
    const putActivarConductor = async (id)=>{
        try {
            let r = await axios.put(conductor/conductoract/${id})
            return r
        } catch (error) {
            console.log(error, "Error al cambiar el estado el conductor");
        }
    }

    return{
        ficha,
        obtenerinfoficha, postinfoficha, puteditarficha, putInactivarConductor, putActivarConductor
    };
});