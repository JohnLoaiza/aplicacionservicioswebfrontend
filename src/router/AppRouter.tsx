import { BrowserRouter, Routes, Route, NavLink, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import TipoProyecto from "../pages/TipoProyecto";
import TipoResponsable from "../pages/TipoResponsable";
import Estado from "../pages/Estado";
import Persona from "../pages/Persona";
import "../styles/layout.css";
import { AppRoutes } from "./routes";
import Proyecto from "../pages/Proyecto";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { fetchAll, getItem, getItemByColumn } from "../services/api";
import { useEffect, useState, type JSX } from "react";
import Roles from "../pages/Roles";


const AuthComponent = ({ children, setRoutes }: { children: React.ReactNode, setRoutes: any }) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handle = async () => {
    console.log("path es");
    console.log(pathname);
    
    
    var userEmail = sessionStorage.getItem("user");

    if (userEmail != null)
    {

      if (pathname == AppRoutes.Login || pathname == AppRoutes.Register)
          navigate(AppRoutes.Dashboard);

    var routes = (await fetchAll("routes")).datos

    

    var routeId = (routes as any[]).find(r => r.path === pathname).id

    console.log("routeid "+routeId);
    
    
    console.log(routes);  

    var user = (await getItemByColumn("usuario", "email", userEmail ?? "")).datos[0]

    console.log(user); 
    var roleRoutes = (await getItemByColumn("roleroutes", "role", user.role)).datos;
    console.log(roleRoutes);

    var finalRoutes = (routes as any[]).filter(r => (roleRoutes as any[]).map(r => r.routeid).includes(r.id));
    console.log("final");
    console.log(finalRoutes);
  
    setRoutes(finalRoutes)
    
    var containRoute = (roleRoutes as any[]).find(r => r.routeid == routeId);

    if (containRoute == null || containRoute == undefined)
      navigate(AppRoutes.Dashboard);

    console.log("Ruta permitida");
    } else {
    navigate(pathname === AppRoutes.Register ? pathname : AppRoutes.Login);
    }
  };

  useEffect(() => {
    handle();
  }, [pathname]);

  return (
    <div className="layout">
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

const Layout = ({ children, routes }: { children: React.ReactNode, routes: string[] }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const hideSidebarRoutes: string [] = [AppRoutes.Login, AppRoutes.Register];
  const hideSidebar = hideSidebarRoutes.includes(pathname); 

  const handleLogout = () => {
    // limpia token o datos del usuario
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("exp");
    sessionStorage.removeItem("user");

    // Redirige al login
    navigate(AppRoutes.Login);
  };

  var ValidateRoute = (route: string, title: string) => routes.includes(route) ? <NavLink to={route} end>{title}</NavLink> : <></>

  return (
    <div className="layout">
      {!hideSidebar && (
        <aside className="sidebar">
          <h2 className="logo">Gestor</h2>
          <nav className="nav-links">
            {ValidateRoute(AppRoutes.Dashboard, "Dashboard")}
            {ValidateRoute(AppRoutes.Proyecto, "Proyecto")}
            {ValidateRoute(AppRoutes.TipoProyecto, "Tipo Proyecto")}
            {ValidateRoute(AppRoutes.TipoResponsable, "Tipo responsable")}
            {ValidateRoute(AppRoutes.Estado, "Estado")}
            {ValidateRoute(AppRoutes.Usuarios, "Usuarios")}
            {ValidateRoute(AppRoutes.Roles, "Roles")}
          </nav>

          {/* BOTÓN DE LOGOUT */}
          <button 
            className="logout-btn" 
            onClick={handleLogout}
            style={{ marginTop: "auto", padding: "10px", width: "100%" }}
          >
            Cerrar sesión
          </button>
        </aside>
      )}

      <main className={hideSidebar ? "center-content" : "main-content"}>
        {children}
      </main>
    </div>
  );
};


export const AppRouter = () => {
  const [routes, setRoutes] = useState<any[]>([])

  var OnlyPaths = () => routes.map(r => r.path); 

  var ValidateRoute = (route: string, component: JSX.Element ) => OnlyPaths().includes(route) ? <Route path={route} element={component} /> : <Route path={AppRoutes.Dashboard} element={<Dashboard />} />

  return (
    <BrowserRouter>
    <AuthComponent setRoutes={setRoutes}>
      <Layout routes={OnlyPaths()}>
        <Routes>
          <Route path={AppRoutes.Login} element={<Login />} />
          <Route path={AppRoutes.Register} element={<Register />} />
          {ValidateRoute(AppRoutes.Dashboard, <Dashboard></Dashboard>)}
          {ValidateRoute(AppRoutes.Proyecto, <Proyecto></Proyecto>)}
          {ValidateRoute(AppRoutes.TipoProyecto, <TipoProyecto></TipoProyecto>)}
          {ValidateRoute(AppRoutes.TipoResponsable, <TipoResponsable></TipoResponsable>)}
          {ValidateRoute(AppRoutes.Estado, <Estado></Estado>)}
          {ValidateRoute(AppRoutes.Usuarios, <Persona></Persona>)}
          {ValidateRoute(AppRoutes.Roles, <Roles></Roles>)}
        </Routes>
      </Layout>
    </AuthComponent>
    </BrowserRouter>
  );
};
