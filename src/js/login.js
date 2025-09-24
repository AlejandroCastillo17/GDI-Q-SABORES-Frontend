import axios from "axios";

export const authentication = async (datos) => {
  try {
    const response = await axios.post(
      "http://qsabores-backend-dacpsw-6d0816-72-60-26-170.dokploy.app/sabores/api/v1/usuarios/login/",
      datos,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      // Guardar el token en el almacenamiento local
      sessionStorage.setItem("token", response.data.token);
    }
    return response;
  } catch (error) {
    console.error(
      "Error al enviar datos:",
      error.response?.data || error.message
    );
    return error.response || error.message;
  }
};
