import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getProductos,
  deleteProducto,
} from "../../../service/productoService.js";
import AdminTable from "../../../components/AdminTable.jsx";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  const loadProductos = async () => {
    try {
      const data = await getProductos();
      const formatted = data.map((p) => ({
        id: p.id_producto,
        nombre: p.nombre,
        descripcion: p.descripcion,
        precio: `$${Number(p.precio_base).toLocaleString()}`,
        categoria: p.categoria,
        imagen: p.imagen,
      }));
      console.log(formatted)
      setProductos(formatted);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    loadProductos();
  }, []);

  const handleAdd = () => {
    navigate("/admin/productos/agregar");
  };

  const handleEdit = (producto) => {
    navigate(`/admin/productos/editar/${producto.id}`);
  };

 const handleDeleteProducto = async (id) => {
    await deleteProducto(id);
    await loadProductos();
  };


  return (
    <>
      <AdminTable
        title="Gestión de Productos"
        data={productos}
        columns={["id", "nombre", "descripcion", "precio", "categoria", "imagen"]}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDeleteProducto}
      />
    </>
  );
}
