import axios from "axios";
import API_URL from "../utils/api";
import getAuthHeaders from "../utils/token";

export const getColores = async () => {
  const res = await axios.get(`${API_URL}colores`, getAuthHeaders());
  return res.data;
};

export const getColorById = async (id) => {
  const res = await axios.get(`${API_URL}colores/${id}`, getAuthHeaders());
  return res.data;
};

export const createColor = async (data) => {
  const res = await axios.post(`${API_URL}colores`, data, getAuthHeaders());
  return res.data;
};

export const updateColor = async (id, data) => {
  const res = await axios.put(`${API_URL}colores/${id}`, data, getAuthHeaders());
  return res.data;
};

export const deleteColor = async (id) => {
  const res = await axios.delete(`${API_URL}colores/${id}`, getAuthHeaders());
  return res.data;
};
