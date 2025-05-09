import axios from 'axios';

export const consultaInventario = async () => {

  try {
    const productos = await axios.get('http://127.0.0.1:8000/sabores/api/v1/productos/',  {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`,
      }
    });
    
    return productos.data;
  } catch (error) {
    console.error('Error al enviar datos:', error.response?.data || error.message);
    return error.response || error.message;
  }
};







