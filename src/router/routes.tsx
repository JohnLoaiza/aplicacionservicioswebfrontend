export const AppRoutes = {
  Login: "/login",
  Register: "/register",
  Dashboard: "/dashboard",
  Proyecto: "/proyecto",
  TipoProyecto: "/tipo-proyecto",
  TipoResponsable: "/tipo-responsable",
  Estado: "/estado",
  Usuarios: "/usuarios",
  Roles: "/roles",
  TransformacionInstitucional: "/transformacion-institucional",
} as const;

export type AppRouteValues = typeof AppRoutes[keyof typeof AppRoutes];