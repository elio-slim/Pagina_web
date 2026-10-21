import { Link } from "react-router-dom";
import { formatoPrecio } from "../lib/formato.js";
import { DESCUENTOS, precioFinal } from "../data/catalogo.js";
import { useCart } from "../context/CartContext.jsx";

/** Tarjeta de producto (destino o paquete) con precio y botón de carrito. Usada en Destinos y Buscador. */
export default function ProductoCard({ producto: p, mostrarTipo = false }) {
  const { agregar } = useCart();
  return (
    <article className="dest-card h-100">
      <figure className="dest-photo">
        <img src={p.imagen} alt={p.alt} width="800" height="600" loading="lazy" />
        <figcaption>{p.nombre}</figcaption>
      </figure>
      <div className="dest-body">
        <p className="country">
          {mostrarTipo && <span className="tag-chip">{p.tipo}</span>} {p.pais}
        </p>
        <p>{p.resumen}</p>
        <p className="price-line">
          <strong>{formatoPrecio(precioFinal(p))}</strong>{DESCUENTOS[p.id] && <> <s className="text-muted small">{formatoPrecio(p.precio)}</s> <span className="badge text-bg-danger">-{DESCUENTOS[p.id]}%</span></>} <small>por persona</small>
        </p>
        <div className="dest-actions">
          <Link to={`/productos/${p.id}`} className="link">
            Ver detalle
          </Link>
          <button type="button" className="btn btn-dark btn-sm" onClick={() => agregar(p.id)}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}
