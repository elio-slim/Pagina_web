import { Link, useParams } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import { BLOGS } from "../data/blogs.js";
import { useTitulo } from "../hooks/useTitulo.js";

export function Blogs() {
  useTitulo("Blog — Wanderly");
  return (
    <>
      <Hero etiqueta="Blog" titulo="Historias y consejos de viaje" bajada="Guías prácticas escritas por el equipo." />
      <section className="container py-4">
        <div className="row g-4">
          {BLOGS.map((b) => (
            <div className="col-12 col-md-6" key={b.id}>
              <article className="card h-100 shadow-sm">
                <img className="card-img-top" src={b.imagen} alt={b.alt} width="800" height="600" loading="lazy" />
                <div className="card-body d-flex flex-column">
                  <small className="text-muted">{new Date(b.fecha + "T12:00:00").toLocaleDateString("es-CL")} · {b.autor}</small>
                  <h2 className="h4 mt-1">{b.titulo}</h2>
                  <p>{b.resumen}</p>
                  <Link to={`/blogs/${b.id}`} className="btn btn-dark mt-auto align-self-start">Leer blog {b.id}</Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function BlogDetalle() {
  const { id } = useParams();
  const b = BLOGS.find((x) => x.id === id);
  useTitulo(b ? `${b.titulo} — Wanderly` : "Blog no encontrado — Wanderly");
  if (!b) return <section className="container py-5 text-center"><h1>Blog no encontrado</h1><Link to="/blogs" className="btn btn-primary">Ver blogs</Link></section>;
  return (
    <>
      <Hero etiqueta={`Blog ${b.id}`} titulo={b.titulo} bajada={`${b.autor} · ${new Date(b.fecha + "T12:00:00").toLocaleDateString("es-CL")}`} />
      <article className="container py-4">
        <div className="row justify-content-center"><div className="col-12 col-lg-8">
          <img className="img-fluid rounded mb-4 w-100" src={b.imagen} alt={b.alt} width="800" height="600" />
          {b.parrafos.map((t, i) => <p key={i} className="fs-5">{t}</p>)}
          <Link to="/blogs" className="link">← Volver al blog</Link>
        </div></div>
      </article>
    </>
  );
}
