import axios from "axios";
import API_URL from "../utils/api";
import getAuthHeaders from "../utils/token";


export const getProductos = async () => {
  const res = await axios.get(`${API_URL}productos`, getAuthHeaders());
  return res.data;
};

export const getProductoById = async (id) => {
  const res = await axios.get(`${API_URL}productos/${id}`, getAuthHeaders());
  return res.data;
};

export const createProducto = async (formData) => {
  console.log(formData)

    const auth = getAuthHeaders();

  const res = await axios.post(`${API_URL}productos`, formData, {
    headers: {
      ...auth.headers, 
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};


export const updateProducto = async (id, formData) => {
  const auth = getAuthHeaders();

  const res = await axios.put(`${API_URL}productos/${id}`, formData, {
    headers: {
      ...auth.headers,
    },
  });

  return res.data;
};


export const deleteProducto = async (id) => {
  const res = await axios.delete(`${API_URL}productos/${id}`, getAuthHeaders());
  return res.data;
};
