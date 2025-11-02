import { useEffect, useState } from "react";
import "../styles/Camisas.css";
import { getProductos } from "../service/productoService.js"; 
import DetalleProductoModal from "./DetalleProducto.jsx";

export default function ProductosZapatos() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [rangoPrecio, setRangoPrecio] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await getProductos();
        const data = response.data || response;

        const zapatos = data.filter(
          (prod) => prod.categoria?.toLowerCase() ===  "zapatos"
        );
        setProductos(zapatos);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

   const productosFiltrados = productos.filter((prod) => {
    const nombreCoincide = prod.nombre
      .toLowerCase()
      .includes(filtro.toLowerCase());

    const precio = parseFloat(prod.precio_base) || 0;

    let cumpleRango = true;
    if (rangoPrecio === "bajo") cumpleRango = precio < 50000;
    else if (rangoPrecio === "medio") cumpleRango = precio >= 50000 && precio <= 100000;
    else if (rangoPrecio === "alto") cumpleRango = precio > 100000;

    return nombreCoincide && cumpleRango;
  });


  return (
    <div className="productos-container">
      <h2 className="productos-title">Zapatos</h2> 
         <div className="buscador-container">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="input-busqueda"
          />

          <div className="filtro-precio">
            <select
              value={rangoPrecio}
              onChange={(e) => setRangoPrecio(e.target.value)}
              className="select-precio"
            >
              <option value="">Todos los precios</option>
              <option value="bajo">Menos de $50.000</option>
              <option value="medio">Entre $50.000 y $100.000</option>
              <option value="alto">Más de $100.000</option>
            </select>
          </div>
        </div>

      <div className="productos-grid">
        {productosFiltrados.length === 0 ? (
          <p>No hay productos que coincidan con la búsqueda.</p>
        ) : (
          productosFiltrados.map((prod) => (
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
