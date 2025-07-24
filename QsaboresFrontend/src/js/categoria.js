import axios from 'axios';

export const consultaCategoria = async () => {
  try {
    const categoria = await axios.get('http://127.0.0.1:8000/sabores/api/v1/categorias/',  {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`,
      }
    });
    
    return categoria.data;
  } catch (error) {
    console.error('Error al enviar datos:', error.response?.data || error.message);
    return error.response || error.message;
  }
};

export const crearCategoria = async (categoriaData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/sabores/api/v1/categorias/', categoriaData, // Aquí van los datos que envías
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

export const editarCategoria = async (categoria, id) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/sabores/api/v1/categorias/${id}/`, categoria,
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

export const eliminarCategorias = async (CategoriasIds) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/sabores/api/v1/categorias/bulk_delete/', CategoriasIds, 
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