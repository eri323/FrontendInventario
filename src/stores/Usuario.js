  import { defineStore } from "pinia";
  import axios from "axios";
  import { ref } from "vue";

  export const useusuariostore = defineStore("usuario", () => {
    const usuario = ref([]);
    const usuarios = ref([]);
    const tokenRef = ref(localStorage.getItem("token") || ""); 
    const usuarioLogeado = ref();

    const setToken = (token) => {
      tokenRef.value = token;
    };

    const setUsuarioLogeado = (userData) => {
      usuarioLogeado.value = userData;
    };

    const obtenerinfousuario = async () => {
      try {
        const response = await axios.get('usuario/usuariobusca');
        // console.log(response);
        return response.data;
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
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
          const usuarioData = response.data.usuarios;
          setToken(token);
          setUsuarioLogeado(usuarioData);
          localStorage.setItem('token', token); 
          localStorage.setItem('usuarioData', JSON.stringify(usuarioData)); 
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

    const sendemail = async (correo) => {
      try {
        let response = await axios.post(`usuario/recuperar-password`, correo);
        return response;
      } catch (error) {
        console.log("Nokas pelotas", error);
      }
    }

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('usuarioData');
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
      sendemail,
      setUsuarioLogeado,
      postinfousuario,
      puteditarusuario,
      putInactivarusuario,
      putActivarusuario,
      persist: true
    };
  });
