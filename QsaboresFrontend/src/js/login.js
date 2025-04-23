import axios from 'axios';

export const authentication = async (datos) => {

  try {
    const response = await axios.post('http://127.0.0.1:8000/sabores/api/v1/usuarios/login/', datos, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Respuesta del backend:', response);
    return response;
  } catch (error) {
    console.error('Error al enviar datos:', error.response?.data || error.message);
    return error.response || error.message;
  }
};
