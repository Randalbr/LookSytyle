import axios from "axios";
import API_URL from "../utils/api";
import getAuthHeaders from "../utils/token";

export const getCategorias = async () => {
  const res = await axios.get(`${API_URL}categorias`, getAuthHeaders());
  return res.data;
};

export const getCategoriaById = async (id) => {
  const res = await axios.get(`${API_URL}categorias/${id}`, getAuthHeaders());
  return res.data;
};

export const createCategoria = async (categoriaData) => {
  const formData = new FormData();
  formData.append("nombre", categoriaData.nombre);
  formData.append("descripcion", categoriaData.descripcion);
  formData.append("imagen", categoriaData.imagen);

  const auth = getAuthHeaders();

  const res = await axios.post(`${API_URL}categorias`, formData, {
    headers: {
      ...auth.headers, 
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateCategoria = async (id, categoriaData) => {
  const formData = new FormData();
  formData.append("nombre", categoriaData.nombre);
  formData.append("descripcion", categoriaData.descripcion);

  if (categoriaData.imagen instanceof File) {
    formData.append("imagen", categoriaData.imagen);
  }

  const auth = getAuthHeaders();

  const res = await axios.put(`${API_URL}categorias/${id}`, formData, {
    headers: {
      ...auth.headers,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deleteCategoria = async (id) => {
  const auth = getAuthHeaders();
  const res = await axios.delete(`${API_URL}categorias/${id}`, auth);
  return res.data;
};
