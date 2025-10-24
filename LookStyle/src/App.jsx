import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import './styles/Index.css'

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";


// Rutas Protegidas
import AdminHome from "./pages/Administrador/AdminHome";
//Colores
import AdminColores from "./pages/Administrador/Colores/Colores";
import AdminColoresAgregar from "./pages/Administrador/Colores/AgregarColores";
//Tallas
import AdminTallas from "./pages/Administrador/Tallas/Tallas";
import AdminTallasAgregar from "./pages/Administrador/Tallas/AgregarTallas";
//Categoria
import AdminCategoria from "./pages/Administrador/Categorias/Categorias";
import AdminCategoriaAgregar from "./pages/Administrador/Categorias/AgregarCategoria";
//Producto
import AdminProducto from "./pages/Administrador/Productos/Productos";
import AdminProductoAgregar from "./pages/Administrador/Productos/AgregarProducto";
//VarianteProducto
import AdminVarianteProducto from "./pages/Administrador/varianteProducto/VarianteProducto";
import AdminVarianteProductoAgregar from "./pages/Administrador/varianteProducto/agregarVarianteProducto";



// import Productos from "./pages/Productos";
// import Nosotros from "./pages/Nosotros";
// import Contacto from "./pages/Contacto";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/productos" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} /> */}


           {/* Rutas protegidas */}
          <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="colores" element={<AdminColores />} />
          <Route path="colores/agregar" element={<AdminColoresAgregar />} />
          <Route path="colores/editar/:id" element={<AdminColoresAgregar />} />
          <Route path="tallas" element={<AdminTallas />} />
          <Route path="tallas/agregar" element={<AdminTallasAgregar />} />
          <Route path="tallas/editar/:id" element={<AdminTallasAgregar />} />
          <Route path="colores/editar/:id" element={<AdminColoresAgregar />} />
          <Route path="categorias" element={<AdminCategoria />} />
          <Route path="categorias/agregar" element={<AdminCategoriaAgregar />} />
          <Route path="categorias/editar/:id" element={<AdminCategoriaAgregar />} />
          <Route path="colores/editar/:id" element={<AdminColoresAgregar />} />
          <Route path="productos" element={<AdminProducto />} />
          <Route path="productos/agregar" element={<AdminProductoAgregar />} />
          <Route path="productos/editar/:id" element={<AdminProductoAgregar />} />
          <Route path="varianteProductos" element={<AdminVarianteProducto />} />
          <Route path="varianteProductos/agregar" element={<AdminVarianteProductoAgregar />} />
          <Route path="varianteProductos/editar/:id" element={<AdminVarianteProductoAgregar />} />
        </Route>
        </Routes>
    </Router>
  );
}

export default App;
