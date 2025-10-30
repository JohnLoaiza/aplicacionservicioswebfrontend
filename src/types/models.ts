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
  idProyectoPadre?: number | null; // puede ser null
  idResponsable?: number | null;   // puede ser null
  idTipoProyecto?: number | null;  // puede ser null
  codigo: string;
  titulo: string;
  descripcion?: string | null;
  fechaInicio?: Date | null;
  fechaFinPrevista?: Date | null;
  fechaModificacion?: Date | null;
  fechaFinalizacion?: Date | null;
  rutaLogo?: string | null;
}
