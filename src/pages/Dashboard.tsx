import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/routes"; // Importamos las rutas

const Dashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Tipos de Proyecto",
      description: "Catálogo de categorías de proyectos (estratégico, gestión, etc.)",
      path: AppRoutes.TipoProyecto,
    },
    {
      title: "Tipos de Responsable",
      description: "Catálogo de roles posibles (gerente, líder, miembro, etc.)",
      path: AppRoutes.TipoResponsable,
    },
    {
      title: "Estados",
      description: "Catálogo de estados de avance de los proyectos",
      path: AppRoutes.Estado,
    },
    {
      title: "Usuarios",
      description: "Información base de las personas que participan en los proyectos",
      path: AppRoutes.Usuarios,
    },
    {
      title: "Transformaciones Institucionales",
      description: "Iniciativas mayores que agrupan proyectos estratégicos",
      path: AppRoutes.TransformacionInstitucional,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Panel de Administración
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="cursor-pointer bg-white shadow-lg hover:shadow-xl transition rounded-2xl p-6 border border-gray-200 hover:border-blue-400"
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              {item.title}
            </h2>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
