import { useState } from "react";
import Sidebar from "../../components/SidebarAdmin";
import "../../styles/Admin.css";
import { GiHamburgerMenu } from "react-icons/gi";

export default function AdminHome() {
  return (
    <div className="admin-page">
      <div className="admin-content">
        <h1>Bienvenido al Panel de Administración</h1>
        <p>Selecciona una opción del menú para empezar.</p>
      </div>
    </div>
  );
}
