import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getCategorias,
  deleteCategoria,
} from "../../../service/categoriaService.js";
import AdminTable from "../../../components/AdminTable.jsx";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  const loadCategorias = async () => {
    try {
      const data = await getCategorias();
      const formatted = data.map((c) => ({
        id: c.id_categoria,
        nombre: c.nombre,
        descripcion: c.descripcion,
        imagen: c.imagen,
      }));
      setCategorias(formatted);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  useEffect(() => {
    loadCategorias();
  }, []);

  const handleAdd = () => {
    navigate("/admin/categorias/agregar");
  };

  const handleEdit = (categoria) => {
    navigate(`/admin/categorias/editar/${categoria.id}`);
  };

  const handleDeleteCategoria = async (id) => {
      await deleteCategoria(id);
      await loadCategorias();
    };
  

  return (
    <>
      <AdminTable
        title="Gestión de Categorías"
        data={categorias}
        columns={["id", "nombre", "descripcion", "imagen"]}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDeleteCategoria}
      />
    </>
  );
}
