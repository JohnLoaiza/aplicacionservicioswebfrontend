import CompleteCrud from "../components/CompleteCrud";
import type { Persona } from "../types/models";

 const initialPersona: Persona = {
    id: 0,
    nombre: "",
    identificacion: "",
    cargo: "",
    unidad: "",
    email_institucional: ""
  };

export default function Persona() {
  return <CompleteCrud<Persona> table="persona" initialItem={initialPersona}></CompleteCrud>
}

