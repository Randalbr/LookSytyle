import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getColorById,
  createColor,
  updateColor,
} from "../../../service/coloresService.js";
import "../../../styles/FormPage.css";

export default function FormColor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("#000000");

  useEffect(() => {
    const loadColor = async () => {
      if (id) {
        const data = await getColorById(id);
        setNombre(data.nombre);
        setCodigo(data.codigo);
      }
    };
    loadColor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert("El nombre no puede estar vacío");
      return;
    }

     if (!codigo) {
    alert("Selecciona un color antes de guardar");
    return;
  }

   try {
      const colorData = { nombre, codigo };

      if (id) {
        await updateColor(id, colorData);
        alert("Color actualizado correctamente ✅");
      } else {
        await createColor(colorData);
        alert("Color agregado correctamente ✅");
      }

      navigate("/admin/colores");
    } catch (error) {
      console.error("Error al guardar color:", error);
      alert("Error al guardar ❌");
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Editar Color" : "Agregar Color"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Ej: Azul, Verde..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Código de color:</label>
          <input
            type="color"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
        </div>

        <div className="form-buttons">
         
          <button type="submit" className="btn-save">
            {id ? "Actualizar" : "Guardar"}
            
          </button> <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}