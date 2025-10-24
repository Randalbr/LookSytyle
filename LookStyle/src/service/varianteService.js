import axios from "axios";
import API_URL from "../utils/api";
import getAuthHeaders from "../utils/token";

export const getVariantes = async () => {
  const res = await axios.get(`${API_URL}variantes`, getAuthHeaders());
  return res.data;
};

export const getVarianteById = async (id) => {
  const res = await axios.get(`${API_URL}variantes/${id}`, getAuthHeaders());
  return res.data;
};

export const createVariante = async (formData) => {
  const auth = getAuthHeaders();

  const res = await axios.post(`${API_URL}variantes`, formData, {
    headers: {
      ...auth.headers,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateVariante = async (id, formData) => {
  const auth = getAuthHeaders();

  const res = await axios.put(`${API_URL}variantes/${id}`, formData, {
    headers: {
      ...auth.headers,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deleteVariante = async (id) => {
  const auth = getAuthHeaders();
  const res = await axios.delete(`${API_URL}variantes/${id}`, auth);
  return res.data;
};
