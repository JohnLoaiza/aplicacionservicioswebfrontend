import CompleteCrud from "../components/CompleteCrud";
import type { Usuario } from "../types/models";

 const initialPersona: Usuario = {
    id: 0,
    nombre: "",
    identificacion: "",
    cargo: "",
    unidad: "",
    email_institucional: ""
  };

export default function Persona() {
  return <CompleteCrud<Usuario> table="usuarios" initialItem={initialPersona}></CompleteCrud>
}

