export const AppRoutes = {
  Dashboard: "/",
  Proyecto: "/proyecto",
  TipoProyecto: "/tipo-proyecto",
  TipoResponsable: "/tipo-responsable",
  Estado: "/estado",
  Usuarios: "/usuarios",
  TransformacionInstitucional: "/transformacion-institucional",
} as const;

export type AppRouteValues = typeof AppRoutes[keyof typeof AppRoutes];