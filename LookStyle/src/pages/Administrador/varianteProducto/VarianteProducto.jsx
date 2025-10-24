import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getVariantes,
  deleteVariante,
} from "../../../service/varianteService.js";
import AdminTable from "../../../components/AdminTable.jsx";

export default function VarianteProducto() {
  const [varianteProducto, setVarianteProducto] = useState([]);
  const navigate = useNavigate();

  const loadVarianteProducto = async () => {
    try {
      const data = await getVariantes();
      const formatted = data.map((v) => ({
        id: v.id_variante,
        producto : v.producto,
        color : v.color,
        talla : v.talla,
        cantidad : v.cantidad,
        precio : v.precio,
        imagen : v.imagen,
      }));
      setVarianteProducto(formatted);
    } catch (error) {
      console.error("Error al cargar Variante Producto:", error);
    }
  };

  useEffect(() => {
    loadVarianteProducto();
  }, []);

  const handleAdd = () => {
    navigate("/admin/varianteProductos/agregar");
  };

  const handleEdit = (VarianteProducto) => {
    navigate(`/admin/varianteProductos/editar/${VarianteProducto.id}`);
  };

  const handleDeleteVarianteProducto = async (id) => {
    await deleteVariante(id);
    await loadVarianteProducto();
  };

  return (
    <>
      <AdminTable
        title="Gestión de Variante Producto"
        data={varianteProducto}
        columns={["id", "producto", "color", "talla", "cantidad","precio","imagen"]}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDeleteVarianteProducto}
      />
    </>
  );
}
