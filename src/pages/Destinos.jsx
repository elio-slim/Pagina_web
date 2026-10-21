import { useMemo, useState } from "react";
import Hero from "../components/Hero.jsx";
import ListaProductos from "../components/ListaProductos.jsx";
import { obtenerProductos } from "../data/catalogo.js";
import { useTitulo } from "../hooks/useTitulo.js";

export default function Destinos() {
  useTitulo("Destinos — Wanderly");
  const destinos = obtenerProductos().filter((p) => p.tipo === "Destino");
  const paises = [...new Set(destinos.map((d) => d.pais))];
  const [filtro, setFiltro] = useState("todos");
  const [anunciar, setAnunciar] = useState(false); // el mensaje de estado aparece al usar el filtro

  const visibles = useMemo(() => (filtro === "todos" ? destinos : destinos.filter((d) => d.pais === filtro)), [filtro, destinos]);

  const elegir = (valor) => {
    setFiltro(valor);
    setAnunciar(true);
  };

  const mensaje = !anunciar
    ? ""
    : filtro === "todos"
      ? `Mostrando los ${visibles.length} destinos.`
      : `Mostrando ${visibles.length} destino(s) en ${filtro}.`;

  return (
    <>
      <Hero
        etiqueta="Destinos"
        titulo="Elige el mapa, nosotros armamos el camino"
        bajada="Seis destinos curados a mano. Cada uno con al menos dos experiencias y un paquete asociado."
      />

      <section className="container" aria-label="Listado de destinos">
        <div className="filtros" role="group" aria-label="Filtrar destinos por país">
          {["todos", ...paises].map((valor) => (
            <button key={valor} type="button" className="chip" aria-pressed={filtro === valor} onClick={() => elegir(valor)}>
              {valor === "todos" ? "Todos" : valor}
            </button>
          ))}
        </div>
        <p className="hint" id="filtro-estado" role="status" aria-live="polite">
          {mensaje}
        </p>

        <div id="lista-destinos"><ListaProductos productos={visibles} mostrarTipo={false} /></div>
      </section>
    </>
  );
}
