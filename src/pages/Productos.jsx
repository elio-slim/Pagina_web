import { useMemo, useState } from "react";
import Hero from "../components/Hero.jsx";
import ListaProductos from "../components/ListaProductos.jsx";
import { obtenerProductos, precioFinal } from "../data/catalogo.js";
import { useTitulo } from "../hooks/useTitulo.js";

export default function Productos() {
  useTitulo("Productos — Wanderly");
  const productos = obtenerProductos();
  const [tipo, setTipo] = useState("todos");
  const [orden, setOrden] = useState("destacado");
  const lista = useMemo(() => {
    const base = tipo === "todos" ? productos : productos.filter((p) => p.tipo === tipo);
    if (orden === "menor") return [...base].sort((a, b) => precioFinal(a) - precioFinal(b));
    if (orden === "mayor") return [...base].sort((a, b) => precioFinal(b) - precioFinal(a));
    return base;
  }, [tipo, orden, productos]);
  return (
    <>
      <Hero etiqueta="Tienda" titulo="Todos nuestros viajes" bajada="Destinos y paquetes en un solo lugar. Filtra y ordena como prefieras." />
      <section className="container py-4" aria-label="Listado de productos">
        <div className="row g-2 mb-4 align-items-end">
          <div className="col-12 col-sm-6 col-md-4">
            <label className="form-label" htmlFor="f-tipo">Tipo</label>
            <select id="f-tipo" className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="todos">Todos</option><option value="Destino">Destinos</option><option value="Paquete">Paquetes</option>
            </select>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <label className="form-label" htmlFor="f-orden">Ordenar por</label>
            <select id="f-orden" className="form-select" value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="destacado">Destacados</option><option value="menor">Precio: menor a mayor</option><option value="mayor">Precio: mayor a menor</option>
            </select>
          </div>
          <p className="col-12 col-md-4 text-md-end text-muted m-0" role="status">{lista.length} producto(s)</p>
        </div>
        <ListaProductos productos={lista} />
      </section>
    </>
  );
}
