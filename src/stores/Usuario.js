import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useusuariostore = defineStore("usuario", () => {
  const usuario = ref([]);
  const usuarios = ref([]);
  const tokenRef = ref(localStorage.getItem("token") || "");
  const usuarioLogeado = ref(
    JSON.parse(localStorage.getItem("usuarioData")) || null
  );

  const setToken = (token) => {
    tokenRef.value = token;
    localStorage.setItem("token", token);
  };

  const setUsuarioLogeado = (userData) => {
    usuarioLogeado.value = userData;
    localStorage.setItem("usuarioData", JSON.stringify(userData));
  };

  const obtenerinfousuario = async () => {
    try {
      const response = await axios.get("usuario/usuariobusca");
      return response.data;
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
      throw error;
    }
  };

  const login = async (data) => {
    try {
      let response = await axios.post(`usuario/login`, data);

      if (response.status === 200) {
        const token = response.data.token;
        const usuarioData = response.data.usuarios;
        setToken(token);
        setUsuarioLogeado(usuarioData);
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
    localStorage.removeItem("usuarioData");
    tokenRef.value = null;
    usuarioLogeado.value = null;
  };

  if (tokenRef.value) {
    obtenerinfousuario();
  }

  return {
    usuario,
    usuarios,
    obtenerinfousuario,
    login,
    logout,
    tokenRef,
    usuarioLogeado,
    setToken,
    setUsuarioLogeado,
    persist: true,
  };
});
