import Hero from "../components/Hero.jsx";
import ListaProductos from "../components/ListaProductos.jsx";
import { DESCUENTOS, obtenerProductos } from "../data/catalogo.js";
import { useTitulo } from "../hooks/useTitulo.js";

export default function Ofertas() {
  useTitulo("Ofertas — Wanderly");
  const enOferta = obtenerProductos().filter((p) => DESCUENTOS[p.id]);
  return (
    <>
      <Hero etiqueta="Ofertas" titulo="Viajes con descuento" bajada="Precios rebajados por tiempo limitado." />
      <section className="container py-4"><ListaProductos productos={enOferta} vacio="Por ahora no hay ofertas vigentes." /></section>
    </>
  );
}
