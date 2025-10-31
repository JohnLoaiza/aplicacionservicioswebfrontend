import type { TableFilter } from "../types/Utils";

interface CrudTableProps<T> {
  data: T[];
  onEdit: (item: T) => void;
  onDelete: (id: number) => void;
  filter?: TableFilter; // 🆕 se pasa un modelo de filtro
}

export default function CrudTable<T extends Record<string, any>>({
  data,
  onEdit,
  onDelete,
  filter,
}: CrudTableProps<T>) {
  if (!data || data.length === 0) {
    return <p className="mt-4 text-gray-500">No hay datos para mostrar.</p>;
  }

  const columns = Object.keys(data[0]);

  // 🧠 Filtrado dinámico según modelo
  const filteredData = !filter
    ? data
    : data.filter((row) => {
        const cellValue = row[filter.column];
        if (cellValue == null) return false;

        const filterValue = String(filter.value).toLowerCase();
        const cellString = String(cellValue).toLowerCase();

        switch (filter.operator) {
          case "contains":
            return cellString.includes(filterValue);
          case "startsWith":
            return cellString.startsWith(filterValue);
          case "endsWith":
            return cellString.endsWith(filterValue);
          case "equals":
          default:
            return cellString === filterValue;
        }
      });

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col) => (
              <th key={col} className="border p-2 text-left capitalize">
                {col}
              </th>
            ))}
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col} className="border p-2">
                  {String(row[col] ?? "—")}
                </td>
              ))}
              <td className="border p-2 text-center">
                <button
                  onClick={() => onEdit(row)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(Number(row.id))}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

          {filteredData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center text-gray-500 p-4"
              >
                No se encontraron resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
