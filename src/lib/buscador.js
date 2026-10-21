import { obtenerProductos } from "../data/catalogo.js";
import { normalizar } from "./formato.js";

/** Puntaje simple: coincidencia en el nombre pesa más que en la descripción. */
function puntaje(producto, palabras) {
  const nombre = normalizar(producto.nombre);
  const pais = normalizar(producto.pais);
  const resto = normalizar(`${producto.tipo} ${producto.resumen} ${producto.etiquetas}`);
  let total = 0;
  for (const palabra of palabras) {
    let punto = 0;
    if (nombre.includes(palabra)) punto = 5;
    else if (pais.includes(palabra)) punto = 3;
    else if (resto.includes(palabra)) punto = 1;
    if (punto === 0) return 0; // todas las palabras deben coincidir
    total += punto;
  }
  return total;
}

/** Devuelve [{ p: producto, s: puntaje }] de los productos que coinciden con la consulta. */
export function buscarProductos(consulta) {
  const palabras = normalizar(consulta).split(/\s+/).filter(Boolean);
  if (palabras.length === 0) return obtenerProductos().map((p) => ({ p, s: 1 }));
  return obtenerProductos().map((p) => ({ p, s: puntaje(p, palabras) })).filter((r) => r.s > 0);
}
