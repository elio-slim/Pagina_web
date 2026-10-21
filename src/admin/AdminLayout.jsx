import { useState } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { esAdmin } from "../lib/usuarios.js";
import { useTitulo } from "../hooks/useTitulo.js";

const MENU = [
  { to: "/admin", texto: "Dashboard", end: true },
  { to: "/admin/ordenes", texto: "Órdenes / Boletas" },
  { to: "/admin/productos", texto: "Productos", end: true },
  { to: "/admin/productos/nuevo", texto: "Agregar producto", sub: true },
  { to: "/admin/productos/criticos", texto: "Productos críticos", sub: true },
  { to: "/admin/productos/reportes", texto: "Reporte de productos", sub: true },
  { to: "/admin/categorias", texto: "Categorías" },
  { to: "/admin/usuarios", texto: "Usuarios", end: true },
  { to: "/admin/usuarios/nuevo", texto: "Crear usuario", sub: true },
  { to: "/admin/reportes", texto: "Reportes" },
  { to: "/admin/perfil", texto: "Perfil" },
];

/** Protege el panel: exige sesión iniciada con rol Administrador. */
export default function AdminLayout() {
  useTitulo("Panel de administración — Wanderly");
  const { sesion, salir } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [abierto, setAbierto] = useState(false);

  if (!sesion) return <Navigate to="/login?next=/admin" replace />;
  if (!esAdmin(sesion)) {
    return (
      <div className="container py-5 text-center">
        <h1 className="h3">Acceso restringido</h1>
        <p className="mx-auto">Esta sección es solo para administradores.</p>
        <Link to="/" className="btn btn-primary">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <nav className="navbar admin-top px-3">
        <button className="btn btn-outline-light d-lg-none" type="button" aria-expanded={abierto} aria-controls="admin-sidebar" onClick={() => setAbierto((v) => !v)}>
          ☰ Menú
        </button>
        <Link to="/admin" className="navbar-brand text-white m-0 mx-2 mx-lg-0">Wanderly<span className="text-warning">.</span> Admin</Link>
        <span className="text-white-50 small d-none d-md-inline ms-auto me-3">{sesion.nombre}</span>
        <button className="btn btn-sm btn-outline-light" onClick={() => { salir(); navigate("/"); }}>Salir</button>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <aside id="admin-sidebar" className={`col-12 col-lg-3 col-xl-2 admin-sidebar p-3 ${abierto ? "" : "d-none"} d-lg-block`} aria-label="Navegación administrativa">
            <ul className="nav flex-column">
              {MENU.map((m) => (
                <li className="nav-item" key={m.to}>
                  <NavLink to={m.to} end={m.end} className={({ isActive }) => `nav-link ${m.sub ? "ps-4 small" : "fw-semibold"} ${isActive ? "active" : ""}`} onClick={() => setAbierto(false)}>
                    {m.texto}
                  </NavLink>
                </li>
              ))}
              <li className="nav-item mt-3"><Link to="/" className="nav-link text-muted">← Volver a la tienda</Link></li>
            </ul>
          </aside>
          <main className="col-12 col-lg-9 col-xl-10 p-3 p-md-4" key={pathname}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
