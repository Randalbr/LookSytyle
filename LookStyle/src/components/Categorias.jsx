import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Categorias.css";
import { getCategorias } from "../service/categoriaService";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await getCategorias();
        setCategorias(response.data || response);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategorias();
  }, []);

  return (
    <div className="categorias-container">
      <h2 className="categorias-title">Categorías</h2>

      <div className="categorias-grid">
        {categorias.length === 0 ? (
          <p>No hay categorías disponibles.</p>
        ) : (
          categorias.map((cat) => (
            <Link
              key={cat.id_categoria}
              to={`/${cat.nombre}`}
              className="categoria-card"
            >
              <div className="categoria-img-container">
                <img
                  src={cat.imagen || "/placeholder.jpg"}
                  alt={cat.nombre}
                />
              </div>

              <div className="categoria-info">
                <h3>{cat.nombre}</h3>
                <p>{cat.descripcion}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
