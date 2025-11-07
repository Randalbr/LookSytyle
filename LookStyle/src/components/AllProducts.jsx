import { useEffect, useState } from "react";
import "../styles/Camisas.css";
import { getProductos } from "../service/productoService.js";
import DetalleProductoModal from "./DetalleProducto.jsx";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

export default function ProductosAllProducts() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [rangoPrecio, setRangoPrecio] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12; 

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await getProductos();
        const data = response.data || response;
        setProductos(data);
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

  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const productosPagina = productosFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="productos-container">
      <h2 className="productos-title">Productos Look Style</h2>

      <div className="buscador-container">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
            setCurrentPage(1); 
          }}
          className="input-busqueda"
        />

        <div className="filtro-precio">
          <select
            value={rangoPrecio}
            onChange={(e) => {
              setRangoPrecio(e.target.value);
              setCurrentPage(1);
            }}
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
        {productosPagina.length === 0 ? (
          <p>No hay productos.</p>
        ) : (
          productosPagina.map((prod) => (
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

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <MdNavigateBefore /> Anterior
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente <MdNavigateNext />
          </button>
        </div>
      )}

      {productoSeleccionado && (
        <DetalleProductoModal
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}
    </div>
  );
}
