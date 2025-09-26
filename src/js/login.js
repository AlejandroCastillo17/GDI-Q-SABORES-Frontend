import axios from "axios";

export const authentication = async (datos) => {
  try {
    const response = await axios.post(
      "https://api.qsabores.shop/sabores/api/v1/usuarios/login/",
      datos,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //console.log('Respuesta del backend:', response);
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
