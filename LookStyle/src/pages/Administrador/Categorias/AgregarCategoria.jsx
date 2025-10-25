import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getCategoriaById,
  createCategoria,
  updateCategoria,
} from "../../../service/categoriaService.js";
import "../../../styles/FormPage.css";

export default function FormCategoria() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategoria = async () => {
      if (id) {
        try {
          const data = await getCategoriaById(id);
          setNombre(data.nombre);
          setDescripcion(data.descripcion);
          if (data.imagen) setPreview(data.imagen);
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al cargar la categoría",
            text: error.message || "No se pudo cargar la información.",
          });
        }
      }
    };
    loadCategoria();
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

    if (!nombre.trim() || !descripcion.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campos obligatorios",
        text: "El nombre y la descripción no pueden estar vacíos.",
      });
      return;
    }

    setLoading(true);

    try {
      const categoriaData = { nombre, descripcion, imagen };

      if (id) {
        await updateCategoria(id, categoriaData);
        Swal.fire({
          icon: "success",
          title: "Categoría actualizada",
          text: "La categoría se actualizó correctamente ✅",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await createCategoria(categoriaData);
        Swal.fire({
          icon: "success",
          title: "Categoría creada",
          text: "La categoría se agregó correctamente ✅",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      navigate("/admin/categorias");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: error.message || "Ocurrió un error al guardar la categoría ❌",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Editar Categoría" : "Agregar Categoría"}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Pijamas, Accesorios..."
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            rows="4"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Breve descripción de la categoría..."
          />
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
          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? "Guardando..." : id ? "Actualizar" : "Guardar"}
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
