import { useState } from "react";
import '../styles/Home.css'
import Categorias from '../components/Categorias'
import AllProducts from '../components/AllProducts'
import Inicio from "../assets/Inicio.jpg";
import Pantalones from "../assets/Pantalones.jpg";
import Camisas from "../assets/Camisas.jpg";
import Zapatos from "../assets/Zapatos.jpg";
import Accesorios from "../assets/Accesorios.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const slides = [
    {
      image: Inicio,
      title: "Bienvenido a LookStyle",
      text: "Explora lo último en moda urbana."
    },
    {
      image: Camisas,
      title: "Camisas",
      text: "Completa tu outfit con estilo."
    },
    {
      image: Pantalones,
      title: "Pantalones",
      text: "Hasta 50% en prendas seleccionadas."
    },
    {
      image: Zapatos,
      title: "Zapatos",
      text: "Hasta 50% en prendas seleccionadas."
    },
    {
      image: Accesorios,
      title: "Accesorios",
      text: "Hasta 50% en prendas seleccionadas."
    }
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
   <>
   <Navbar/>
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
    <Footer/>
    </>
  );
}
