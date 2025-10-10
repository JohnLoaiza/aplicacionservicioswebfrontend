import CompleteCrud from "../components/CompleteCrud";
import type { Enumerador } from "../types/models";

const initialProyect: Enumerador = {
    id: 0,
    nombre: "",
    descripcion: ""
  };

export default function TransformacionInstitucional() {
  return <CompleteCrud<Enumerador> table="transformacion_institucional" initialItem={initialProyect}></CompleteCrud>
}
