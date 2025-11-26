export interface CredencialesGenericas {
  tabla: string;
  campoUsuario: string;
  campoContrasena: string;
  usuario: string;
  contrasena: string;
}

export interface Usuario {
  email: string;
  contrasena: string;
  activo: boolean;
}

