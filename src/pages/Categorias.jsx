import { Link, useParams } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import ListaProductos from "../components/ListaProductos.jsx";
import { buscarProducto, obtenerProductos } from "../data/catalogo.js";
import { obtenerCategorias } from "../lib/adminStore.js";
import { useTitulo } from "../hooks/useTitulo.js";

/** Vista general de categorías. */
export function Categorias() {
  useTitulo("Categorías — Wanderly");
  const cats = obtenerCategorias();
  return (
    <>
      <Hero etiqueta="Categorías" titulo="Explora por tipo de viaje" bajada="Elige la categoría que mejor se parece a lo que buscas." />
      <section className="container py-4">
        <div className="row g-4">
          {cats.map((c) => (
            <div className="col-12 col-sm-6 col-lg-4" key={c.slug}>
              <Link to={`/categorias/${c.slug}`} className="card h-100 text-decoration-none shadow-sm">
                <div className="card-body">
                  <h2 className="h5">{c.nombre}</h2>
                  <p className="text-muted">{c.descripcion}</p>
                  <span className="badge text-bg-dark">{obtenerProductos().filter((p) => p.categoria === c.slug || c.ids.includes(p.id)).length} producto(s)</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/** Vista de una categoría individual. */
export function CategoriaDetalle() {
  const { slug } = useParams();
  const cat = obtenerCategorias().find((c) => c.slug === slug);
  useTitulo(cat ? `${cat.nombre} — Wanderly` : "Categoría no encontrada — Wanderly");
  if (!cat) return <section className="container py-5 text-center"><h1>Categoría no encontrada</h1><Link to="/categorias" className="btn btn-primary">Ver categorías</Link></section>;
  return (
    <>
      <Hero etiqueta="Categoría" titulo={cat.nombre} bajada={cat.descripcion} />
      <section className="container py-4">
        <ListaProductos productos={obtenerProductos().filter((p) => p.categoria === cat.slug || cat.ids.includes(p.id))} vacio="Esta categoría todavía no tiene productos." />
        <p className="mt-4"><Link to="/categorias" className="link">← Todas las categorías</Link></p>
      </section>
    </>
  );
}
