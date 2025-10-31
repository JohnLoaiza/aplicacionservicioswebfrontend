import React, { useEffect, useState } from "react";
import type { MetaEstrategica, MetaProyecto, ObjetivoEstrategico, Presupuesto, Proyecto } from "../../types/models";
import * as api from "../../services/api";
import ObjectDetail from "../ObjectDetail";
import CrudTable from "../CrudTable";
import CompleteCrud from "../CompleteCrud";
import ProyectoForm from "./CreateProyectForm";

type EditProjectProps = {
  proyecto: Proyecto;
};

var initialMetaProyecto: MetaEstrategica = {
  id: 0,
  idobjetivo: 0,
  descripcion: "",
  titulo: ""
}

var initialObjetivo : ObjetivoEstrategico = {
  id: 0,
  idvariable: 1,
  titulo: "",
  descripcion: ""
}

var initialPresupuesto : Presupuesto = {
  Estado: "",
  FechaAprobacion: "",
  FechaSolicitud: "",
  Id: 0, 
  IdProyecto: 0,
  MontoAprobado: 0, 
  MontoSolicitado: 0,
  Observaciones: "",
  PeriodoAnio: 2
}

const EditProject = ({ proyecto }: EditProjectProps) => {

  const [metaProyecto, setMetaProyecto] = useState<MetaProyecto>();
  const [metaEstrategica, setMetaEstrategica] = useState<MetaEstrategica>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener proyecto base
      //  const proyectoRes = await api.getItem("proyecto", id);
       // const proyecto = proyectoRes.datos;

        // Obtener relaciones
        const padreRes = proyecto.idproyectopadre != null ? await api.getItemByColumn("proyecto", "idproyectopadre", proyecto.idproyectopadre) : null;
        const hijosRes = await api.getItemByColumn("proyecto", "idproyectopadre", proyecto.id) ?? "";
        const presupuestoRes = await api.getItemByColumn("presupuesto", "idproyecto", proyecto.id) ?? "";
        const metaProyectoRes = await api.getItemByColumn("meta_proyecto", "idproyecto", proyecto.id) ?? "";

        const presupuesto = presupuestoRes.datos[0] as Presupuesto;

        console.log("proyecto recibido:", proyecto);
        console.log("tiene idResponsable?", "idResponsable" in proyecto);
        console.log("tiene idresponsable?", "idresponsable" in proyecto);
        
        const responsableRes = await api.getItem("usuario", proyecto.idresponsable) ?? "";
        
        var meta = metaProyectoRes.datos[0] as MetaProyecto

        const estrategicaRes = await api.getItem("metaestrategica", meta.idmeta) ?? "";

        var metaEstrategica = estrategicaRes.datos[0] as MetaEstrategica

       // const objetivoRes = await api.getItem("objetivoestrategico", metaEstrategica.idobjetivo) ?? "";

       // const objetivo = objetivoRes[0] as ObjetivoEstrategico

        console.log("meta esss");
        console.log(meta);
        
        
        setMetaEstrategica(metaEstrategica);
        setMetaProyecto(meta);

        // Cargar selects
       /* const [proyRes, tipoRes, presRes, usuRes, tipoRespRes] = await Promise.all([
          api.fetchAll("proyecto"),
          api.fetchAll("tipoproyecto"),
          api.fetchAll("presupuesto"),
          api.fetchAll("usuario"),
          api.fetchAll("tiporesponsable"),
        ]);

        setProyectos(proyRes.datos || []);
        setTiposProyecto(tipoRes.datos || []);
        setPresupuestos(presRes.datos || []);
        setUsuarios(usuRes.datos || []);
        setTipoResponsables(tipoRespRes.datos || []);
        setProyectosHijos(hijosRes.datos || []);
*/
      } catch (error) {
        console.error("Error al cargar datos del proyecto:", error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h2 style={styles.title}>Cuadrante 1</h2>
          <p style={styles.text}>
            Contenido del primer cuadrante. {proyecto.idresponsable}
           {metaProyecto && <ObjectDetail<MetaEstrategica> id={metaProyecto.idmeta} table="metaestrategica" initialItem={initialMetaProyecto} nonEditableColumns={["idobjetivo"]}></ObjectDetail>}
           {metaEstrategica && <ObjectDetail<ObjetivoEstrategico> id={metaEstrategica?.idobjetivo} table="objetivoestrategico" initialItem={initialObjetivo}></ObjectDetail>}
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.title}>Cuadrante 2</h2>
          <p style={styles.text}>Contenido del segundo cuadrante.</p>
          {metaProyecto && <ObjectDetail<Presupuesto> id={proyecto.id} table="presupuesto" initialItem={initialPresupuesto} findBycolumn="idproyecto" ></ObjectDetail>}
        </div>

        <div style={styles.card}>
          <h2 style={styles.title}>Cuadrante 3</h2>
          <p style={styles.text}>Contenido del tercer cuadrante.</p>
          {proyecto && <ObjectDetail<Proyecto> id={proyecto.id} table="proyecto" initialItem={proyecto} ></ObjectDetail>}
        </div>

        <div style={styles.card}> 
          <h2 style={styles.title}>Cuadrante 4</h2>
          <p style={styles.text}>Contenido del cuarto cuadrante.</p>
          {<CompleteCrud<Proyecto>
            table="proyecto"
            initialItem={proyecto}
            createComponent={<ProyectoForm></ProyectoForm>}
            filter={{column: "idproyectopadre", value: proyecto.id}}
            Editcomponent={(proyecto) => (
        <EditProject proyecto={proyecto}></EditProject>
      )}

    ></CompleteCrud>}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: "100vh",
    backgroundColor: "#f5f6fa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxSizing: "border-box",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gridTemplateRows: "1fr 1fr",
    gap: "20px",
    width: "100%",
    height: "100%",
    maxWidth: "1400px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: "20px",
    fontWeight: 600,
    marginBottom: "10px",
    color: "#333",
    textAlign: "center",
  },
  text: {
    color: "#666",
    fontSize: "15px",
    lineHeight: 1.5,
    textAlign: "center",
  },
};

export default EditProject;
