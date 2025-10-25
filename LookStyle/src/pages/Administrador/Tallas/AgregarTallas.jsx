import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
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
      try {
        if (id) {
          const data = await getTallaById(id);
          setNombre(data.nombre);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al cargar la talla",
          text: error.message || "No se pudo obtener la información de la talla.",
        });
      }
    };
    loadTalla();
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

    try {
      if (id) {
        await updateTalla(id, { nombre });
        Swal.fire({
          icon: "success",
          title: "Talla actualizada",
          text: "La talla se actualizó correctamente ✅",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await createTalla({ nombre });
        Swal.fire({
          icon: "success",
          title: "Talla agregada",
          text: "La talla se agregó correctamente ✅",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      navigate("/admin/tallas");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: error.message || "No se pudo guardar la talla ❌",
      });
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
