interface CrudTableProps {
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
}

export default function CrudTable({ data, onEdit, onDelete }: CrudTableProps) {

  const columns = Object.keys(data[0]);

  console.log(columns)
 

  return (
    <table className="min-w-full border mt-4">
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
        {data.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {columns.map((col) => (
              <td key={col} className="border p-2">
                {row[col]}
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
                onClick={() => onDelete(row.id)}
                className="text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
