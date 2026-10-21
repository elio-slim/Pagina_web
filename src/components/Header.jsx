import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { esAdmin } from "../lib/usuarios.js";

const ENLACES = [
  { to: "/", texto: "Inicio", end: true },
  { to: "/destinos", texto: "Destinos" },
  { to: "/experiencias", texto: "Experiencias" },
  { to: "/paquetes", texto: "Paquetes" },
  { to: "/productos", texto: "Productos" },
  { to: "/categorias", texto: "Categorías" },
  { to: "/ofertas", texto: "Ofertas" },
  { to: "/blogs", texto: "Blogs" },
  { to: "/nosotros", texto: "Nosotros" },
  { to: "/contacto", texto: "Contacto", cta: true },
];

export default function Header() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { sesion, salir } = useAuth();
  const { totalPersonas } = useCart();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [consulta, setConsulta] = useState("");

  // En /buscar el campo muestra lo que se está buscando.
  useEffect(() => {
    if (pathname === "/buscar") setConsulta(new URLSearchParams(search).get("q") || "");
  }, [pathname, search]);

  // El menú móvil se cierra al navegar y con la tecla Escape.
  useEffect(() => setMenuAbierto(false), [pathname]);
  useEffect(() => {
    const alTeclear = (e) => e.key === "Escape" && setMenuAbierto(false);
    document.addEventListener("keydown", alTeclear);
    return () => document.removeEventListener("keydown", alTeclear);
  }, []);

  const buscar = (e) => {
    e.preventDefault();
    navigate(`/buscar?q=${encodeURIComponent(consulta.trim())}`);
  };

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand">
            Wanderly<span className="brand-dot">.</span>
          </Link>

          <form className="search-form" role="search" onSubmit={buscar}>
            <label htmlFor="buscador" className="visually-hidden">
              Buscar destinos y paquetes
            </label>
            <input
              type="search"
              id="buscador"
              name="q"
              placeholder="Buscar destinos, paquetes…"
              autoComplete="off"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
            />
            <button type="submit" className="search-btn" aria-label="Buscar">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
          </form>

          <div className="header-actions">
            {esAdmin(sesion) && <Link to="/admin" className="icon-link">Panel admin</Link>}
            <Link
              to={sesion ? "/carrito" : "/login"}
              className="icon-link"
              id="cuentaEnlace"
              title={sesion ? "Sesión iniciada como " + sesion.email : undefined}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
              </svg>
              <span className="icon-label" id="cuentaEtiqueta">
                {sesion ? "Hola, " + sesion.nombre.split(" ")[0] : "Ingresar"}
              </span>
            </Link>
            <button type="button" className="icon-link link-salir" id="btnSalir" hidden={!sesion} onClick={salir}>
              Salir
            </button>
            <Link
              to="/carrito"
              className="icon-link"
              id="cartLink"
              aria-label={`Carrito de compras, ${totalPersonas} ${totalPersonas === 1 ? "persona" : "personas"} en total`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 4h2.5l2.2 11h10.6l2-8H6.5" />
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="17" cy="20" r="1.4" />
              </svg>
              <span className="cart-badge" id="cartCount" data-vacio={String(totalPersonas === 0)}>
                {totalPersonas}
              </span>
            </Link>
            <button
              type="button"
              className="nav-toggle"
              id="navToggle"
              aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuAbierto}
              aria-controls="siteNav"
              onClick={() => setMenuAbierto((v) => !v)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        <div className="nav-bar">
          <nav className={"site-nav" + (menuAbierto ? " open" : "")} id="siteNav" aria-label="Navegación principal">
            {ENLACES.map((e) => (
              <NavLink key={e.to} to={e.to} end={e.end} className={e.cta ? "nav-cta" : undefined}>
                {e.texto}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
