import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTallaById,
  createTalla,
  updateTalla,
} from "../../../service/tallasService.js";
import "../../../styles/FormPage.css";

export default function FormTalla() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const loadTalla = async () => {
      if (id) {
        const data = await getTallaById(id);
        setNombre(data.nombre);
      }
    };
    loadTalla();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert("El nombre no puede estar vacío");
      return;
    }

    try {
      if (id) {
        await updateTalla(id, { nombre });
        alert("Talla actualizada correctamente ✅");
      } else {
        await createTalla({ nombre });
        alert("Talla agregada correctamente ✅");
      }
      navigate("/admin/tallas");
    } catch (error) {
      console.error(error);
      alert("Error al guardar ❌");
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Editar Talla" : "Agregar Talla"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Ej: M, L, XL"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="form-buttons">
         
          <button type="submit" className="btn-save">
            {id ? "Actualizar" : "Guardar"}
          </button>
           <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
