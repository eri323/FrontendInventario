import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useusuariostore = defineStore("usuario", () => {
  const usuario = ref([]);
  const usuarios = ref([]);
  const tokenRef = ref(localStorage.getItem("token") || null);

  const setToken = (token) => {
    localStorage.setItem("token", token);
    tokenRef.value = token;
  };

  const obtenerinfousuario = async () => {
    try {
      let responseusuario = await axios.get("usuario/usuariobusca");
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

  const login = async (data) => {
    try {
      let response = await axios.post(`usuario/login`, data);

      if (response.status === 200) {
        const token = response.data.token;
        setToken(token);
        const usuarioData = response.data.usuarios;
        usuarios.value = usuarioData;
        console.log("Información del usuario:", usuarioData);
        return { status: response.status, token };
      } else {
        return { status: response.status, token: null };
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      return { status: error.response.status, token: null };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    tokenRef.value = null;
  };

  return {
    usuario,
    usuarios,
    obtenerinfousuario,
    login,
    logout,
    tokenRef,
    setToken,
    postinfousuario,
    puteditarusuario,
    putInactivarusuario,
    putActivarusuario,
  };
});
