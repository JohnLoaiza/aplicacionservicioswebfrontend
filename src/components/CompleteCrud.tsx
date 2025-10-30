import { useEffect, useState, type JSX } from "react";
import * as api from "../services/api";
import CrudTable from "../components/CrudTable";
import CrudForm from "../components/CrudForm";

type CompleteCrudProps<T> = {
  table: string;
  initialItem: T;
  onEdit?: (item: T) => void;
  createComponent?: JSX.Element
};

export default function CompleteCrud<T>({ table, initialItem, onEdit, createComponent }: CompleteCrudProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [item, setItem] = useState<T>(initialItem);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await api.fetchAll(table);
    setData(result.datos || []);
  };

  const handleSubmit = async () => {
    if (editId) await api.updateItem(table, editId, item);
    else await api.createItem(table, item);

    setItem(item);
    setEditId(null);
    setShowForm(false);
    fetchData();
  };

  const handleEdit = (row: T) => {

    if (typeof onEdit === "function") {
      onEdit(row)
    } else {
      setEditId((row as any).id);
      setItem(row);
      setShowForm(true);
    }
  };

  const handleDelete = async (id: number) => {
    await api.deleteItem(table, id);
    fetchData();
  };

  // 👇 Aquí usamos keyof T para asegurar tipado correcto
  const handleChange = <K extends keyof T>(key: K, value: T[K]) => {
    setItem({ ...item, [key]: value });
  };

  return (
    <>{showForm && createComponent ? createComponent : <div className="main-container">
      <div className="header-section">
        <h2>Gestión de {table}'s</h2>
        <button className="btn-add" onClick={() => setShowForm(true)}>
          + Agregar {table}
        </button>
      </div>

      {data.length === 0 ? (
        <p className="text-center mt-4 text-gray-500">Sin registros</p>
      ) : (
        <CrudTable<T> data={data} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h3>{editId ? `Editar ${table}` : `Nuevo ${table}`}</h3>
              <button className="btn-close" onClick={() => setShowForm(false)}>
                ✖
              </button>
            </div>

            <CrudForm item={item} onChange={handleChange} onSubmit={handleSubmit} />
          </div>
        </div>
      )}
    </div>}</>
    
  );
}
