import api from './api';

export const getEgresos = async (url) => (await api.get(`${url}/`)).data;
export const createEgreso = async (url, data) => await api.post(`${url}/`, data);
export const updateEgreso = async (url, id, data) => await api.put(`${url}/${id}/`, data);
export const deleteEgreso = async (url, ids) => {
  // Para eliminación múltiple
  console.log(ids)
  console.log(Array.isArray(ids))
  if (Array.isArray(ids)) {
    return await api.post(`/${url}/bulk_delete/`, { ids });
  }
  // Para eliminación individual
  return await api.delete(`/${url}/${ids}/`);
};
