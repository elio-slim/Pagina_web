/** Cabecera compacta de las páginas internas. */
export default function Hero({ etiqueta, titulo, bajada }) {
  return (
    <section className="hero hero-compact" aria-labelledby="titulo-pagina">
      <div className="container">
        <p className="hero-eyebrow">{etiqueta}</p>
        <h1 id="titulo-pagina">{titulo}</h1>
        <p className="lead">{bajada}</p>
      </div>
    </section>
  );
}
