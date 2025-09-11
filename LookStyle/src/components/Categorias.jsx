import { Link } from "react-router-dom";
import camisaImg from "../assets/Camisas.jpg";
import pantalonImg from "../assets/Pantalones.jpg";
import zapatosImg from "../assets/Zapatos.jpg";
import accesorioImg from "../assets/Accesorios.jpg";
import '../styles/Categorias.css'

export default function Categorias() {
  const categorias = [
    { nombre: "Camisas", img: camisaImg, ruta: "/camisas" },
    { nombre: "Pantalones", img: pantalonImg, ruta: "/pantalones" },
    { nombre: "Zapatos", img: zapatosImg, ruta: "/zapatos" },
    { nombre: "Accesorios", img: accesorioImg, ruta: "/accesorios" },
  ];

  return (
    <div className="categorias-container">
      <h2 className="categorias-title">Categorías</h2>
      <div className="categorias-grid">
        {categorias.map((cat, i) => (
          <Link to={cat.ruta} key={i} className="categoria-card">
            <img src={cat.img} alt={cat.nombre} />
            <div className="categoria-info">
              <h3>{cat.nombre}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
