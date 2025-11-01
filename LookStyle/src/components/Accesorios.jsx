import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Camisas.css";
import { getProductos } from "../service/productoService.js"; 

export default function ProductosAccesorios() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await getProductos();
        const data = response.data || response;

        const accesorios = data.filter(
          (prod) =>
            prod.categoria &&
            prod.categoria.toLowerCase() === "accesorios"
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
            <Link
              key={prod.id_producto}
              className="producto-card"
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
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
