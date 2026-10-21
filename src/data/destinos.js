/**
 * destinos.js
 * Datos de la ficha de cada destino (ruta /destinos/:id).
 *
 * VIDEOS: pega en `videoId` el ID del video de YouTube (lo que va después de
 * "v=" en la URL). Mientras esté en null, la página muestra un enlace para
 * buscar videos del destino en YouTube en lugar del reproductor.
 */

export const DESTINOS = {
  atacama: {
    nombre: "San Pedro de Atacama",
    pais: "Chile",
    imagen: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Atacama_Desert_(13340986003).jpg?width=1400",
    alt: "Cielo estrellado sobre dunas y el volcán Licancabur, San Pedro de Atacama",
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
    imagen: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sacred_Valley_(around_Pisaq),_Peru.jpg?width=1400",
    alt: "Terrazas circulares de Moray con montañas nevadas al fondo, Valle Sagrado",
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
    imagen: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Palafitos_Chiloe.jpg?width=1400",
    alt: "Palafitos de colores sobre el mar, Chiloé",
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
    imagen: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lago_Nahuel_Huapi.jpg?width=1400",
    alt: "Lago con montañas nevadas y pinos, Bariloche",
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
    imagen: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cartagena_Old_City.JPG?width=1400",
    alt: "Casas coloniales de colores frente al mar al atardecer, Cartagena",
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
    imagen: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Torres-del-paine.jpg?width=1400",
    alt: "Tres torres de granito sobre un lago turquesa, Torres del Paine",
    resumen:
      "Versión corta del circuito W: los miradores más icónicos del parque sin necesidad de acampar varios días.",
    dias: "5 días / 4 noches",
    dificultad: "Alta",
    incluye: ["Refugios con pensión completa", "Guía de montaña", "Traslados desde Puerto Natales"],
    videoId: null,
  },
};
