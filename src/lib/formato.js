/** 520000 -> "$520.000" */
export function formatoPrecio(numero) {
  return "$" + Math.round(numero).toLocaleString("es-CL");
}

/** Minúsculas y sin tildes: "Perú" y "peru" coinciden. */
export function normalizar(texto) {
  return String(texto).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}
