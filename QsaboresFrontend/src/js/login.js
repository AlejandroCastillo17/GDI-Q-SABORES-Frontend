import axios from 'axios';

export const authentication = async (datos) => {
  datos.nombre = "admin";
  console.log("Datos enviados:", datos);

  try {
    const response = await axios.post('http://127.0.0.1:8000/sabores/api/v1/login', datos, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Respuesta del backend:', response.data);
    return response.data;
  } catch (error) {
    error.value = false;
    console.error('Error al enviar datos:', error.response?.data || error.message);
    return error.response?.data || error.message;
  }
};
