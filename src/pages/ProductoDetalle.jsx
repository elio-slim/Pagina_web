import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import SelectorCantidad from "../components/SelectorCantidad.jsx";
import Boton from "../components/Boton.jsx";
import { DESCUENTOS, buscarProducto, precioFinal } from "../data/catalogo.js";
import { useCart } from "../context/CartContext.jsx";
import { useTitulo } from "../hooks/useTitulo.js";
import { formatoPrecio } from "../lib/formato.js";

export default function ProductoDetalle() {
  const { id } = useParams();
  const p = buscarProducto(id);
  const { agregar } = useCart();
  const [personas, setPersonas] = useState(1);
  useTitulo(p ? `${p.nombre} — Wanderly` : "Producto no encontrado — Wanderly");

  if (!p) {
    return (
      <section className="container py-5 text-center">
        <h1>Producto no encontrado</h1>
        <Link to="/productos" className="btn btn-primary">Ver productos</Link>
      </section>
    );
  }
  const dcto = DESCUENTOS[p.id];
  return (
    <>
      <Hero etiqueta={p.tipo} titulo={p.nombre} bajada={p.resumen} />
      <section className="container py-4">
        <div className="row g-4 align-items-start">
          <div className="col-12 col-md-6"><img className="img-fluid rounded w-100" src={p.imagen} alt={p.alt} width="800" height="600" /></div>
          <div className="col-12 col-md-6">
            <p className="mb-1 text-muted">{p.pais} · {p.duracion}</p>
            <p className="fs-3 mb-1">
              <strong>{formatoPrecio(precioFinal(p))}</strong> <small className="text-muted">por persona</small>
              {dcto && <span className="badge text-bg-danger ms-2">-{dcto}%</span>}
            </p>
            {dcto && <p className="text-muted text-decoration-line-through">{formatoPrecio(p.precio)}</p>}
            <p>{p.resumen}</p>
            <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
              <SelectorCantidad onChange={setPersonas} />
              <Boton label={`Agregar ${personas} al carrito`} onClick={() => { for (let i = 0; i < personas; i++) agregar(p.id); }} />
            </div>
            <Link to="/productos" className="link">← Volver a productos</Link>
            {p.tipo === "Destino" && <> · <Link to={p.url} className="link">Ver ficha del destino</Link></>}
          </div>
        </div>
      </section>
    </>
  );
}
