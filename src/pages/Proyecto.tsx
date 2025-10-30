import CompleteCrud from "../components/CompleteCrud";
import ProyectoForm from "../components/Forms/CreateProyectForm";
import type { Proyecto } from "../types/models";

 const initialProyecto: Proyecto = {
  id: 0,                 // usualmente se asigna al insertar en la DB
  idProyectoPadre: null,
  idResponsable: null,
  idTipoProyecto: null,
  codigo: "",
  titulo: "",
  descripcion: null,
  fechaInicio: null,
  fechaFinPrevista: null,
  fechaModificacion: null,
  fechaFinalizacion: null,
  rutaLogo: null,
};

export default function Proyecto() {
  return <CompleteCrud<Proyecto> table="proyecto" initialItem={initialProyecto} createComponent={<ProyectoForm></ProyectoForm>}></CompleteCrud>
}

