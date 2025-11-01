import { useState } from "react";
import '../styles/Navbar.css'
import logito from '../assets/icono5.jpg'

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="navbar">
      
        <div className="cabezeraPrincipal">
          <img src={logito} alt="Logito" />
            <h1>LOOKSTYLE</h1>

         
          <button className="menu-toggle" onClick={() => setOpen(!open)}>
            ☰
          </button>
        </div>

    
        <nav className={`cabezeraNormal ${open ? "open" : ""}`}>
          <ul>
            <a href="/"><li>Inicio</li></a>
            <a href="/camisas"><li>Camisas</li></a>
            <a href="/pantalones"><li>Pantalones</li></a>
            <a href="/zapatos"><li>Zapatos</li></a>
            <a href="/accesorios"><li>Accesorios</li></a>
          </ul>
        </nav>
      </header>
    </>
  );
}
