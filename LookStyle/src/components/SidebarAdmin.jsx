import { Link,useNavigate  } from "react-router-dom";
import "../styles/Admin.css";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoMdColorPalette } from "react-icons/io";
import { IoCashOutline } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaHome } from "react-icons/fa";


export default function Sidebar({ isOpen, onToggle }) {

    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onToggle}>
        <IoClose />
      </button>

      <h2>LookStyle</h2>
      <nav>
        <ul>
          <li><Link to="/admin/"><FaHome /> <b>Inicio</b></Link></li>
          <li><Link to="/admin/categorias"><BiCategoryAlt /> <b>Categorías</b></Link></li>
          <li><Link to="/admin/productos"><MdOutlineProductionQuantityLimits /> <b>Productos</b></Link></li>
          <li><Link to="/admin/varianteProductos"><MdOutlineProductionQuantityLimits /> <b>Variantes Productos</b></Link></li>
          <li><Link to="/admin/colores"><IoMdColorPalette /> <b>Colores</b></Link></li>
          <li><Link to="/admin/tallas"><GiClothes /> <b>Tallas</b></Link></li>
          <li><Link to="/admin/ventas"><IoCashOutline /> <b>Ventas</b></Link></li>
        </ul>
      </nav>

      <button className="Logut" type="button" onClick={handleLogout}>
        <b>Cerrar Sesión</b>
      </button>
    </div>
  );
}
