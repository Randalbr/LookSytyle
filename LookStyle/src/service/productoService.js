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

export const createProducto = async (productoData) => {
  const formData = new FormData();
  formData.append("nombre", productoData.nombre);
  formData.append("descripcion", productoData.descripcion);
  formData.append("precio_base", productoData.precio_base);
  formData.append("id_categoria", productoData.id_categoria);
  formData.append("imagen", productoData.imagen);

  const auth = getAuthHeaders();

  const res = await axios.post(`${API_URL}productos`, formData, {

    headers: {
      ...auth.headers,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateProducto = async (id, productoData) => {
  const formData = new FormData();
  formData.append("nombre", productoData.nombre);
  formData.append("descripcion", productoData.descripcion);
  formData.append("precio_base", productoData.precio_base);
  formData.append("id_usuario", productoData.id_usuario);

  if (productoData.imagen instanceof File) {
    formData.append("imagen", productoData.imagen);
  }

  const auth = getAuthHeaders();


  const res = await axios.put(`${API_URL}productos/${id}`, formData, {
    headers: {
        ...auth.headers,
        "Content-Type": "multipart/form-data"
    },
  });
  return res.data;
};

export const deleteProducto = async (id) => {
  const res = await axios.delete(`${API_URL}productos/${id}`, getAuthHeaders());
  return res.data;
};
