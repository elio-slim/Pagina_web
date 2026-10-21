import { Link, useNavigate } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import SelectorCantidad from "../components/SelectorCantidad.jsx";
import { buscarProducto, precioFinal } from "../data/catalogo.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useTitulo } from "../hooks/useTitulo.js";
import { formatoPrecio } from "../lib/formato.js";

export default function Carrito() {
  useTitulo("Carrito — Wanderly");
  const navigate = useNavigate();
  const { sesion } = useAuth();
  const { items, totalPersonas, total, cambiarCantidad, quitar, vaciar } = useCart();

  const finalizar = () => navigate(sesion ? "/checkout" : "/login?next=/checkout");

  return (
    <>
      <Hero etiqueta="Carrito de compras" titulo="Tu carrito" bajada="Ajusta el número de personas de cada viaje y continúa al checkout." />
      <section className="container py-4" aria-label="Contenido del carrito">
        {items.length === 0 ? (
          <div className="text-center py-5" id="carrito-vacio">
            <h2>Tu carrito está vacío</h2>
            <p className="mx-auto">Explora los productos y agrega el viaje que más te llame la atención.</p>
            <Link to="/productos" className="btn btn-primary">Ver productos</Link>
          </div>
        ) : (
          <div className="row g-4" id="carrito-contenido">
            <div className="col-12 col-lg-8">
              <ul className="list-unstyled d-grid gap-3 m-0" id="carrito-lista">
                {items.map((item) => {
                  const p = buscarProducto(item.id);
                  return (
                    <li className="card shadow-sm" key={item.id}>
                      <div className="row g-0 align-items-center">
                        <div className="col-4 col-md-3"><img className="img-fluid rounded-start w-100" src={p.imagen} alt={p.alt} width="800" height="600" loading="lazy" /></div>
                        <div className="col-8 col-md-5 p-3">
                          <span className="tag-chip">{p.tipo}</span>
                          <h3 className="h6 mt-1"><Link to={`/productos/${p.id}`}>{p.nombre}</Link></h3>
                          <p className="small text-muted mb-1">{p.duracion} · {formatoPrecio(precioFinal(p))} por persona</p>
                          <button type="button" className="link-btn" onClick={() => quitar(p.id)}>Quitar</button>
                        </div>
                        <div className="col-12 col-md-4 p-3 d-flex flex-md-column align-items-center justify-content-between gap-2">
                          <SelectorCantidad key={item.cantidad} inicial={item.cantidad} onChange={(n) => cambiarCantidad(p.id, n)} />
                          <strong>{formatoPrecio(precioFinal(p) * item.cantidad)}</strong>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-3"><button type="button" className="link-btn" id="btn-vaciar" onClick={vaciar}>Vaciar carrito</button></p>
            </div>
            <aside className="col-12 col-lg-4" aria-labelledby="resumen-titulo">
              <div className="card card-body shadow-sm">
                <h2 id="resumen-titulo" className="h5">Resumen</h2>
                <p className="d-flex justify-content-between"><span>Personas en total</span><span id="resumen-personas">{totalPersonas}</span></p>
                <p className="d-flex justify-content-between fw-bold"><span>Total</span><span id="resumen-total">{formatoPrecio(total)}</span></p>
                <button type="button" className="btn btn-primary w-100" id="btn-finalizar" onClick={finalizar}>Ir al checkout</button>
              </div>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
