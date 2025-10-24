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
      console.error("Error al cargar Tallas:", error);
    }
  };

  useEffect(() => {
    loadTallas();
  }, []);

  const handleAdd = () => {
   navigate("/admin/tallas/agregar")
  };

  const handleEdit = (talla) => {
  navigate(`/admin/tallas/editar/${talla.id}`)
  };

 const handleDeleteTalla = async (id) => {
    await deleteTalla(id);
    await loadTallas();
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
