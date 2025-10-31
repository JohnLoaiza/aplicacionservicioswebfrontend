interface CrudFormProps<T> {
  item: T;
  onChange: <K extends keyof T>(key: K, value: T[K]) => void;
  onSubmit: () => void;
}

export default function CrudForm<T>({ item, onChange, onSubmit }: CrudFormProps<T>) {
  const keys = Object.keys(item || {}).filter((k) => k !== "id");

  return (
    <div className="mt-4 bg-gray-50 p-4 rounded-xl">
      {keys.map((key) => {
        const value = item[key as keyof T];
        const isFecha = key.toLowerCase().includes("fecha"); // 🔍 detecta si el nombre contiene "fecha"

        return (
          <div key={key} className="mb-3">
            <label className="block text-sm font-medium capitalize mb-1">{key}</label>
            <input
              type={isFecha ? "date" : "text"} // 🗓️ usa "date" si contiene "fecha"
              value={
                isFecha && value
                  ? String(value).split("T")[0] // evita mostrar hora si viene en formato timestamp
                  : String(value ?? "")
              }
              onChange={(e) =>
                onChange(
                  key as keyof T,
                  (isFecha ? (e.target.value as unknown as Date) : e.target.value) as T[keyof T]
                )
              }
              className="border p-2 w-full rounded"
            />
          </div>
        );
      })}

      <button
        onClick={onSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-2"
      >
        Guardar
      </button>
    </div>
  );
}
