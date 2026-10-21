import { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import MensajeError from "../components/MensajeError.jsx";
import { buscarProducto, precioFinal } from "../data/catalogo.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useTitulo } from "../hooks/useTitulo.js";
import { formatoPrecio } from "../lib/formato.js";

const REGIONES = ["Arica y Parinacota", "Valparaíso", "Metropolitana", "Maule", "Biobío", "Los Lagos", "Magallanes"];
const VACIO = { nombre: "", telefono: "", direccion: "", comuna: "", region: "", indicaciones: "", metodo: "tarjeta" };

export default function Checkout() {
  useTitulo("Checkout — Wanderly");
  const navigate = useNavigate();
  const { sesion } = useAuth();
  const { items, total, totalPersonas, confirmarCompra } = useCart();
  const [f, setF] = useState({ ...VACIO, nombre: sesion?.nombre || "" });
  const [errores, setErrores] = useState({});
  const terminado = useRef(false);
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));

  if (terminado.current) return null;
  if (!sesion) return <Navigate to="/login?next=/checkout" replace />;
  if (items.length === 0) return <Navigate to="/carrito" replace />;

  const validar = () => {
    const e = {};
    if (!/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ'’-]{2,}(\s+[A-Za-zÁÉÍÓÚÜáéíóúüÑñ'’-]+)+$/.test(f.nombre.trim())) e.nombre = "Escribe nombre y apellido.";
    if (!/^\+?\d{8,15}$/.test(f.telefono.replace(/\s+/g, ""))) e.telefono = "Teléfono de 8 a 15 dígitos.";
    if (f.direccion.trim().length < 5) e.direccion = "Indica calle y número.";
    if (f.comuna.trim().length < 3) e.comuna = "Indica la comuna.";
    if (!f.region) e.region = "Selecciona una región.";
    return e;
  };

  const pagar = (ev) => {
    ev.preventDefault();
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length) return;
    const envio = { nombre: f.nombre.trim(), telefono: f.telefono, direccion: f.direccion.trim(), comuna: f.comuna.trim(), region: f.region, indicaciones: f.indicaciones };
    // Pago simulado: la opción «tarjeta rechazada» permite probar la vista de error.
    if (f.metodo === "rechazada") return navigate("/pago-error", { state: { motivo: "Tu banco rechazó la tarjeta (simulado)." } });
    terminado.current = true;
    const resumen = items.map((i) => { const p = buscarProducto(i.id); return { id: i.id, nombre: p?.nombre || i.id, cantidad: i.cantidad, precio: precioFinal(p) }; });
    const numero = confirmarCompra(sesion, envio);
    if (!numero) { terminado.current = false; return; }
    navigate("/pago-correcto", { state: { numero, email: sesion.email, total, envio, items: resumen } });
  };

  const campo = (k, etiqueta, extra = {}) => (
    <div className={extra.col || "col-12 col-md-6"}>
      <label className="form-label" htmlFor={`k-${k}`}>{etiqueta}</label>
      <input id={`k-${k}`} className={`form-control ${errores[k] ? "is-invalid" : ""}`} value={f[k]} onChange={set(k)} aria-invalid={Boolean(errores[k])} {...extra.input} />
      <div className="invalid-feedback">{errores[k]}</div>
    </div>
  );

  return (
    <>
      <Hero etiqueta="Checkout" titulo="Dirección y datos de entrega" bajada="Completa tus datos para confirmar la compra." />
      <section className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <form onSubmit={pagar} noValidate className="card card-body shadow-sm">
              <MensajeError hayError={Object.keys(errores).length > 0} texto="Revisa los campos marcados antes de pagar." />
              <div className="row g-3">
                {campo("nombre", "Nombre completo", { input: { autoComplete: "name" } })}
                {campo("telefono", "Teléfono", { input: { type: "tel", autoComplete: "tel", placeholder: "+56 9 1234 5678" } })}
                {campo("direccion", "Dirección", { col: "col-12", input: { autoComplete: "street-address" } })}
                {campo("comuna", "Comuna")}
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="k-region">Región</label>
                  <select id="k-region" className={`form-select ${errores.region ? "is-invalid" : ""}`} value={f.region} onChange={set("region")}>
                    <option value="">Selecciona…</option>{REGIONES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                  <div className="invalid-feedback">{errores.region}</div>
                </div>
                <div className="col-12"><label className="form-label" htmlFor="k-ind">Indicaciones de entrega (opcional)</label><textarea id="k-ind" className="form-control" rows="2" value={f.indicaciones} onChange={set("indicaciones")} /></div>
                <div className="col-12">
                  <label className="form-label" htmlFor="k-metodo">Método de pago (simulado)</label>
                  <select id="k-metodo" className="form-select" value={f.metodo} onChange={set("metodo")}>
                    <option value="tarjeta">Tarjeta aprobada</option><option value="rechazada">Tarjeta rechazada (probar error)</option>
                  </select>
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
                <button type="submit" className="btn btn-primary">Pagar {formatoPrecio(total)}</button>
                <Link to="/carrito" className="btn btn-outline-secondary">Volver al carrito</Link>
              </div>
            </form>
          </div>
          <aside className="col-12 col-lg-4">
            <div className="card card-body shadow-sm">
              <h2 className="h5">Resumen ({totalPersonas} persona(s))</h2>
              <ul className="list-unstyled mb-3">
                {items.map((i) => { const p = buscarProducto(i.id); return <li key={i.id} className="d-flex justify-content-between gap-2"><span>{p.nombre} × {i.cantidad}</span><span>{formatoPrecio(precioFinal(p) * i.cantidad)}</span></li>; })}
              </ul>
              <p className="d-flex justify-content-between fw-bold m-0"><span>Total</span><span>{formatoPrecio(total)}</span></p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
