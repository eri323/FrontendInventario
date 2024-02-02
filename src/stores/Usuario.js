import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useusuariostore = defineStore("usuario", () => {
  const usuario = ref([]);
  const obtenerinfousuario = async () => {
    try {
      let responseusuario = await axios.get("usuario/usuariobusca");
      console.log(responseusuario);
      usuario.value = responseusuario.data.usuarios;
    } catch (error) {
      throw error;
    }
  };

  const postinfousuario = async (data) => {
    try {
      let responseusuario = await axios.post("usuario/usuariocrear", data);
      return responseusuario;
    } catch (error) {
      throw error;
    }
  };

  const puteditarusuario = async (id, data) => {
    try {
      let responseusuario = await axios.put(
        `usuario/usuariomodificar/${id}`,
        data
      );
      return responseusuario;
    } catch (error) {
      throw error;
    }
  };

  const putInactivarusuario = async (id) => {
    try {
      let responseusuario = await axios.put(`/usuario/usuarioinac/${id}`);
      console.log(responseusuario);
      return responseusuario;
    } catch (error) {
      console.log(error, "Error al cambiar el estado del usuario");
    }
  };

  const putActivarusuario = async (id) => {
    try {
      let responseusuario = await axios.put(`/usuario/usuarioact/${id}`);
      return responseusuario;
    } catch (error) {
      console.log(error, "Error al cambiar el estado del usuario");
    }
  };

  const usuarios = ref([]);
  const login = async (data) => {
    try {
      let response = await axios.post(`usuario/login`, data);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        const usuario = response.data.usuarios;
        usuarios.value = usuario;
        return { status: response.status, token };
      } else {
        return { status: response.status, token: null };
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      return { status: error.response.status, token: null };
    }
  };

  return {
    usuario,
    usuarios,
    obtenerinfousuario,
    login,
    postinfousuario,
    puteditarusuario,
    putInactivarusuario,
    putActivarusuario,
  };
});
