import { useState } from "react";
import Swal from "sweetalert2";
import "../styles/AdminTable.css";
import { CgAdd } from "react-icons/cg";
import { MdDelete, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { FaPen } from "react-icons/fa";


export default function AdminTable({
  title,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar registro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "rgb(235, 146, 12)",
      cancelButtonColor: "#e74c3c",
    });

    if (confirm.isConfirmed) {
      try {
        await onDelete(id);
        Swal.fire("Eliminado", "El registro fue eliminado correctamente", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el registro", "error");
      }
    }
  };

  const filteredData = data.filter((row) =>
    columns.some((col) =>
      String(row[col] || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="admin-table">
      <div className="admin-header">
        <h2>{title}</h2>

        <div className="admin-actions">
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reiniciar a la primera página al buscar
            }}
            className="search-input"
          />
          <button className="btn-add" onClick={onAdd}>
            <CgAdd /> Agregar
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col}>
                    {col === "codigo" ? (
                      <div
                        style={{
                          backgroundColor: row[col],
                          width: "25px",
                          height: "25px",
                          borderRadius: "5px",
                          margin: "0 auto",
                          border: "1px solid #ccc",
                          boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                        }}
                      ></div>
                    ) : col === "imagen" ? (
                      <img
                        src={row.imagen}
                        alt={row.nombre}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      row[col]
                    )}
                  </td>
                ))}
                <td>
                   <button className="btn-edit" onClick={() => onEdit(row)}>
                    <FaPen />
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(row.id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="no-results">
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 📑 Paginación */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
           <MdNavigateBefore /> Anterior
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`page-btn ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente <MdNavigateNext />
          </button>
        </div>
      )}
    </div>
  );
}
