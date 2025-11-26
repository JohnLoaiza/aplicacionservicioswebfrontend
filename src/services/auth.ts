import axios from "axios";
import { API_URL } from "./api";
import type { CredencialesGenericas, Usuario } from "../types/auth";

export async function UserLogin(email: string, pass: string) {
  try {

    const credenciales: CredencialesGenericas = {
  tabla: "usuario",
  campoUsuario: "email",
  campoContrasena: "contrasena",
  usuario: email,
  contrasena: pass
};
    const response = await axios.post(`${API_URL}/api/autenticacion/token`, credenciales);
    return response.data;
  } catch (error) {
    console.error(`Error al crear usuario:`, error);
    throw error;
  }
}

export async function CreateUser(email: string, pass: string) {
  try {

    const nuevoUsuario: Usuario = {
        email: email,
        contrasena: pass,
        activo: true
        };
        
    const response = await axios.post(`${API_URL}/api/usuario?esquema=public&limite=5&camposEncriptar=contrasena`, nuevoUsuario);
    return response.data;
  } catch (error) {
    console.error(`Error al crear usuario:`, error);
    throw error;
  }
}