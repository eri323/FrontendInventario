import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';


export const usedistribucionpresupuestostore = defineStore('distribucionpresupuesto', () => {
    const distribucionpresupuesto = ref([]);

    const obtenerinfodistribucionpresupuesto = async () => {
        try {
            let responsedistribucionpresupuesto = await axios.get('dispresupuesto/dispresupuestobusca');
            console.log(responsedistribucionpresupuesto);
            distribucionpresupuesto.value = responsedistribucionpresupuesto.data.distribucionpresupuesto;
        } catch (error) {
            throw error
        }
    };

    const postinfodistribucionpresupuesto = async (data) => {
        try {
            console.log("data:", data);
            let responsedistribucionpresupuesto = await axios.post('dispresupuesto/dispresupuestocrear', data);
            return responsedistribucionpresupuesto
        } catch (error) {
            throw error
        }
    };

    const puteditardistribucionpresupuesto = async (id, data) => {
        try {
            let responsedistribucionpresupuesto = await axios.put(`dispresupuesto/dispresupuestomodificar/${id}`, data);
            return responsedistribucionpresupuesto
        } catch (error) {
            throw error;
        }
    };

    const putInactivardistribucionpresupuesto = async (id) => {
        try {
            let responsedistribucionpresupuesto = await axios.put(`dispresupuesto/dispresupuestoinac/${id}`)
            return responsedistribucionpresupuesto
        } catch (error) {
            console.log(error, "Error al cambiar el estado del distribucionpresupuesto");
        }
    };
    const putActivardistribucionpresupuesto = async (id) => {
        try {
            let responsedistribucionpresupuesto = await axios.put(`dispresupuesto/dispresupuestoact/${id}`)
            return responsedistribucionpresupuesto
        } catch (error) {
            console.log(error, "Error al cambiar el estado del distribucionpresupuesto");
        }
    };

    return {
        distribucionpresupuesto,
        obtenerinfodistribucionpresupuesto, postinfodistribucionpresupuesto, puteditardistribucionpresupuesto, putInactivardistribucionpresupuesto, putActivardistribucionpresupuesto
    };
});