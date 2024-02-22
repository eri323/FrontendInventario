import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';


export const usedistribucionlotefichastore = defineStore('distribucionloteficha', () => {
    const distribucionloteficha = ref([]);

    const obtenerinfodistribucionloteficha = async () => {
        try {
            let responsedistribucionloteficha = await axios.get('disloteficha/dislotefichabusca');
            console.log(responsedistribucionloteficha);
            distribucionloteficha.value = responsedistribucionloteficha.data.distribucionloteficha;
        } catch (error) {
            throw error
        }
    };

    const postinfodistribucionloteficha = async (data) => {
        try {
            let responsedistribucionloteficha = await axios.post('disloteficha/dislotefichacrear', data);
            return responsedistribucionloteficha
        } catch (error) {
            throw error
        }
    };

    const puteditardistribucionloteficha = async (id, data) => {
        try {
            let responsedistribucionloteficha = await axios.put(`disloteficha/dislotefichamodificar/${id}`, data);
            return responsedistribucionloteficha
        } catch (error) {
            throw error;
        }
    };

    const putInactivardistribucionloteficha = async (id) => {
        try {
            let responsedistribucionloteficha = await axios.put(`disloteficha/dislotefichainc/${id}`)
            return responsedistribucionloteficha
        } catch (error) {
            console.log(error, "Error al cambiar el estado del distribucionloteficha");
        }
    };
    const putActivardistribucionloteficha = async (id) => {
        try {
            let responsedistribucionloteficha = await axios.put(`disloteficha/dislotefichaact/${id}`)
            return responsedistribucionloteficha
        } catch (error) {
            console.log(error, "Error al cambiar el estado del distribucionloteficha");
        }
    };

    return {
        distribucionloteficha,
        obtenerinfodistribucionloteficha, postinfodistribucionloteficha, puteditardistribucionloteficha, putInactivardistribucionloteficha, putActivardistribucionloteficha
    };
});