import React from "react";

type CrudTableProps = {
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (id: number | string) => void;
  columns?: string[]; // opcional: si quieres forzar columnas/orden
};

const CrudTable: React.FC<CrudTableProps> = ({ data, onEdit, onDelete, columns }) => {
  if (!data || data.length === 0) {
    return (
      <div className="container">
        <p style={{ color: "#666", margin: "12px 0" }}>No hay registros.</p>
      </div>
    );
  }

  const cols = columns ?? Object.keys(data[0]);

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c}>{formatHeader(c)}</th>
            ))}
            <th style={{ width: 170 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id ?? idx}>
              {cols.map((c) => (
                <td key={c}>{renderCell(row[c])}</td>
              ))}
              <td>
                <button className="action-btn edit" onClick={() => onEdit(row)}>
                  Editar
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => onDelete(row.id ?? row._id ?? idx)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function formatHeader(h: string) {
  // convierte "email_institucional" -> "Email Institucional"
  return h.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

function renderCell(value: any) {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "Sí" : "No";
  return String(value);
}

export default CrudTable;
