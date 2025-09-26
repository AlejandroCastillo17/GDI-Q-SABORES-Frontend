import axios from "axios";

export const consultaCategoria = async () => {
  try {
    const categoria = await axios.get(
      "api.qsabores.shop/sabores/api/v1/categorias/",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      }
    );

    return categoria.data;
  } catch (error) {
    console.error(
      "Error al enviar datos:",
      error.response?.data || error.message
    );
    return error.response || error.message;
  }
};
