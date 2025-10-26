import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getVariantes, deleteVariante } from "../../../service/varianteService.js";
import AdminTable from "../../../components/AdminTable.jsx";

export default function VarianteProducto() {
  const [varianteProducto, setVarianteProducto] = useState([]);
  const navigate = useNavigate();

  // 🔹 Cargar variantes desde el backend
  const loadVarianteProducto = async () => {
    try {
      const data = await getVariantes();
      const formatted = data.map((v) => ({
        id: v.id_variante,
        producto: v.producto,
        color: v.color,
        precio: `$${v.precio.toLocaleString()}`,
        estado: v.estado === "activo" ? "activo" : "inactivo",
        tallas: v.tallas,
        imagenes: v.imagenes
          ? v.imagenes.split(", ").map((url) => (
              <img
                key={url}
                src={url}
                alt="Variante"
                style={{ width: "40px", height: "40px", borderRadius: "6px" }}
              />
            ))
          : "Sin imágenes",
      }));
      console.log(data)
      setVarianteProducto(formatted);
    } catch (error) {
      console.error("Error al cargar Variante Producto:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar las variantes de producto.",
      });
    }
  };

  useEffect(() => {
    loadVarianteProducto();
  }, []);

  // 🔹 Ir a agregar variante
  const handleAdd = () => navigate("/admin/varianteProductos/agregar");

  // 🔹 Ir a editar variante
  const handleEdit = (variante) =>{
    navigate(`/admin/varianteProductos/editar/${variante.id}`);
  }

  // 🔹 Eliminar variante
  const handleDeleteVarianteProducto = async (id) => {
    const result = await Swal.fire({
      title: "¿Está seguro?",
      text: "Esta acción eliminará la variante permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteVariante(id);
        await loadVarianteProducto();
        Swal.fire("Eliminado", "La variante ha sido eliminada.", "success");
      } catch (error) {
        console.error("Error al eliminar variante:", error);
        Swal.fire("Error", "No se pudo eliminar la variante.", "error");
      }
    }
  };

  return (
    <AdminTable
      title="Gestión de Variantes de Producto"
      data={varianteProducto}
      columns={[
        "id",
        "producto",
        "color",
        "precio",
        "estado",
        "tallas",
        "imagenes",
      ]}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDeleteVarianteProducto}
    />
  );
}
