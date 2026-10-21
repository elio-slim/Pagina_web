import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import { useTitulo } from "../hooks/useTitulo.js";

export default function NoEncontrada() {
  useTitulo("Página no encontrada — Wanderly");
  return (
    <>
      <Hero etiqueta="Error 404" titulo="Esta ruta no está en el mapa" bajada="La página que buscas no existe o se movió de lugar." />
      <section className="container" aria-label="Página no encontrada">
        <div className="empty-state">
          <p>
            <Link to="/" className="btn btn-primary">
              Volver al inicio
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
