import { Link, useParams } from "react-router-dom";
import VideoDestino from "../components/VideoDestino.jsx";
import { DESTINOS } from "../data/destinos.js";
import { buscarProducto } from "../data/catalogo.js";
import { formatoPrecio } from "../lib/formato.js";
import { useCart } from "../context/CartContext.jsx";
import { useTitulo } from "../hooks/useTitulo.js";

export default function DestinoDetalle() {
  const { id } = useParams();
  const { agregar } = useCart();

  // Si el destino no existe se muestra Atacama por defecto (igual que la versión HTML).
  const clave = DESTINOS[id] ? id : "atacama";
  const destino = DESTINOS[clave];
  const producto = buscarProducto(clave);

  useTitulo(`${destino.nombre} — Wanderly`);

  const otros = Object.entries(DESTINOS)
    .filter(([k]) => k !== clave)
    .slice(0, 3);

  return (
    <>
      <section className="container section-top" aria-labelledby="destino-nombre">
        <p className="kicker" id="destino-pais">
          {destino.pais}
        </p>
        <h1 id="destino-nombre">{destino.nombre}</h1>

        <figure className="dest-photo-lg">
          <img id="destino-imagen" src={destino.imagen} alt={destino.alt} width="800" height="600" />
          <figcaption id="destino-leyenda">{destino.nombre}</figcaption>
        </figure>

        <div className="split row g-4 align-items-center">
          <div>
            <p id="destino-resumen" className="lead">
              {destino.resumen}
            </p>

            <div className="meta-row">
              <div>
                <strong id="destino-dias">{destino.dias}</strong>Duración
              </div>
              <div>
                <strong id="destino-dificultad">{destino.dificultad}</strong>Dificultad
              </div>
            </div>

            <h2 className="h3">Qué incluye</h2>
            <ul id="destino-incluye" className="incluye-list">
              {destino.incluye.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="buy-box">
              <p className="price-line">
                <strong id="destino-precio">{producto ? formatoPrecio(producto.precio) : "—"}</strong> <small>por persona</small>
              </p>
              <button type="button" className="btn btn-primary" id="btn-agregar" onClick={() => agregar(clave)}>
                Agregar al carrito
              </button>
            </div>

            <Link to={`/paquetes?destino=${encodeURIComponent(clave)}#reserva`} className="btn btn-dark mt-sm">
              Pedir una cotización a medida
            </Link>
          </div>

          <div>
            <h2 className="h3">Video del destino</h2>
            <VideoDestino destino={destino} />
          </div>
        </div>
      </section>

      <section className="container" aria-labelledby="otros-titulo">
        <div className="section-head">
          <div>
            <p className="kicker">Sigue explorando</p>
            <h2 id="otros-titulo">Otros destinos que te pueden interesar</h2>
          </div>
          <Link to="/destinos" className="btn btn-dark">
            Ver todos
          </Link>
        </div>
        <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3" id="otros-destinos">
          {otros.map(([k, d]) => (
            <article className="dest-card" key={k}>
              <figure className="dest-photo">
                <img src={d.imagen} alt={d.alt} width="800" height="600" loading="lazy" />
                <figcaption>{d.nombre}</figcaption>
              </figure>
              <div className="dest-body">
                <p className="country">{d.pais}</p>
                <Link to={`/destinos/${k}`} className="link">
                  Ver destino
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
