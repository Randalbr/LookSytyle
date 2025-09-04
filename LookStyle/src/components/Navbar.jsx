import { useState } from "react";
import '../styles/Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="navbar">
      
        <div className="cabezeraPrincipal">
          <img src="https://images.pexels.com/photos/162140/duckling-birds-yellow-fluffy-162140.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Logito" />
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
            <a href="/pantalones"><li>Zapatos</li></a>
            <a href="/accesorios"><li>Accesorios</li></a>
          </ul>
        </nav>
      </header>
    </>
  );
}
