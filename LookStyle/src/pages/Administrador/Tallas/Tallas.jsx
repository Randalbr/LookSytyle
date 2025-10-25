import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getTallas,
  deleteTalla,
} from "../../../service/tallasService.js";
import AdminTable from "../../../components/AdminTable.jsx";

export default function Tallas() {
  const [tallas, setTallas] = useState([]);
  const navigate = useNavigate();

  const loadTallas = async () => {
    try {
      const data = await getTallas();
      const formatted = data.map((t) => ({
        id: t.id_talla,
        nombre: t.nombre,
      }));
      setTallas(formatted);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar tallas",
        text: error.message || "No se pudieron obtener las tallas.",
      });
    }
  };

  useEffect(() => {
    loadTallas();
  }, []);

  const handleAdd = () => {
    navigate("/admin/tallas/agregar");
  };

  const handleEdit = (talla) => {
    navigate(`/admin/tallas/editar/${talla.id}`);
  };

  const handleDeleteTalla = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "¿Eliminar talla?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (confirm.isConfirmed) {
        await deleteTalla(id);
        await loadTallas();

        Swal.fire({
          icon: "success",
          title: "Talla eliminada",
          text: "La talla se ha eliminado correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al eliminar talla",
        text: error.message || "No se pudo eliminar la talla.",
      });
    }
  };

  return (
    <>
      <AdminTable
        title="Gestión de Tallas"
        data={tallas}
        columns={["id", "nombre"]}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDeleteTalla}
      />
    </>
  );
}
