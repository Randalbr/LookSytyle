import { useEffect, useState } from "react";
import { getVariantesByProductoId } from "../service/varianteService";
import { getColorById } from "../service/coloresService";
import "../styles/DetalleProducto.css";
import { IoMdClose } from "react-icons/io";


export default function DetalleProductoModal({ producto, onClose }) {
  const [variantes, setVariantes] = useState([]);
  const [imagenIndex, setImagenIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const variantesResponse = await getVariantesByProductoId(
          producto.id_producto
        );
        let variantesData = variantesResponse.data || variantesResponse;

        const variantesConColor = await Promise.all(
          variantesData.map(async (v) => {
            try {
              const colorData = await getColorById(v.id_color);
              return { ...v, color: colorData.nombre, codigo: colorData.codigo };
            } catch {
              return { ...v, color: "Sin color", codigo: "#ccc" };
            }
          })
        );

        setVariantes(variantesConColor);
      } catch (error) {
        console.error("Error al obtener variantes:", error);
      }
    };

    fetchData();
  }, [producto.id_producto]);

  if (!variantes.length) return null;

  const imagenes = variantes.flatMap(v => v.imagenes || []);

  console.log(imagenes)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="cerrar-modal" onClick={onClose}>
         <IoMdClose />
        </button>

        <div className="detalle-card">
          <div className="detalle-carousel">
            {imagenes.length > 0 && (
              <>
                <img
                  className="detalle-img"
                  src={imagenes[imagenIndex].url}
                  alt={producto.nombre}
                />
                {imagenes.length > 1 && (
                  <>
                    <button
                      className="carousel-btn prev"
                      onClick={() =>
                        setImagenIndex(
                          (prev) =>
                            (prev - 1 + imagenes.length) % imagenes.length
                        )
                      }
                    >
                      ‹
                    </button>
                    <button
                      className="carousel-btn next"
                      onClick={() =>
                        setImagenIndex((prev) => (prev + 1) % imagenes.length)
                      }
                    >
                      ›
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          <div className="detalle-info">
            <h2 className="detalle-titulo">{producto.nombre}</h2>
            <p>{producto.descripcion}</p>

            {variantes.map((v) => {
              const precioTotal =
                parseFloat(producto.precio_base || 0) +
                parseFloat(v.precio || 0);

              return (
                <div key={v.id_variante} className="variante-info">
                  <div className="color-info">
                    <span
                      className="color-circulo"
                      style={{ backgroundColor: v.codigo }}
                    ></span>
                    <span>{v.color}</span>
                  </div>

                  <p className="precio">
                    Precio total:{" "}
                    <strong>
                      $
                      {precioTotal.toLocaleString("es-CO", {
                        minimumFractionDigits: 0,
                      })}
                    </strong>
                  </p>

                  <h4>Tallas disponibles:</h4>
                  <ul>
                    {v.tallas.map((t) => (
                      <li key={t.id_talla}>Talla: {t.nombre}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
