import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = {
  quotes: {
    create: (data) => axios.post(`${API_URL}/quotes`, data),
    getAll: () => axios.get(`${API_URL}/quotes`),
    getById: (id) => axios.get(`${API_URL}/quotes/${id}`)
  },
  contracts: {
    create: (data) => axios.post(`${API_URL}/contracts`, data),
    sign: (id, signatureData) => axios.post(`${API_URL}/contracts/${id}/sign`, { signatureData }),
    getById: (id) => axios.post(`${API_URL}/contracts`, id)
  }
};