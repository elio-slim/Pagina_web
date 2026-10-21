/** Reproductor de YouTube (modo sin cookies) o, si no hay video, un enlace para buscarlo. */
export default function VideoDestino({ destino, titulo }) {
  const { videoId, nombre, pais } = destino;

  if (videoId) {
    return (
      <>
        <div className="video-wrap">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={titulo || `Video de ${nombre}`}
            allow="accelerometer; encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <p className="video-fallback">
          ¿No carga?{" "}
          <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
            Míralo en YouTube
          </a>
          .
        </p>
      </>
    );
  }

  const consulta = encodeURIComponent(`${nombre} ${pais} viaje`);
  return (
    <p className="video-fallback">
      Aún no tenemos video de este destino.{" "}
      <a href={`https://www.youtube.com/results?search_query=${consulta}`} target="_blank" rel="noopener noreferrer">
        Buscar videos de {nombre} en YouTube
      </a>
      .
    </p>
  );
}
