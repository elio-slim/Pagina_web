import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import ProductoCard from "../components/ProductoCard.jsx";
import { buscarProductos } from "../lib/buscador.js";
import { useTitulo } from "../hooks/useTitulo.js";

export default function Buscar() {
  useTitulo("Buscar — Wanderly");
  const [params] = useSearchParams();
  const consulta = params.get("q") || "";
  const [orden, setOrden] = useState("relevancia");

  const resultados = useMemo(() => {
    const lista = buscarProductos(consulta);
    if (orden === "precio-asc") lista.sort((a, b) => a.p.precio - b.p.precio);
    else if (orden === "precio-desc") lista.sort((a, b) => b.p.precio - a.p.precio);
    else lista.sort((a, b) => b.s - a.s);
    return lista;
  }, [consulta, orden]);

  const q = consulta.trim();
  const estado =
    q === ""
      ? `Mostrando todo el catálogo (${resultados.length} productos).`
      : resultados.length > 0
        ? `${resultados.length} resultado(s) para «${q}».`
        : `No encontramos resultados para «${q}».`;

  return (
    <>
      <Hero etiqueta="Buscador" titulo="Resultados de búsqueda" bajada="Encuentra destinos y paquetes por nombre, país o tipo de viaje." />

      <section className="container" aria-label="Resultados">
        <div className="results-bar">
          <p id="resultados-estado" role="status" aria-live="polite">
            {estado}
          </p>
          <div>
            <label htmlFor="orden">Ordenar por </label>
            <select id="orden" value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>

        <div className="row g-4 list-unstyled" id="resultados">
          {resultados.map((r) => (
            <div className="col-12 col-md-6 col-lg-4" key={r.p.id}><ProductoCard producto={r.p} mostrarTipo /></div>
          ))}
        </div>

        {resultados.length === 0 && (
          <div className="empty-state" id="sin-resultados">
            <h2>No encontramos coincidencias</h2>
            <p>Prueba con otro nombre, país o tipo de viaje, por ejemplo «desierto», «Chile» o «trekking».</p>
            <p>
              <Link to="/destinos" className="btn btn-dark">
                Ver todos los destinos
              </Link>
            </p>
          </div>
        )}
      </section>
    </>
  );
}
