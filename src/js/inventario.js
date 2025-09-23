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

export const crearProductos = async (productoData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/sabores/api/v1/productos/', productoData, // Aquí van los datos que envías
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${sessionStorage.getItem('token')}`,
        }
      }
    );

    return response;
  } catch (error) {
    console.error('Error al enviar datos:', error.response?.data || error.message);
    return error.response || error.message;
  }
};

export const editarProductos = async (producto, id) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/sabores/api/v1/productos/${id}/`, producto,
       {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${sessionStorage.getItem('token')}`,
        }
      }
    );

    return response;
  } catch (error) {
    console.error('Error al enviar datos:', error.response?.data || error.message);
    return error.response || error.message;
  }
};

export const eliminarProductos = async (productoIds) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/sabores/api/v1/productos/eliminar_productos/', productoIds, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${sessionStorage.getItem('token')}`,
        }
      }
    );

    return response;
  } catch (error) {
    console.error('Error al enviar datos:', error.response?.data || error.message);
    return error.response || error.message;
  }
};





