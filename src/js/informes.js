import axios from "axios";

export const ConsultarInformes = async () => {
  try {
    const informes = await axios.get(
      "http://127.0.0.1:8000/sabores/api/v1/informes/",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      }
    );

    return informes.data;
  } catch (error) {
    console.error(
      "Error al enviar datos:",
      error.response?.data || error.message
    );
    return error.response || error.message;
  }
};
