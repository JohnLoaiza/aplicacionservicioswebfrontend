import { useEffect, useState } from "react";
import axios from "axios";
import * as api from "../../services/api";

const API_URL = "https://localhost:7256";

interface SelectOption {
  id: number;
  titulo: string;
}

interface ProyectoFormData {
  p_Codigo: string;
  p_Titulo: string;
  p_Descripcion: string;
  p_FechaInicio: string;
  p_FechaFinPrevista: string;
  p_IdEstado: number;
  p_IdProyectoPadre?: number | null;
  p_IdResponsable: number;
  p_IdTipoProyecto?: number | null;
  p_Variable_Titulo: string;
  p_Variable_Descripcion: string;
  p_Objetivo_Titulo: string;
  p_Objetivo_Descripcion: string;
  p_Meta_Titulo: string;
  p_Meta_Descripcion: string;
  p_IdPresupuestoPadre?: number | null;
  p_MontoSolicitado: number;
  p_NombreResponsable: string;
  p_IdTipoResponsable: number;
  p_IdUsuario: number
}


const ProyectoForm = () => {
  const [formData, setFormData] = useState<ProyectoFormData>({
    p_Codigo: "",
    p_Titulo: "",
    p_Descripcion: "",
    p_FechaInicio: "",
    p_FechaFinPrevista: "",
    p_IdEstado: 1,
    p_IdProyectoPadre: null,
    p_IdResponsable: 1, // Ajusta según tu lógica
    p_IdTipoProyecto: null,
    p_Variable_Titulo: "",
    p_Variable_Descripcion: "",
    p_Objetivo_Titulo: "",
    p_Objetivo_Descripcion: "",
    p_Meta_Titulo: "",
    p_Meta_Descripcion: "",
    p_IdPresupuestoPadre: null,
    p_MontoSolicitado: 0,
    p_NombreResponsable: "",
    p_IdTipoResponsable: 0,
    p_IdUsuario: 0,
  });

  const [proyectos, setProyectos] = useState<SelectOption[]>([]);
  const [tiposProyecto, setTiposProyecto] = useState<SelectOption[]>([]);
  const [presupuestos, setPresupuestos] = useState<SelectOption[]>([]);
  const [usuarios, setUsuarios] = useState<SelectOption[]>([]);
  const [tipoResponsables, setTipoResponsables] = useState<SelectOption[]>([]);

  useEffect(() => {
    // Fetch de los selects al montar
    const fetchSelects = async () => {
      try {
        const proyectosRes = await api.fetchAll("proyecto");
        setProyectos(proyectosRes.datos || []);

        const tiposRes = await api.fetchAll("tipoproyecto");
        setTiposProyecto(
            (tiposRes.datos as any[]).map(t => ({
                id: t.id,
                titulo: t.nombre
            })) || []
        );

        const presupuestosRes = await api.fetchAll("presupuesto");
        setPresupuestos(
            (presupuestosRes.datos as any[]).map(t => ({
                id: t.id,
                titulo: t.observaciones
            })) || []
        );

        const usuariosRes = await api.fetchAll("usuario");
        setUsuarios(
            (usuariosRes.datos as any[]).map(t => ({
                id: t.id,
                titulo: t.email
            })) || []
        );

        const tipoResponsablesRes = await api.fetchAll("tiporesponsable");
        setTipoResponsables(tipoResponsablesRes.datos || []);
      } catch (error) {
        console.error("Error al cargar datos de selects:", error);
      }
    };

    fetchSelects();
  }, []);

  const handleChange = (key: keyof ProyectoFormData, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/procedimientos/ejecutarsp`, {
        nombreSP: "crear_proyecto_completo",
        ...formData,
      });
      alert("Proyecto creado correctamente");

      window.location.reload();
      // Reset si quieres
      setFormData({
        p_Codigo: "",
        p_Titulo: "",
        p_Descripcion: "",
        p_FechaInicio: "",
        p_FechaFinPrevista: "",
        p_IdEstado: 1,
        p_IdProyectoPadre: null,
        p_IdResponsable: 1,
        p_IdTipoProyecto: null,
        p_Variable_Titulo: "",
        p_Variable_Descripcion: "",
        p_Objetivo_Titulo: "",
        p_Objetivo_Descripcion: "",
        p_Meta_Titulo: "",
        p_Meta_Descripcion: "",
        p_IdPresupuestoPadre: null,
        p_MontoSolicitado: 0,
        p_NombreResponsable: "",
        p_IdTipoResponsable: 0,
        p_IdUsuario: 0,
      });
    } catch (error) {
      console.error("Error al crear proyecto:", error);
      alert("Error al crear proyecto");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <input
        type="text"
        placeholder="Código"
        value={formData.p_Codigo}
        onChange={(e) => handleChange("p_Codigo", e.target.value)}
        required
        className="input"
      />
      <input
        type="text"
        placeholder="Título"
        value={formData.p_Titulo}
        onChange={(e) => handleChange("p_Titulo", e.target.value)}
        required
        className="input"
      />
      <textarea
        placeholder="Descripción"
        value={formData.p_Descripcion}
        onChange={(e) => handleChange("p_Descripcion", e.target.value)}
        className="input"
      />

      <input
        type="date"
        value={formData.p_FechaInicio}
        onChange={(e) => handleChange("p_FechaInicio", e.target.value)}
        required
        className="input"
      />
      <input
        type="date"
        value={formData.p_FechaFinPrevista}
        onChange={(e) => handleChange("p_FechaFinPrevista", e.target.value)}
        required
        className="input"
      />

      {/* Selects */}
      <select
        value={formData.p_IdProyectoPadre || ""}
        onChange={(e) => handleChange("p_IdProyectoPadre", e.target.value ? Number(e.target.value) : null)}
        className="input"
      >
        <option value="">-- Proyecto Padre --</option>
        {proyectos.map((p) => (
          <option key={p.id} value={p.id}>
            {p.titulo}
          </option>
        ))}
      </select>

      <select
        value={formData.p_IdTipoProyecto || ""}
        onChange={(e) => handleChange("p_IdTipoProyecto", e.target.value ? Number(e.target.value) : null)}
        className="input"
      >
        <option value="">-- Tipo Proyecto --</option>
        {tiposProyecto.map((t) => (
          <option key={t.id} value={t.id}>
            {t.titulo}
          </option>
        ))}
      </select>
{/*
      <select
        value={formData.p_IdPresupuestoPadre || ""}
        onChange={(e) => handleChange("p_IdPresupuestoPadre", e.target.value ? Number(e.target.value) : null)}
        className="input"
      >
        <option value="">-- Presupuesto Padre --</option>
        {presupuestos.map((p) => (
          <option key={p.id} value={p.id}>
            {p.titulo}
          </option>
        ))}
      </select>
      */}

      <select
        value={formData.p_IdUsuario || ""}
        onChange={(e) => handleChange("p_IdUsuario", e.target.value ? Number(e.target.value) : null)}
        className="input"
      >
        <option value="">-- Responsable --</option>
        {usuarios.map((p) => (
          <option key={p.id} value={p.id}>
            {p.titulo}
          </option>
        ))}
      </select>

      <select
        value={formData.p_IdTipoResponsable || ""}
        onChange={(e) => handleChange("p_IdTipoResponsable", e.target.value ? Number(e.target.value) : null)}
        className="input"
      >
        <option value="">--Tipo responsable --</option>
        {tipoResponsables.map((p) => (
          <option key={p.id} value={p.id}>
            {p.titulo}
          </option>
        ))}
      </select>

      {/* Variables, Objetivos, Metas */}
      <input
        type="text"
        placeholder="Variable Título"
        value={formData.p_Variable_Titulo}
        onChange={(e) => handleChange("p_Variable_Titulo", e.target.value)}
        className="input"
      />
      <textarea
        placeholder="Variable Descripción"
        value={formData.p_Variable_Descripcion}
        onChange={(e) => handleChange("p_Variable_Descripcion", e.target.value)}
        className="input"
      />

      <input
        type="text"
        placeholder="Objetivo Título"
        value={formData.p_Objetivo_Titulo}
        onChange={(e) => handleChange("p_Objetivo_Titulo", e.target.value)}
        className="input"
      />
      <textarea
        placeholder="Objetivo Descripción"
        value={formData.p_Objetivo_Descripcion}
        onChange={(e) => handleChange("p_Objetivo_Descripcion", e.target.value)}
        className="input"
      />

      <input
        type="text"
        placeholder="Meta Título"
        value={formData.p_Meta_Titulo}
        onChange={(e) => handleChange("p_Meta_Titulo", e.target.value)}
        className="input"
      />
      <textarea
        placeholder="Meta Descripción"
        value={formData.p_Meta_Descripcion}
        onChange={(e) => handleChange("p_Meta_Descripcion", e.target.value)}
        className="input"
      />

      <input
        type="number"
        placeholder="Monto Solicitado"
        value={formData.p_MontoSolicitado}
        onChange={(e) => handleChange("p_MontoSolicitado", Number(e.target.value))}
        className="input"
      />

      <button type="submit" className="btn-primary">
        Crear Proyecto
      </button>
    </form>
  );
};

export default ProyectoForm;
