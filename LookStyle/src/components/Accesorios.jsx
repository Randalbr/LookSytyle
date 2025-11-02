import { useEffect, useState } from "react";
import "../styles/Camisas.css";
import { getProductos } from "../service/productoService.js"; 
import DetalleProductoModal from "./DetalleProducto.jsx";

export default function ProductosAccesorios() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await getProductos();
        const data = response.data || response;

        const accesorios = data.filter(
          (prod) => prod.categoria.toLowerCase() === "accesorios"
        );
        setProductos(accesorios);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="productos-container">
      <h2 className="productos-title">Accesorios</h2>

      <div className="productos-grid">
        {productos.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          productos.map((prod) => (
            <div
              key={prod.id_producto}
              className="producto-card"
              onClick={() => setProductoSeleccionado(prod)}
            >
              <div className="producto-img-container">
                <img
                  src={prod.imagen || "/placeholder.jpg"}
                  alt={prod.nombre}
                />
              </div>

              <div className="producto-info">
                <h3>{prod.nombre}</h3>
                <p className="descripcion">{prod.descripcion}</p>
                <p className="precio">
                  ${parseFloat(prod.precio_base).toLocaleString("es-CO")}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
       {productoSeleccionado && (
              <DetalleProductoModal
                producto={productoSeleccionado}
                onClose={() => setProductoSeleccionado(null)}
              />
            )}
    </div>
  );
}
