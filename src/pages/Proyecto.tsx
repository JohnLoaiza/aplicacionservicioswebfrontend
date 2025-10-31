import CompleteCrud from "../components/CompleteCrud";
import ProyectoForm from "../components/Forms/CreateProyectForm";
import EditProject from "../components/Forms/EditProject";
import type { Proyecto } from "../types/models";

const initialProyecto: Proyecto = {
  id: 0, // usualmente se asigna al insertar en la DB
  idproyectopadre: null,
  idresponsable: 0,
  idtipoProyecto: null,
  codigo: "",
  titulo: "",
  descripcion: null,
  fechaInicio: null,
  fechafinprevista: null,
  fechamodificacion: null,
  fechafinalizacion: null,
  rutalogo: null,
};

export default function Proyecto() {
  return (
    <CompleteCrud<Proyecto>
      table="proyecto"
      initialItem={initialProyecto}
      createComponent={<ProyectoForm></ProyectoForm>}
      Editcomponent={(proyecto) => (
        <EditProject proyecto={proyecto}></EditProject>
      )}
    ></CompleteCrud>
  );
}
