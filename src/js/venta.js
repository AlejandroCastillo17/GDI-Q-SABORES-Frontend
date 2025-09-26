import axios from "axios";
export const venderProducto = async (data) => {
  try {
    const response = await axios.post(
      "api.qsabores.shop/sabores/api/v1/ventas/",
      data, // Aquí van los datos que envías
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Error al enviar datos:",
      error.response?.data || error.message
    );
    return error.response || error.message;
  }
};
