import axios from 'axios';

const api = axios.create({
  baseURL: 'http://qsabores-backend-dacpsw-8612bd-72-60-26-170.traefik.me/sabores/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;
