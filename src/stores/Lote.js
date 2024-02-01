import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';


export const uselotestore = defineStore('lote', () => {
    const lote = ref([]);

    const obtenerinfolote = async () => {
        try {
            let responselote = await axios.get('lote/lotebusca');
            console.log(responselote);
            lote.value = responselote.data.lote;
        } catch (error) {
            throw error
        }
    };

    const postinfolote = async (data) => {
        try {
            let res = await axios.post('lote/lotecrear', data);
            return res
        } catch (error) {
            throw error
        }
    };

    const puteditarlote = async (id, data) => {
        try {
            let res = await axios.put(`lote/lotemodificar/${id}`, data);
            return res
        } catch (error) {
            throw error;
        }
    };

    const putInactivarlote = async (id) => {
        try {
            let r = await axios.put(`lote/loteinac/${id}`)
            return r
        } catch (error) {
            console.log(error, "Error al cambiar el estado del lote");
        }
    };
    const putActivarlote = async (id) => {
        try {
            let r = await axios.put(`lote/loteact/${id}`)
            return r
        } catch (error) {
            console.log(error, "Error al cambiar el estado del lote");
        }
    };

    return {
        lote,
        obtenerinfolote, postinfolote, puteditarlote, putInactivarlote, putActivarlote
    };
});