import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';


export const usepedidostore = defineStore('pedido', () => {
    const pedido = ref([]);

    const obtenerinfopedido = async () => {
        try {
            let responsepedido = await axios.get('pedido/pedidobusca');
            pedido.value = responsepedido.data.pedidos; 
        } catch (error) {
            throw error
        }
    };

    const postinfopedido = async (data) =>{
        try {
            let res = await axios.post('pedido/pedidocrear', data);
            return res
        } catch (error) {
            throw error
        }
    }

    const puteditarpedido = async (id, data) => {
        try {
            let res = await axios.put(`pedido/pedidomodificar/${id}`, data);
            return res
        } catch (error) {
            throw error;
        }
    };

    const putinactivarpedido = async (id)=>{
        try {
            let r = await axios.put(`pedido/pedidoinac/${id}`)
            return r
        } catch (error) {
            console.log(error, "Error al cambiar el estado el pedido");
        }
    }
    const putactivarpedido = async (id)=>{
        try {
            let r = await axios.put(`pedido/pedidoact/${id}`)
            return r
        } catch (error) {
            console.log(error, "Error al cambiar el estado el pedido");
        }
    }

    return{
        pedido,
        obtenerinfopedido, postinfopedido, puteditarpedido, putinactivarpedido, putactivarpedido
    };
});