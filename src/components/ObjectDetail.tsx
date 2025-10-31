import { useEffect, useState } from "react";
import * as api from "../services/api";

type ObjectDetailProps<T extends Record<string, any>> = {
  table: string;
  id: any;
  initialItem: T;
  findBycolumn?: string;
  nonEditableColumns?: string[]; // columnas no editables
  hiddenColumns?: string[]; // 🆕 columnas ocultas
};

export default function ObjectDetail<T extends Record<string, any>>({
  table,
  id,
  initialItem,
  findBycolumn,
  nonEditableColumns = [],
  hiddenColumns = [], // valor por defecto vacío
}: ObjectDetailProps<T>) {
  const [item, setItem] = useState<T>(initialItem);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    setLoading(true);
    const result = findBycolumn
      ? await api.getItemByColumn(table, findBycolumn, id)
      : await api.getItem(table, id);

    console.log("result:", result);
    if (result?.datos) setItem(result.datos[0]);
    setLoading(false);
  };

  const handleChange = <K extends keyof T>(key: K, value: T[K]) => {
    setItem({ ...item, [key]: value });
  };

  const handleSubmit = async () => {
    await api.updateItem(table, findBycolumn ? item.id : id, item);
    setIsEditing(false);
    fetchItem();
  };

  if (loading) return <p>Cargando {table}...</p>;

  return (
    <div className="object-detail-container">
      <div className="header-section">
        <h2>Detalle de {table}</h2>
        <button className="btn-edit" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancelar" : "Editar"}
        </button>
      </div>

      {/* Vista de solo lectura */}
      {!isEditing ? (
        <div className="detail-view">
          {Object.entries(item)
            .filter(([key]) => !hiddenColumns.includes(key)) // 🧱 omite columnas ocultas
            .map(([key, value]) => (
              <div key={key} className="detail-row">
                <strong>{key}:</strong> <span>{String(value ?? "—")}</span>
              </div>
            ))}
        </div>
      ) : (
        /* Vista de edición */
        <div className="edit-view">
          {Object.entries(item)
            .filter(([key]) => !hiddenColumns.includes(key)) // 🧱 omite columnas ocultas
            .map(([key, value]) => {
              const type = detectInputType(value);
              const isNonEditable =
                key === "id" || nonEditableColumns.includes(key);

              return (
                <div key={key} className="form-group">
                  <label className="form-label">{key}</label>
                  <input
                    className="form-input"
                    type={type}
                    value={String(value ?? "")}
                    disabled={isNonEditable}
                    onChange={(e) =>
                      !isNonEditable &&
                      handleChange(
                        key as keyof T,
                        parseValue(type, e.target.value) as any
                      )
                    }
                  />
                </div>
              );
            })}

          <button className="btn-save" onClick={handleSubmit}>
            Guardar cambios
          </button>
        </div>
      )}
    </div>
  );
}

/* 🧠 Detecta tipo de input según el valor */
function detectInputType(value: any): string {
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "checkbox";
  if (value instanceof Date) return "date";
  if (isDateString(value)) return "date";
  return "text";
}

/* 🧩 Verifica si un string tiene formato de fecha */
function isDateString(value: any): boolean {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value);
}

/* 🔄 Convierte el valor recibido según el tipo de input */
function parseValue(type: string, value: string): any {
  if (type === "number") return Number(value);
  if (type === "checkbox") return value === "on";
  if (type === "date") return value;
  return value;
}
