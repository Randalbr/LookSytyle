import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
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
      try {
        if (id) {
          const data = await getColorById(id);
          setNombre(data.nombre);
          setCodigo(data.codigo);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al cargar el color",
          text: error.message || "No se pudo obtener la información del color.",
        });
      }
    };
    loadColor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campo obligatorio",
        text: "El nombre no puede estar vacío.",
      });
      return;
    }

    if (!codigo) {
      Swal.fire({
        icon: "warning",
        title: "Selecciona un color",
        text: "Debes elegir un color antes de guardar.",
      });
      return;
    }

    try {
      const colorData = { nombre, codigo };

      if (id) {
        await updateColor(id, colorData);
        Swal.fire({
          icon: "success",
          title: "Color actualizado",
          text: "El color se actualizó correctamente ✅",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await createColor(colorData);
        Swal.fire({
          icon: "success",
          title: "Color agregado",
          text: "El color se agregó correctamente ✅",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      navigate("/admin/colores");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: error.message || "No se pudo guardar el color ❌",
      });
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
