/**
 * destino-detalle.js
 * Lee el parámetro ?destino= de la URL y pinta el contenido correspondiente
 * (foto, resumen, qué incluye, video y otros destinos sugeridos).
 * Si no hay parámetro o no coincide con ninguno, muestra Atacama por defecto.
 *
 * VIDEOS: pega en `videoId` el ID del video de YouTube (lo que va después de
 * "v=" en la URL). Mientras esté en null, la página muestra un enlace para
 * buscar videos del destino en YouTube en lugar del reproductor.
 */

const DESTINOS = {
  atacama: {
    nombre: "San Pedro de Atacama",
    pais: "Chile",
    imagen: "img/atacama.svg",
    alt: "Cielo estrellado sobre dunas y el volcán Licancabur, ilustración de San Pedro de Atacama",
    resumen:
      "El desierto más árido del mundo, con salares, géiseres y cielos que se usan para observación astronómica profesional.",
    dias: "4 días / 3 noches",
    dificultad: "Baja a media",
    incluye: ["Alojamiento boutique", "Tour Valle de la Luna", "Observación de estrellas", "Traslados"],
    videoId: "hESQ4ppRqjs",
  },
  "valle-sagrado": {
    nombre: "Valle Sagrado",
    pais: "Perú",
    imagen: "img/valle-sagrado.svg",
    alt: "Terrazas circulares de Moray con montañas nevadas al fondo, ilustración del Valle Sagrado",
    resumen:
      "Un recorrido por Cusco, las terrazas de Moray y las salineras de Maras, cerrando con Machu Picchu en tren.",
    dias: "5 días / 4 noches",
    dificultad: "Media",
    incluye: ["Tren a Machu Picchu", "Guía certificado", "Hospedaje en Cusco", "Desayunos diarios"],
    videoId: null,
  },
  chiloe: {
    nombre: "Chiloé",
    pais: "Chile",
    imagen: "img/chiloe.svg",
    alt: "Palafitos de colores sobre el mar, ilustración de Chiloé",
    resumen:
      "Palafitos, iglesias patrimonio de la UNESCO y curanto preparado al hoyo en comunidades locales.",
    dias: "3 días / 2 noches",
    dificultad: "Baja",
    incluye: ["Ruta de palafitos", "Curanto tradicional", "Visita a Parque Tantauco"],
    videoId: null,
  },
  bariloche: {
    nombre: "Bariloche",
    pais: "Argentina",
    imagen: "img/bariloche.svg",
    alt: "Lago con montañas nevadas y pinos, ilustración de Bariloche",
    resumen:
      "Circuito de siete lagos, chocolatería artesanal y trekking de dificultad media en plena Patagonia andina.",
    dias: "4 días / 3 noches",
    dificultad: "Media",
    incluye: ["Circuito Chico", "Tour de chocolate", "Trekking Cerro Campanario"],
    videoId: null,
  },
  cartagena: {
    nombre: "Cartagena",
    pais: "Colombia",
    imagen: "img/cartagena.svg",
    alt: "Casas coloniales de colores frente al mar al atardecer, ilustración de Cartagena",
    resumen:
      "Ciudad amurallada, atardeceres desde el Café del Mar y playas cercanas en las Islas del Rosario.",
    dias: "4 días / 3 noches",
    dificultad: "Baja",
    incluye: ["City tour por el centro histórico", "Día de playa en Islas del Rosario", "Clase de salsa"],
    videoId: null,
  },
  "torres-del-paine": {
    nombre: "Torres del Paine",
    pais: "Chile",
    imagen: "img/torres-del-paine.svg",
    alt: "Tres torres de granito sobre un lago turquesa, ilustración de Torres del Paine",
    resumen:
      "Versión corta del circuito W: los miradores más icónicos del parque sin necesidad de acampar varios días.",
    dias: "5 días / 4 noches",
    dificultad: "Alta",
    incluye: ["Refugios con pensión completa", "Guía de montaña", "Traslados desde Puerto Natales"],
    videoId: null,
  },
};

function obtenerParametro(nombre) {
  return new URLSearchParams(window.location.search).get(nombre);
}

function pintarVideo(destino) {
  const contenedor = document.getElementById("video-contenedor");
  const iframe = document.getElementById("destino-video");
  const enlace = document.getElementById("video-enlace");

  if (destino.videoId) {
    iframe.src = `https://www.youtube-nocookie.com/embed/${destino.videoId}`;
    iframe.title = `Video de ${destino.nombre}`;
    contenedor.hidden = false;
    enlace.innerHTML = `¿No carga? <a href="https://www.youtube.com/watch?v=${destino.videoId}" target="_blank" rel="noopener">Míralo en YouTube</a>.`;
  } else {
    iframe.removeAttribute("src");
    contenedor.hidden = true;
    const consulta = encodeURIComponent(`${destino.nombre} ${destino.pais} viaje`);
    enlace.innerHTML = `Aún no tenemos video de este destino. <a href="https://www.youtube.com/results?search_query=${consulta}" target="_blank" rel="noopener">Buscar videos de ${destino.nombre} en YouTube</a>.`;
  }
}

function pintarOtros(claveActual) {
  const cont = document.getElementById("otros-destinos");
  cont.innerHTML = "";
  Object.entries(DESTINOS)
    .filter(([clave]) => clave !== claveActual)
    .slice(0, 3)
    .forEach(([clave, d]) => {
      const art = document.createElement("article");
      art.className = "dest-card";
      art.innerHTML = `
        <figure class="dest-photo">
          <img src="${d.imagen}" alt="${d.alt}" width="800" height="600" loading="lazy" />
          <figcaption>${d.nombre}</figcaption>
        </figure>
        <div class="dest-body">
          <p class="country">${d.pais}</p>
          <a href="destino-detalle.html?destino=${clave}" class="link">Ver destino</a>
        </div>`;
      cont.appendChild(art);
    });
}

function pintarDestino(clave, destino) {
  document.getElementById("destino-nombre").textContent = destino.nombre;
  document.getElementById("destino-pais").textContent = destino.pais;
  document.getElementById("destino-resumen").textContent = destino.resumen;
  document.getElementById("destino-dias").textContent = destino.dias;
  document.getElementById("destino-dificultad").textContent = destino.dificultad;
  document.getElementById("destino-leyenda").textContent = destino.nombre;
  document.title = `${destino.nombre} — Wanderly`;

  const img = document.getElementById("destino-imagen");
  img.src = destino.imagen;
  img.alt = destino.alt;

  const lista = document.getElementById("destino-incluye");
  lista.innerHTML = "";
  destino.incluye.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li);
  });

  document.getElementById("link-reserva").href = `paquetes.html?destino=${encodeURIComponent(clave)}#reserva`;

  pintarVideo(destino);
  pintarOtros(clave);
}

document.addEventListener("DOMContentLoaded", () => {
  const pedida = obtenerParametro("destino");
  const clave = DESTINOS[pedida] ? pedida : "atacama";
  pintarDestino(clave, DESTINOS[clave]);
});
