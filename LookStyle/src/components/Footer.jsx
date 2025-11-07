import '../styles/Footer.css'
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp  } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footerGeneral">
   
      <div className="footerContenido">
        <nav>
          <ul>
            {/* <li><a href="#">Sobre Nosotros</a></li>
            <li><a href="#">Contacto</a></li>
            <li><a href="#">Políticas</a></li> */}
          </ul>
        </nav>
          <p>© {new Date().getFullYear()} Look Style. Todos los derechos reservados.</p>

        <div className="footerRedes">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/looks.tylee" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaWhatsapp />
          </a>
        </div>

      </div>

      
      <div className="footerUbicacion">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7845733070185!2d-75.54745162536341!3d6.292019525810811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e442f4c794b24c5%3A0x75105d54c39edf71!2sCra.%2036b%20%23%20102C-11%2C%20Granizal%2C%20Medell%C3%ADn%2C%20Popular%2C%20Medell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses-419!2sco!4v1756567095600!5m2!1ses-419!2sco"
          width="400"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </footer>
  );
}
