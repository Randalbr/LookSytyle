import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  createVariante,
  updateVariante,
  getVarianteById,
} from "../../../service/varianteService.js";
import { getProductos } from "../../../service/productoService.js";
import { getColores } from "../../../service/coloresService.js";
import { getTallas } from "../../../service/tallasService.js";
import Select from "react-select";
import "../../../styles/FormPage.css";

export default function FormVariante() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [idProducto, setIdProducto] = useState("");
  const [idColor, setIdColor] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState("activo");
  const [productos, setProductos] = useState([]);
  const [colores, setColores] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const [tallas, setTallas] = useState([]);
  const [tallaTemp, setTallaTemp] = useState({ id_talla: "", cantidad: "" });
  const [opcionesTalla, setOpcionesTalla] = useState([]);


  useEffect(() => {
    const loadData = async () => {
      try {
        const [prods, cols , tall] = await Promise.all([getProductos(), getColores(), getTallas()]);
        setProductos(prods);
        setColores(cols);
        setOpcionesTalla(tall);
      } catch (error) {
        console.error("Error cargando datos:", error);
        Swal.fire("Error", "No se pudieron cargar los datos ❌", "error");
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadVariante = async () => {
      if (!id) return;
      try {
        const data = await getVarianteById(id);
        setIdProducto(data.id_producto);
        setIdColor(data.id_color);
        setPrecio(data.precio);
        setEstado(data.estado);
        setImagenes(
          Array.isArray(data.imagenes)
            ? data.imagenes.map((img) => img.url)
            : []
        );
     if (data.tallas) {
        const tallasArray = Array.isArray(data.tallas)
          ? data.tallas 
          : typeof data.tallas === "string"
          ? data.tallas.split(",").map((t) => t.trim()) 
          : [];

        setTallas(
          tallasArray.map((t) => {
            const tallaObj = opcionesTalla.find(
              (opt) => opt.nombre === t.nombre || opt.id_talla == t.id_talla
            );
            return {
              id_talla: tallaObj?.id_talla || t.id_talla || "",
              nombre: tallaObj?.nombre || t.nombre || "",
              cantidad: t.cantidad ?? 1,
            };
          })
        );
      }
      } catch (error) {
        console.error("Error al cargar variante:", error);
        Swal.fire("Error", "No se pudo cargar la variante ❌", "error");
      }
    };
    loadVariante();
  }, [id]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenes(files);
    setPreview(files.map((f) => URL.createObjectURL(f)));
  };

   const handleAddTalla = () => {
  if (!tallaTemp.id_talla || !tallaTemp.cantidad) {
    Swal.fire("Atención", "Complete los campos de talla y cantidad ⚠️", "warning");
    return;
  }

  if (tallas.some((t) => t.id_talla == tallaTemp.id_talla)) {
    Swal.fire("Atención", "Esta talla ya fue agregada ⚠️", "warning");
    return;
  }

  const tallaSeleccionada = opcionesTalla.find(
    (t) => t.id_talla == tallaTemp.id_talla
  );

  setTallas([
    ...tallas,
    {
      id_talla: tallaSeleccionada.id_talla,
      nombre: tallaSeleccionada?.nombre || "",
      cantidad: tallaTemp.cantidad,
    },
  ]);

  setTallaTemp({ id_talla: "", cantidad: "" });
};

  const handleRemoveTalla = (index) => {
    const updated = [...tallas];
    updated.splice(index, 1);
    setTallas(updated);
  };

  const handleChangeTalla = (index, field, value) => {
    const updated = [...tallas];
    updated[index][field] = value;

    if (field === "id_talla") {
      const tallaSeleccionada = opcionesTalla.find((t) => t.id_talla == value);
      updated[index].nombre = tallaSeleccionada?.nombre || "";
    }

    setTallas(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idProducto || !idColor || !precio) {
      Swal.fire("Atención", "Complete todos los campos obligatorios ⚠️", "warning");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("id_producto", idProducto);
      formData.append("id_color", idColor);
      formData.append("precio", precio);
      formData.append("estado", estado);
      formData.append("tallas", JSON.stringify(tallas));
      imagenes.forEach((img) => formData.append("imagenes", img));


      if (id) {
        await updateVariante(id, formData);
        Swal.fire("Actualizado", "Variante actualizada correctamente ✅", "success");
      } else {
        await createVariante(formData);
        Swal.fire("Creado", "Variante creada correctamente ✅", "success");
      }

      navigate("/admin/varianteProductos");
    } catch (error) {
      console.error("Error al guardar variante:", error);
      Swal.fire("Error", "No se pudo guardar la variante ❌", "error");
    } finally {
      setLoading(false);
    }
  };  
  
  const filtro = function SelectProducto({ productos, idProducto, setIdProducto }) {
    const opciones = productos.map((p) => ({
      value: p.id_producto,
      label: p.nombre,
    }));
      
    const valorSeleccionado = opciones.find((o) => o.value === idProducto) || null;
  }

  return (
    <div className="form-container">
      <h2>{id ? "Editar Variante" : "Agregar Variante"}</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
       <div className="form-group select-producto-modern">
          <label>Producto:</label>
          <Select
            options={productos.map((p) => ({
              value: p.id_producto,
              label: p.nombre,
            }))}
            value={
              productos
                .map((p) => ({ value: p.id_producto, label: p.nombre }))
                .find((o) => o.value === idProducto) || null
            }
            onChange={(opcion) => setIdProducto(opcion?.value || "")}
            placeholder="Buscar o seleccionar un producto..."
            isSearchable
            classNamePrefix="select-custom"
          />
        </div>


        <div className="form-group">
          <label>Color:</label>
         <Select
            options={colores.map((c) => ({
              value: c.id_color,
              label: c.nombre,
            }))} 
            value={
              colores
                .map((c) => ({ value: c.id_color, label: c.nombre }))
                .find((o) => o.value === idColor) || null
            } 
            onChange={(opcion) => setIdColor(opcion?.value || "")} 
            placeholder="Seleccione un color..."
            isSearchable
            classNamePrefix="select-custom"
          />

        </div>

        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            min="0"
            placeholder="Ej: 80000"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>

        {id && (
          <div className="form-group">
            <label>Estado:</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        )}

       <div className="form-group">
      <label>Tallas:</label>

      <div className="tallas-input">
       <Select
          options={opcionesTalla.map((opt) => ({
            value: opt.id_talla,
            label: opt.nombre,
          }))} 
          value={
            opcionesTalla
              .map((opt) => ({ value: opt.id_talla, label: opt.nombre }))
              .find((o) => o.value === tallaTemp.id_talla) || null
          } 
          onChange={(opcion) =>
            setTallaTemp({ ...tallaTemp, id_talla: opcion?.value || "" })
          }
          placeholder="Seleccione una talla..."
          isSearchable
          classNamePrefix="select-custom"
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={tallaTemp.cantidad}
          onChange={(e) =>
            setTallaTemp({ ...tallaTemp, cantidad: e.target.value })
          }
        />

        <button type="button" className="btn-add" onClick={handleAddTalla}>
          +
        </button>
      </div>
        
      <div className="tallas-list">
          {tallas.map((t, i) => (
            <div key={i} className="talla-item">
              <label>Talla:</label>
              <select
                value={t.id_talla}
                onChange={(e) =>
                  handleChangeTalla(i, "id_talla", e.target.value)
                }
              >
                <option value="">Seleccione una talla</option>
                {opcionesTalla.map((a) => (
                <option key={a.id_talla} value={a.id_talla}>
                    {a.nombre}
                </option>
                ))}
              </select>
              <label>Cantidad:</label>
              <input
                type="number"
                value={t.cantidad}
                onChange={(e) =>
                  handleChangeTalla(i, "cantidad", Number(e.target.value))
                }
                min={1}
              />

              <button
                type="button"
                className="btn-delete"
                onClick={() => handleRemoveTalla(i)}
              >
                ✖
              </button>
            </div>
          ))}
        </div>

    </div>
        <div className="form-group">
          <label>Imágenes:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        {(preview.length > 0 || imagenes.length > 0) && (
            <div className="imagenes-preview">
              {(preview.length > 0 ? preview : imagenes).map((img, index) => (
                <img
                  key={index}
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  alt={`Variante imagen ${index + 1}`}
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 8,
                    margin: "0 5px",
                  }}
                />
              ))}
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
