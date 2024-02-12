import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';


export const useitempresupuestostore = defineStore('itempresupuesto', () => {
    const itempresupuesto = ref([]);

    const obtenerinfoitempresupuesto = async () => {
        try {
            let responseitempresupuesto = await axios.get('itempresu/itempresubusca');
            console.log(responseitempresupuesto);
            itempresupuesto.value = responseitempresupuesto.data.itempresupuesto;
        } catch (error) {
            throw error
        }
    };

    const postinfoitempresupuesto = async (data) => {
        try {
            let responseitempresupuesto = await axios.post('itempresu/itempresucrear', data);
            return responseitempresupuesto
        } catch (error) {
            throw error
        }
    };

    const puteditaritempresupuesto = async (id, data) => {
        try {
            let responseitempresupuesto = await axios.put(`itempresu/itempresumodificar/${id}`, data);
            return responseitempresupuesto
        } catch (error) {
            throw error;
        }
    };

    const putInactivaritempresupuesto = async (id) => {
        try {
            let responseitempresupuesto = await axios.put(`itempresu/itempresuinac/${id}`)
            return responseitempresupuesto
        } catch (error) {
            console.log(error, "Error al cambiar el estado del itempresupuesto");
        }
    };
    const putActivaritempresupuesto = async (id) => {
        try {
            let responseitempresupuesto = await axios.put(`itempresu/itempresuact/${id}`)
            return responseitempresupuesto
        } catch (error) {
            console.log(error, "Error al cambiar el estado del itempresupuesto");
        }
    };

    return {
        itempresupuesto,
        obtenerinfoitempresupuesto, postinfoitempresupuesto, puteditaritempresupuesto, putInactivaritempresupuesto, putActivaritempresupuesto
    };
});