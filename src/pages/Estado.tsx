import CompleteCrud from "../components/CompleteCrud";
import type { Enumerador } from "../types/models";

  const initialEstado: Enumerador = {
    id: 0,
    nombre: "",
    descripcion: ""
  };

export default function Estado() {
  return <CompleteCrud<Enumerador> table="estado" initialItem={initialEstado}></CompleteCrud>
}
