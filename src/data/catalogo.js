/**
 * catalogo.js
 * Catálogo de productos de la tienda Wanderly (destinos y paquetes).
 * Es la única fuente de precios: el buscador, el carrito y las fichas de
 * destino leen de aquí. Los precios son ficticios (proyecto académico) y
 * están en pesos chilenos (CLP) por persona.
 */

export const PRODUCTOS = [
  {
    id: "atacama", tipo: "Destino", nombre: "San Pedro de Atacama", pais: "Chile", precio: 520000,
    duracion: "4 días / 3 noches", imagen: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Atacama_Desert_(13340986003).jpg?width=1400",
    alt: "Cielo estrellado sobre dunas y el volcán Licancabur, San Pedro de Atacama",
    resumen: "Desierto, géiseres al amanecer y noches con el cielo más limpio del hemisferio sur.",
    etiquetas: "desierto astronomia estrellas salar geiseres volcan",
    url: "/destinos/atacama",
  },
  {
    id: "valle-sagrado", tipo: "Destino", nombre: "Valle Sagrado", pais: "Perú", precio: 890000,
    duracion: "5 días / 4 noches", imagen: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sacred_Valley_(around_Pisaq),_Peru.jpg?width=1400",
    alt: "Terrazas circulares de Moray con montañas nevadas al fondo, Valle Sagrado",
    resumen: "Del Cusco colonial a las terrazas de Moray, con Machu Picchu como cierre.",
    etiquetas: "inca machu picchu cusco cultura historia moray maras",
    url: "/destinos/valle-sagrado",
  },
  {
    id: "chiloe", tipo: "Destino", nombre: "Chiloé", pais: "Chile", precio: 410000,
    duracion: "3 días / 2 noches", imagen: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Palafitos_Chiloe.jpg?width=1400",
    alt: "Palafitos de colores sobre el mar, Chiloé",
    resumen: "Palafitos, curanto al hoyo y mitología chilota en estado puro.",
    etiquetas: "isla palafitos curanto gastronomia iglesias unesco sur",
    url: "/destinos/chiloe",
  },
  {
    id: "bariloche", tipo: "Destino", nombre: "Bariloche", pais: "Argentina", precio: 640000,
    duracion: "4 días / 3 noches", imagen: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lago_Nahuel_Huapi.jpg?width=1400",
    alt: "Lago con montañas nevadas y pinos, Bariloche",
    resumen: "Lagos glaciares, chocolate artesanal y trekking de nivel medio.",
    etiquetas: "lagos chocolate trekking patagonia montana nieve naturaleza",
    url: "/destinos/bariloche",
  },
  {
    id: "cartagena", tipo: "Destino", nombre: "Cartagena", pais: "Colombia", precio: 720000,
    duracion: "4 días / 3 noches", imagen: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cartagena_Old_City.JPG?width=1400",
    alt: "Casas coloniales de colores frente al mar al atardecer, Cartagena",
    resumen: "Murallas coloniales, salsa en la calle y el Caribe a diez minutos.",
    etiquetas: "caribe playa ciudad amurallada colonial historia islas rosario",
    url: "/destinos/cartagena",
  },
  {
    id: "torres-del-paine", tipo: "Destino", nombre: "Torres del Paine", pais: "Chile", precio: 950000,
    duracion: "5 días / 4 noches", imagen: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Torres-del-paine.jpg?width=1400",
    alt: "Tres torres de granito sobre un lago turquesa, Torres del Paine",
    resumen: "El circuito W en su versión corta, para quienes quieren la Patagonia sin acampar diez días.",
    etiquetas: "patagonia trekking parque nacional circuito w torres granito naturaleza",
    url: "/destinos/torres-del-paine",
  },
  {
    id: "paquete-explorador", tipo: "Paquete", nombre: "Paquete Explorador", pais: "Un destino a elección", precio: 450000,
    duracion: "4 días / 3 noches", imagen: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Atacama_Desert_(13340986003).jpg?width=1200",
    alt: "Ilustración de un camino que sube hacia unas montañas al atardecer",
    resumen: "Ideal para una primera escapada corta, con lo esencial bien resuelto.",
    etiquetas: "paquete economico escapada corta primera viaje explorador",
    url: "/paquetes",
  },
  {
    id: "paquete-trotamundos", tipo: "Paquete", nombre: "Paquete Trotamundos", pais: "Dos destinos combinados", precio: 780000,
    duracion: "7 días / 6 noches", imagen: "/img/mapa-ruta.svg",
    alt: "Mapa ilustrado con una ruta que une varios destinos de Sudamérica",
    resumen: "El más elegido: dos destinos conectados y una experiencia guiada incluida.",
    etiquetas: "paquete combinado dos destinos experiencia guiada boutique trotamundos",
    url: "/paquetes",
  },
];

/** Máximo de personas por producto (coincide con la regla del formulario de reserva). */
export const MAX_PERSONAS = 12;

/** Catálogo sincronizado con el inventario del administrador (localStorage).
 * Conserva los datos editoriales del catálogo base y aplica precio/estado/categoría/stock del admin.
 */
export function obtenerProductos() {
  let inventario;
  try { inventario = JSON.parse(localStorage.getItem("wanderly_admin_productos") || "null"); }
  catch { inventario = null; }
  if (!Array.isArray(inventario)) return PRODUCTOS;
  return inventario.filter((a) => a.estado !== "inactivo").map((a) => {
    const base = PRODUCTOS.find((p) => p.id === a.id);
    return {
      ...(base || { imagen: "/img/hero.svg", alt: a.nombre, resumen: "Producto de viaje agregado desde el panel de administración.", etiquetas: `${a.nombre} ${a.pais || ""}`, url: `/productos/${a.id}`, duracion: "Consultar disponibilidad" }),
      ...a, pais: a.pais || base?.pais || "Por definir",
      resumen: base?.resumen || "Producto de viaje agregado desde el panel de administración.",
      imagen: base?.imagen || "/img/hero.svg", alt: base?.alt || a.nombre,
      etiquetas: base?.etiquetas || `${a.nombre} ${a.pais || ""}`,
      url: base?.url || `/productos/${a.id}`,
    };
  });
}

export function buscarProducto(id) {
  return obtenerProductos().find((p) => p.id === id) || null;
}

/** Descuentos vigentes (%) por producto: alimentan la vista Ofertas y el precio del carrito. */
export const DESCUENTOS = {
  atacama: 15,
  chiloe: 20,
  cartagena: 10,
  "paquete-explorador": 25,
};

/** Precio por persona con el descuento aplicado (si existe). */
export function precioFinal(producto) {
  if (!producto || !Number.isFinite(Number(producto.precio))) return 0;
  const d = DESCUENTOS[producto.id] || 0;
  return Math.round((Number(producto.precio) * (100 - d)) / 100);
}
