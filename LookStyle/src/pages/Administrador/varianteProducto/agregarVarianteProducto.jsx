import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductos } from "../../../service/productoService.js";
import { getColores } from "../../../service/coloresService.js";
import { getTallas } from "../../../service/tallasService.js";
import { createVariante } from "../../../service/varianteService.js";
import "../../../styles/FormPage.css";

export default function FormVariante() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [colores, setColores] = useState([]);
  const [tallas, setTallas] = useState([]);
  const [formData, setFormData] = useState({
    id_producto: "",
    color: [],
    talla: [],
    cantidad: "",
    precio: "",
    imagenes: [],
  });

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        setProductos(await getProductos());
        setColores(await getColores());
        setTallas(await getTallas());
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  // Manejar campos de texto y archivos
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, imagenes: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Manejar checkboxes de color o talla
  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
    }));
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("id_producto", formData.id_producto);
      form.append("cantidad", formData.cantidad);
      form.append("precio", formData.precio);

      // Enviar arrays con nombres exactos
      formData.color.forEach((id) => form.append("color", id));
      formData.talla.forEach((id) => form.append("talla", id));

      // Enviar imágenes
      formData.imagenes.forEach((img) => form.append("imagenes", img));

      console.log("FormData enviado:");
      for (const pair of form.entries()) {
        console.log(pair[0], pair[1]);
      }

      await createVariante(form);
      navigate("/admin/varianteProductos");
    } catch (error) {
      console.error("Error al crear variante:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Agregar Variante de Producto</h2>
      <form onSubmit={handleSubmit} className="form-content">
        {/* Producto */}
        <div className="form-group">
          <label>Producto:</label>
          <select
            name="id_producto"
            value={formData.id_producto}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un producto</option>
            {productos.map((p) => (
              <option key={p.id_producto} value={p.id_producto}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Colores */}
        <div className="form-group">
          <label>Colores:</label>
          <div className="checkbox-group">
            {colores.map((color) => (
              <label key={color.id_color} className="checkbox-item">
                <input
                  type="checkbox"
                  value={color.id_color}
                  checked={formData.color.includes(String(color.id_color))}
                  onChange={(e) => handleCheckboxChange(e, "color")}
                />
                <span>{color.nombre}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tallas */}
        <div className="form-group">
          <label>Tallas:</label>
          <div className="checkbox-group">
            {tallas.map((talla) => (
              <label key={talla.id_talla} className="checkbox-item">
                <input
                  type="checkbox"
                  value={talla.id_talla}
                  checked={formData.talla.includes(String(talla.id_talla))}
                  onChange={(e) => handleCheckboxChange(e, "talla")}
                />
                <span>{talla.nombre}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cantidad */}
        <div className="form-group">
          <label>Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            required
          />
        </div>

        {/* Precio */}
        <div className="form-group">
          <label>Precio adicional:</label>
          <input
            required
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            step="0.01"
          />
        </div>

        {/* Imágenes */}
        <div className="form-group">
          <label>Imágenes:</label>
          <input
          required
            type="file"
            name="imagenes"
            multiple
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        
        
        <button type="submit" className="btn-save">
          Guardar Variante
        </button>

         <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
      </form>
    </div>
  );
}
