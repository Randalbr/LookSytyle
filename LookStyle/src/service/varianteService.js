import axios from "axios";
import API_URL from "../utils/api";
import getAuthHeaders from "../utils/token";

export const getVariantes = async () => {
  const { data } = await axios.get(`${API_URL}variantes`, getAuthHeaders());
  return data;
};

export const getVarianteById = async (id) => {
  const { data } = await axios.get(`${API_URL}variantes/${id}`);
  return data;
};

export const createVariante = async (formData) => {
 for (const pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}

  const auth = getAuthHeaders()
  const { data } = await axios.post(`${API_URL}variantes`, formData, {
    headers: { 
      ...auth.headers,
    },
  });
  return data;
};

export const updateVariante = async (id, formData) => {
   const auth = getAuthHeaders()
  const { data } = await axios.put(`${API_URL}variantes/${id}`, formData, {
    headers: { 
       ...auth.headers,
    },
  });
  return data;
};

export const deleteVariante = async (id) => {
  const { data } = await axios.delete(`${API_URL}variantes/${id}`, getAuthHeaders());
  return data;
};
