import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getColores,
  deleteColor,
} from "../../../service/coloresService.js";
import AdminTable from "../../../components/AdminTable.jsx";

export default function Colores() {
  const [colores, setColores] = useState([]);
  const navigate = useNavigate();

  const loadColores = async () => {
    try {
      const data = await getColores();
      const formatted = data.map((c) => ({
        id: c.id_color,
        nombre: c.nombre,
        codigo: c.codigo,
      }));
      setColores(formatted);
    } catch (error) {
      console.error("Error al cargar colores:", error);
    }
  };

  useEffect(() => {
    loadColores();
  }, []);

  const handleAdd = () => {
    navigate("/admin/colores/agregar");
  };

  const handleEdit = (color) => {
    navigate(`/admin/colores/editar/${color.id}`);
  };

 const handleDeleteColor = async (id) => {
    await deleteColor(id);
    await loadColores();
  };

  return (
    <>
     <AdminTable
        title="Gestión de Colores 🎨"
        data={colores}
        columns={["id", "nombre", "codigo"]} 
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDeleteColor}
      />
    </>
  );
}
