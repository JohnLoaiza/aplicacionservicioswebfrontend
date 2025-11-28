import { useEffect, useState } from "react";
import * as api from "../services/api";

export default function Roles() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [_, setRoleRoutes] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<any | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const roles = (await api.fetchAll("roles")).datos;
    setRoles(roles);

    const roleRoutesResponse = (await api.fetchAll("roleroutes")).datos;
    setRoleRoutes(roleRoutesResponse);

    const routesResponse = (await api.fetchAll("routes")).datos;
    setRoutes(routesResponse);
  };

  const handleAction = (role: any) => {
    setSelectedRole(role);
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  // 🔹 Si hay rol seleccionado → mostrar componente RoleInfo
  if (selectedRole) {
    return <RoleInfo routes={routes} role={selectedRole} onBack={handleBack} />;
  }

  // 🔹 Tabla normal
  return (
    <div>
      <h2>Roles</h2>

      <table border={1} cellPadding={8} cellSpacing={0}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {roles.map((r: any) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>
                <button onClick={() => handleAction(r)}>
                  Acción
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// components/RoleInfo.tsx
interface RoleInfoProps {
  role: any;
  routes: any[]
  onBack: () => void;
}

  function RoleInfo({ role, onBack, routes }: RoleInfoProps) {
  const [roleRoutes, setRoleRoutes] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const roleRoutesResponse = (await api.getItemByColumn("roleroutes", "role", role.id)).datos;
    setRoleRoutes(roleRoutesResponse);
  };

  // 🔹 helper para saber si un route está asociado al rol
  const isChecked = (routeId: number) => {
    return roleRoutes.some((rr: any) => rr.routeid === routeId);
  };

  return (
    <div style={{ padding: "20px", border: "1px solid gray" }}>
      <h2>Información del Rol</h2>

      <p><strong>ID:</strong> {role.id}</p>
      <p><strong>Name:</strong> {role.name}</p>

      <table border={1} cellPadding={8} cellSpacing={0}>
        <thead>
          <tr>
            <th>Path</th>
            <th>Description</th>
            <th>Activo</th>
          </tr>
        </thead>

        <tbody>
          {routes.filter(r => r.id != 1 && r.id != 2 ).map((r: any) => (
            <tr key={r.id}>
              <td>{r.path}</td>
              <td>{r.description}</td>

              <td>
                <input
                  type="checkbox"
                  checked={isChecked(r.id)}   // 🔹 CONTROLADO EN BASE A roleRoutes
                  onChange={ async (e) => {

                    const checked = e.target.checked;

                    if (checked) {
                        var newRoleRoute = {role: role.id, routeid: r.id}
                        await api.createItem("roleroutes", newRoleRoute)
                        setRoleRoutes(prev => [...prev, newRoleRoute]);

                    } else {
                         await api.deleteItem("roleroutes", roleRoutes.find((rr: any) => rr.routeid === r.id).id);
                        setRoleRoutes(prev => prev.filter(roleRoute => roleRoute.routeid !== r.id));
                    }

                    

                    // 🔥 Si quieres actualizar en BD, aquí lo hacemos:
                    // checked ? agregar : borrar
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={onBack}>Volver</button>
    </div>
  );
}


