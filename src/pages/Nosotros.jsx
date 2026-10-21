import Hero from "../components/Hero.jsx";
import { useTitulo } from "../hooks/useTitulo.js";

const EQUIPO = [
  { nombre: "Victor Gomez", rol: "Estructura y contenido HTML, arquitectura de páginas y navegación.", avatar: "/img/equipo-1.svg", alt: "Avatar ilustrado de Integrante 1" },
  { nombre: "Elio Millan", rol: "Diseño visual, hoja de estilos CSS y responsividad.", avatar: "/img/equipo-2.svg", alt: "Avatar ilustrado de Integrante 2" },
  { nombre: "Ramses Escalona", rol: "Lógica en JavaScript: validaciones, componentes dinámicos y control de versiones.", avatar: "/img/equipo-3.svg", alt: "Avatar ilustrado de Integrante 3" },
];

export default function Nosotros() {
  useTitulo("Nosotros — Wanderly");

  return (
    <>
      <Hero
        etiqueta="Nosotros"
        titulo="Tres personas, un mapa lleno de notas"
        bajada="Wanderly nació como proyecto de curso y se convirtió en la forma en que nos gustaría viajar a nosotros mismos."
      />

      <section className="container" aria-labelledby="historia-titulo">
        <div className="split row g-4 align-items-center">
          <div>
            <p className="kicker">Nuestra historia</p>
            <h2 id="historia-titulo">De un trabajo de equipo a una idea real</h2>
            <p>
              Empezamos como un equipo de tres compañeros armando el frontend de una tienda online para un ramo de desarrollo
              fullstack. En el camino nos dimos cuenta de que lo que más nos gustaba resolver era la experiencia de planificar un
              viaje, así que Wanderly terminó siendo eso: un sitio pensado para que elegir un destino se sienta menos como comprar y
              más como planear con amigos.
            </p>
          </div>
          <figure className="map-figure">
            <img src="/img/mapa-ruta.svg" alt="Mapa ilustrado con la ruta que une los seis destinos de Wanderly" width="800" height="450" loading="lazy" />
            <figcaption>Mapa del recorrido</figcaption>
          </figure>
        </div>
      </section>

      <section className="container" aria-labelledby="equipo-titulo">
        <div className="section-head">
          <div>
            <p className="kicker">Equipo</p>
            <h2 id="equipo-titulo">Quiénes arman Wanderly</h2>
          </div>
        </div>

        <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-3">
          {EQUIPO.map((m) => (
            <article className="team-card" key={m.nombre}>
              <figure className="team-photo">
                <img src={m.avatar} alt={m.alt} width="400" height="400" loading="lazy" />
              </figure>
              <h3>{m.nombre}</h3>
              <p>{m.rol}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
