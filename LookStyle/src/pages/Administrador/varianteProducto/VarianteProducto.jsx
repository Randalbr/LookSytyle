import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getVariantes, deleteVariante } from "../../../service/varianteService.js";
import AdminTable from "../../../components/AdminTable.jsx";
import DetalleProductoModal from "../../../components/DetalleProducto.jsx";


export default function VarianteProducto() {
  const [varianteProducto, setVarianteProducto] = useState([]);
  const navigate = useNavigate();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const loadVarianteProducto = async () => {
    try {
      const data = await getVariantes();
      console.log("data",data)
      const formatted = data.map((v) => ({
        id: v.id_variante,
        id_producto: v.id_producto,
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

  const handleAdd = () => navigate("/admin/varianteProductos/agregar");

  const handleEdit = (variante) =>{
    navigate(`/admin/varianteProductos/editar/${variante.id}`);
  }

  const handleDeleteVarianteProducto = async (id) => {
        await deleteVariante(id);
        await loadVarianteProducto();
  };

  const handleView = (producto) => {
    const productoConId = {
      ...producto,
      id_producto: producto.id_producto || producto.id, 
    };
    setProductoSeleccionado(productoConId);
  };

  return (
    <>
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
      onView={handleView} // 👈 Nuevo
    />
    {productoSeleccionado && (
        <DetalleProductoModal
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}
    </>
  );
}
