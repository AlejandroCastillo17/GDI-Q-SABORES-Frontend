import axios from "axios";

export const consultaProveedores = async () => {
  try {
    const proveedores = await axios.get(
      "http://127.0.0.1:8000/sabores/api/v1/proveedores/",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      }
    );

    return proveedores.data;
  } catch (error) {
    console.error(
      "Error al enviar datos:",
      error.response?.data || error.message
    );
    return error.response || error.message;
  }
};
