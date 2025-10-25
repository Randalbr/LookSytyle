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
      // Mostrar error si la carga falla
      Swal.fire({
        icon: "error",
        title: "Error al cargar colores",
        text: error.message || "No se pudieron obtener los colores.",
      });
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
    try {
      const confirm = await Swal.fire({
        title: "¿Eliminar color?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (confirm.isConfirmed) {
        await deleteColor(id);
        await loadColores();

        Swal.fire({
          icon: "success",
          title: "Color eliminado",
          text: "El color se ha eliminado correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al eliminar color",
        text: error.message || "No se pudo eliminar el color.",
      });
    }
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
