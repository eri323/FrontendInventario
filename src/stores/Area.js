import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';


export const useareastore = defineStore('area', () => {
    const area = ref([]);

    const obtenerinfoarea = async () => {
        try {
            let responsearea = await axios.get('area/areabusca');
            console.log(responsearea);
            area.value = responsearea.data.areaList; 
        } catch (error) {
            throw error
        }
    };

    const postinfoarea = async (data) =>{
        try {
            let res = await axios.post('area/areacrear', data);
            return res
        } catch (error) {
            throw error
        }
    }

    const puteditararea = async (id, data) => {
        try {
            let res = await axios.put(`area/areamodificar/${id}`, data);
            return res
        } catch (error) {
            throw error;
        }
    };

    const putinactivararea = async (id)=>{
        try {
            let r = await axios.put(`area/areainac/${id}`)
            return r
        } catch (error) {
            console.log(error, "Error al cambiar el estado el area");
        }
    }
    const putactivararea = async (id)=>{
        try {
            let r = await axios.put(`area/areaact/${id}`)
            return r
        } catch (error) {
            console.log(error, "Error al cambiar el estado el area");
        }
    }

    return{
        area,
        obtenerinfoarea, postinfoarea, puteditararea, putinactivararea, putactivararea
    };
});