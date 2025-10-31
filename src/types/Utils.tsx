export interface TableFilter {
  column: string;   // nombre de la columna a filtrar
  value: any;       // valor a comparar
  operator?: "equals" | "contains" | "startsWith" | "endsWith"; // opcional
}