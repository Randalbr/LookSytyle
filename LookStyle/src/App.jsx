import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './styles/Index.css'

// Páginas
import Home from "./pages/Home";
// import Productos from "./pages/Productos";
// import Nosotros from "./pages/Nosotros";
// import Contacto from "./pages/Contacto";

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/productos" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} /> */}
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
