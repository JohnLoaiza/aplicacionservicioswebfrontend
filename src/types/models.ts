export interface Enumerador {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  identificacion: string;
  cargo: string;
  unidad: string;
  email_institucional: string;
}

export interface Proyecto {
  id: number; // SERIAL PRIMARY KEY
  idproyectopadre: number | null; // puede ser null
  idresponsable: number;   // puede ser null
  idtipoProyecto?: number | null;  // puede ser null
  codigo: string;
  titulo: string;
  descripcion?: string | null;
  fechaInicio?: Date | null;
  fechafinprevista?: Date | null;
  fechamodificacion?: Date | null;
  fechafinalizacion?: Date | null;
  rutalogo?: string | null;
}

export interface MetaProyecto {
  idmeta: number;
  idproyecto: number;
  fechaasociacion?: string; // formato YYYY-MM-DD o null
}


export interface MetaEstrategica {
  id: number;            // Clave primaria (SERIAL)
  idobjetivo: number;    // FK → ObjetivoEstrategico(Id)
  titulo: string;        // Título de la meta
  descripcion?: string;  // Texto opcional con la descripción
}

export interface ObjetivoEstrategico {
  id: number;              // SERIAL PRIMARY KEY
  idvariable: number;      // Clave foránea a VariableEstrategica
  titulo: string;          // Hasta 150 caracteres
  descripcion?: string | null; // Campo opcional de texto
}

export interface Presupuesto {
  Id: number;
  IdProyecto: number;
  MontoSolicitado: number | null;
  Estado: string | null;
  MontoAprobado: number | null;
  PeriodoAnio: number | null;
  FechaSolicitud: string | null;   // formato ISO (YYYY-MM-DD)
  FechaAprobacion: string | null;  // formato ISO (YYYY-MM-DD)
  Observaciones: string | null;
}