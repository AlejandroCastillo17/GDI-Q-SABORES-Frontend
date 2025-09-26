import axios from "axios";

export const consultaProveedores = async () => {
  try {
    const proveedores = await axios.get(
      "api.qsabores.shop/sabores/api/v1/proveedores/",
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

export const editarProveedor = async (proveedor, id) => {
  try {
    const response = await axios.put(
      `api.qsabores.shop/sabores/api/v1/proveedores/${id}/`,
      proveedor,
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

export const crearProveedores = async (proveedoresData) => {
  try {
    const response = await axios.post(
      "api.qsabores.shop/sabores/api/v1/proveedores/",
      proveedoresData, // Aquí van los datos que envías
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

export const eliminarProveedores = async (proveedoresIds) => {
  try {
    const response = await axios.post(
      "api.qsabores.shop/sabores/api/v1/proveedores/bulk_delete/",
      proveedoresIds,
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
