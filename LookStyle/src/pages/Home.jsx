import { useState, useEffect } from "react";
import "../styles/Home.css";
import AllProducts from "../components/AllProducts";
import Categorias from "../components/Categorias";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Inicio from "../assets/Inicio.jpg";
import { getCategorias } from "../service/categoriaService";

export default function Home() {
  const [slides, setSlides] = useState([
    {
      image: Inicio,
      title: "Bienvenido a LookStyle",
      text: "Explora lo último en moda urbana."
    }
  ]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await getCategorias();
        const categorias = response.data || response;
        console.log(categorias)
        const categoriaSlides = categorias.map((cat) => ({
          image: cat.imagen || "/placeholder.jpg",
          title: cat.nombre,
          text: cat.descripcion || "Descubre lo mejor de nuestra colección."
        }));

       setSlides([
          {
            image: Inicio,
            title: "Bienvenido a LookStyle",
            text: "Explora lo último en moda urbana."
          },
          ...categoriaSlides
        ]);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <>
      <Navbar />
      <div className="carousel">
        <button className="arrow left" onClick={prevSlide}>❮</button>

        <div className="carousel-slide">
          <img src={slides[current].image} alt={`Slide ${current}`} />
          <div className="overlay"></div>

          <div className="caption">
            <h2>{slides[current].title}</h2>
            <p>{slides[current].text}</p>
          </div>
        </div>

        <button className="arrow right" onClick={nextSlide}>❯</button>

        <div className="dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={i === current ? "dot active" : "dot"}
              onClick={() => setCurrent(i)}
            ></span>
          ))}
        </div>
      </div>

      <Categorias />
      <AllProducts />
      <Footer />
    </>
  );
}
