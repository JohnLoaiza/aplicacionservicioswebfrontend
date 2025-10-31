import CompleteCrud from "../components/CompleteCrud";
import type { Enumerador } from "../types/models";

const initialProyect: Enumerador = {
    id: 0,
    nombre: "",
    descripcion: ""
  };

export default function TipoResponsable() {
  return <CompleteCrud<Enumerador> table="tiporesponsable" initialItem={initialProyect}></CompleteCrud>
}
