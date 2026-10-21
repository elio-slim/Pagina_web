import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import { EXPERIENCIAS } from "../data/experiencias.js";
import { buscarProducto } from "../data/catalogo.js";
import { useTitulo } from "../hooks/useTitulo.js";

export default function Experiencias() {
  useTitulo("Experiencias — Wanderly");

  return (
    <>
      <Hero
        etiqueta="Experiencias"
        titulo="Actividades que arman el itinerario"
        bajada="Cada experiencia se puede sumar a cualquier paquete. Aquí las más pedidas."
      />

      <section className="container" aria-label="Listado de experiencias">
        {EXPERIENCIAS.map((e) => (
          <article className="exp-row" key={e.destino}>
            <img className="exp-thumb" src={buscarProducto(e.destino).imagen} alt={e.alt} width="800" height="600" loading="lazy" />
            <div>
              <span className="tag">{e.etiqueta}</span>
              <h3>{e.titulo}</h3>
              <p>{e.texto}</p>
            </div>
            <Link to={`/destinos/${e.destino}`} className="btn btn-dark">
              Ver destino
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
