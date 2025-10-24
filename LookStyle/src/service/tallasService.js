import axios from "axios";
import API_URL from '../utils/api'
import getAuthHeaders from "../utils/token";

export const getTallas = async () => {
  const res = await axios.get(`${API_URL}tallas`);
  return res.data;
};

export const getTallaById = async(id) =>{
   const res = await axios.get((`${API_URL}tallas/${id}`));
  return res.data
}


export const createTalla = async (data) => {
  const res = await axios.post(`${API_URL}tallas`, data , getAuthHeaders());
  return res.data;
};

export const updateTalla = async (id, data) => {
  const res = await axios.put(`${API_URL}tallas/${id}`,data,getAuthHeaders());
  return res.data;
};

export const deleteTalla = async (id) => {
  const res = await axios.delete(`${API_URL}tallas/${id}`,getAuthHeaders());
  return res.data;
};
