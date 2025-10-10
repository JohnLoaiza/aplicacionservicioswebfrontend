
interface CrudFormProps<T> {
  item: T;
  onChange: <K extends keyof T>(key: K, value: T[K]) => void;
  onSubmit: () => void;
}

export default function CrudForm<T>({ item, onChange, onSubmit }: CrudFormProps<T>) {
  const keys = Object.keys(item || {}).filter((k) => k !== "id");

  return (
    <div className="mt-4 bg-gray-50 p-4 rounded-xl">
      {keys.map((key) => (
        <div key={key} className="mb-2">
          <label className="block text-sm font-medium capitalize">{key}</label>
          <input
            type="text"
            value={String(item[key as keyof T] ?? "")}
            onChange={(e) => onChange(key as keyof T, e.target.value as T[keyof T])}
            className="border p-2 w-full rounded"
          />
        </div>
      ))}

      <button
        onClick={onSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-2"
      >
        Guardar
      </button>
    </div>
  );
}
