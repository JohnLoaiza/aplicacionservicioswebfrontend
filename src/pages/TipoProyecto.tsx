import CompleteCrud from "../components/CompleteCrud";
import type { Enumerador } from "../types/models";

const initialProject: Enumerador = {
    id: 0,
    nombre: "",
    descripcion: ""
  };

export default function TipoProyecto() {
  return <CompleteCrud<Enumerador> table="tipoproyecto" initialItem={initialProject}></CompleteCrud>
}
