import { Link } from "react-router-dom";
import { buscarProducto } from "../data/catalogo.js";
import { useTitulo } from "../hooks/useTitulo.js";

const DESTACADOS = [
  { id: "atacama", texto: "Cielos despejados, salares y una calma que no encuentras en la ciudad." },
  { id: "valle-sagrado", texto: "Terrazas incas, mercados vivos y el camino lento hacia Machu Picchu." },
  { id: "chiloe", texto: "Palafitos, mitología local y la costa más verde del sur." },
];

const CIFRAS = [
  { num: "120+", etiqueta: "Itinerarios diseñados" },
  { num: "18", etiqueta: "Países cubiertos" },
  { num: "4.9", etiqueta: "Valoración promedio" },
  { num: "3", etiqueta: "Personas en el equipo" },
];

export default function Inicio() {
  useTitulo("Wanderly — Viajes diseñados a tu manera");

  return (
    <>
      <section className="hero" aria-labelledby="hero-titulo">
        <div className="hero-inner">
          <div>
            <p className="hero-eyebrow">Wanderly · Agencia de viajes</p>
            <h1 id="hero-titulo">Viajes que empiezan con una pregunta, no con un folleto.</h1>
            <p className="lead">
              Diseñamos itinerarios a partir de lo que realmente te mueve: comida callejera, senderismo, arquitectura o simplemente
              perderte bien. Tú eliges el rumbo, nosotros el mapa.
            </p>
            <div className="hero-actions">
              <Link to="/paquetes" className="btn btn-primary">
                Ver paquetes
              </Link>
              <Link to="/destinos" className="btn btn-outline">
                Explorar destinos
              </Link>
            </div>
          </div>
          <figure className="postcard" data-stamp="WANDERLY">
            <img
              src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Atacama_Desert_(13340986003).jpg?width=1200"
              alt="Paisaje real del desierto de Atacama, Chile"
              width="640"
              height="800"
            />
          </figure>
        </div>
      </section>

      <section className="container" aria-labelledby="destacados-titulo">
        <div className="section-head">
          <div>
            <p className="kicker">Destinos destacados</p>
            <h2 id="destacados-titulo">A dónde te llevamos este trimestre</h2>
          </div>
          <Link to="/destinos" className="btn btn-dark">
            Ver todos
          </Link>
        </div>

        <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
          {DESTACADOS.map(({ id, texto }) => {
            const p = buscarProducto(id);
            return (
              <article className="dest-card" key={id}>
                <figure className="dest-photo">
                  <img src={p.imagen} alt={p.alt} width="800" height="600" loading="lazy" />
                  <figcaption>{p.nombre}</figcaption>
                </figure>
                <div className="dest-body">
                  <p className="country">{p.pais}</p>
                  <p>{texto}</p>
                  <Link to={p.url} className="link">
                    Ver destino
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container" aria-label="Wanderly en cifras">
        <div className="stat-row">
          {CIFRAS.map((c) => (
            <div key={c.etiqueta}>
              <p className="num">{c.num}</p>
              <p className="label">{c.etiqueta}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container" aria-labelledby="video-titulo">
        <div className="split row g-4 align-items-center">
          <div>
            <p className="kicker">Míralo antes de decidir</p>
            <h2 id="video-titulo">Así se ve el desierto más árido del mundo</h2>
            <p>
              Un vistazo a San Pedro de Atacama, uno de nuestros destinos más pedidos: géiseres, salares y noches con el cielo más
              limpio del hemisferio sur.
            </p>
            <Link to="/destinos/atacama" className="btn btn-dark">
              Ver el destino completo
            </Link>
          </div>
          <div>
            <div className="video-wrap">
              <iframe
                src="https://www.youtube-nocookie.com/embed/hESQ4ppRqjs"
                title="Video: qué hacer en San Pedro de Atacama"
                allow="accelerometer; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <p className="video-fallback">
              ¿No carga?{" "}
              <a href="https://www.youtube.com/watch?v=hESQ4ppRqjs" target="_blank" rel="noopener noreferrer">
                Míralo en YouTube
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="container" aria-labelledby="como-titulo">
        <div className="split row g-4 align-items-center">
          <div>
            <p className="kicker">Cómo trabajamos</p>
            <h2 id="como-titulo">Menos catálogo, más conversación</h2>
            <p>
              No vendemos paquetes cerrados armados por otros. Cada propuesta parte de una llamada corta donde entendemos tu ritmo de
              viaje, tu presupuesto y qué te saca de tu zona de confort.
            </p>
            <p>Desde ahí armamos un itinerario editable, con alternativas claras y sin letra chica.</p>
            <Link to="/nosotros" className="btn btn-dark">
              Conoce al equipo
            </Link>
          </div>
          <figure className="map-figure">
            <img src="/img/mapa-ruta.svg" alt="Mapa ilustrado con la ruta que une los seis destinos de Wanderly" width="800" height="450" loading="lazy" />
            <figcaption>La ruta que une nuestros seis destinos</figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
