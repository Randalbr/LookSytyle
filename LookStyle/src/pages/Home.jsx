import { useState } from "react";
import '../styles/Home.css'
import Inicio from "../assets/Inicio.jpg";
import banner1 from "../assets/1.jpg";
import banner2 from "../assets/2.jpg";
import banner3 from "../assets/1.jpg";

export default function Home() {
  const slides = [
    {
      image: Inicio,
      title: "Bienvenido a LookStyle",
      text: "Explora lo último en moda urbana."
    },
    {
      image: banner2,
      title: "Camisas",
      text: "Completa tu outfit con estilo."
    },
    {
      image: banner3,
      title: "Pantalones",
      text: "Hasta 50% en prendas seleccionadas."
    },
    {
      image: banner3,
      title: "Zapatos",
      text: "Hasta 50% en prendas seleccionadas."
    },
    {
      image: banner3,
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
    <div className="carousel">
      <button className="arrow left" onClick={prevSlide}>❮</button>

      <div className="carousel-slide">
        {/* Imagen con overlay oscuro */}
        <img src={slides[current].image} alt={`Slide ${current}`} />
        <div className="overlay"></div>

        {/* Texto dinámico */}
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
  );
}
