import axios from "axios";

const API_URL = "https://localhost:7256"; // 🔧 Ajusta según tu backend real

// 🔹 Obtener todos los registros de una tabla
export async function fetchAll(table: string) {
  try {
    const response = await axios.get(`${API_URL}/api/${table}?esquema=public`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener datos de ${table}:`, error);
    throw error;
  }
}

// 🔹 Crear un nuevo registro
export async function createItem(table: string, data: any) {
  try {
    // Clonamos el objeto para no modificar el original
    const cleanData = { ...data };

    // Eliminamos el campo id si existe
    delete cleanData.id;

    const response = await axios.post(`${API_URL}/api/${table}`, cleanData);
    return response.data;
  } catch (error) {
    console.error(`Error al crear en ${table}:`, error);
    throw error;
  }
}

export async function getItem(table: string, id: number) {
  try {
    const response = await axios.get(`${API_URL}/api/${table}/id/${id}?esquema=public`);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar en ${table}:`, error);
    throw error;
  }
}

export async function getItemByColumn(table: string, column: string, id: number) {
  try {
    const response = await axios.get(`${API_URL}/api/${table}/${column}/${id}?esquema=public`);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar en ${table}:`, error);
    return null;
  }
}

// 🔹 Actualizar un registro existente
export async function updateItem(table: string, id: number, data: any) {
  try {
    const response = await axios.put(`${API_URL}/api/${table}/id/${id}?esquema=public`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar en ${table}:`, error);
    throw error;
  }
}

// 🔹 Eliminar un registro
export async function deleteItem(table: string, valorClave: any) {
  try {
    const response = await axios.delete(`${API_URL}/api/${table}/id/${valorClave}?esquema=public`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar en ${table}:`, error);
    throw error;
  }
}
