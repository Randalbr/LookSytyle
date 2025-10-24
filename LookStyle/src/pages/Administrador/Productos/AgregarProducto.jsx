import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductoById,
  createProducto,
  updateProducto,
} from "../../../service/productoService.js";
import { getCategorias } from "../../../service/categoriaService.js";
import "../../../styles/FormPage.css";

export default function FormProducto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [imagen, setImagen] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [preview, setPreview] = useState(null);


  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    loadCategorias();
  }, []);

  useEffect(() => {
    const loadProducto = async () => {
      if (id) {
        try {
          const data = await getProductoById(id);
          setNombre(data.nombre);
          setDescripcion(data.descripcion);
          setPrecio(data.precio_base);
          setIdCategoria(data.id_categoria);
          setImagen(data.imagen);
        } catch (error) {
          console.error("Error al cargar producto:", error);
        }
      }
    };
    loadProducto();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !descripcion.trim() || !precio || !idCategoria) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    try {
      const productoData = {
        nombre,
        descripcion,
        precio_base: precio,
        id_categoria: idCategoria,
        imagen,
      };

      console.log(productoData)

      if (id) {
        await updateProducto(id, productoData);
        alert("Producto actualizado correctamente ✅");
      } else {
        await createProducto(productoData);
        alert("Producto agregado correctamente ✅");
      }

      navigate("/admin/productos");
    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert("Error al guardar el producto ❌");
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Editar Producto" : "Agregar Producto"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Ej: Camiseta Nike"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            placeholder="Ej: Camiseta deportiva de alta calidad"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Precio base:</label>
          <input
            type="number"
            min="0"
            placeholder="Ej: 50000"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Categoría:</label>
          <select
            value={idCategoria}
            onChange={(e) => setIdCategoria(e.target.value)}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

          <div className="form-group">
          <label>Imagen:</label>
          <input
            type="file"
            accept="image/*"
            name="imagen"
            onChange={handleImageChange}
          />
          {preview && (
            <div style={{ marginTop: 10 }}>
              <img
                src={preview}
                alt="Vista previa"
                style={{
                  width: 150,
                  height: 150,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </div>
          )}
        </div>

        <div className="form-buttons">
          
          <button type="submit" className="btn-save">
            {id ? "Actualizar" : "Guardar"}
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
