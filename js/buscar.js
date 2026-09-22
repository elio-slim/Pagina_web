/**
 * buscar.js
 * Página buscar.html: muestra los productos del catálogo que coinciden con
 * el texto del buscador (?q=...) y permite ordenarlos por precio.
 * Depende de catalogo.js.
 */

/** Minúsculas y sin tildes: "Perú" y "peru" coinciden. */
function normalizar(texto) {
  return String(texto).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

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

function buscarProductos(consulta) {
  const palabras = normalizar(consulta).split(/\s+/).filter(Boolean);
  if (palabras.length === 0) return PRODUCTOS.map((p) => ({ p, s: 1 }));
  return PRODUCTOS.map((p) => ({ p, s: puntaje(p, palabras) })).filter((r) => r.s > 0);
}

function tarjetaProducto(p) {
  const art = document.createElement("article");
  art.className = "dest-card";
  art.innerHTML = `
    <figure class="dest-photo">
      <img src="${escaparHTML(p.imagen)}" alt="${escaparHTML(p.alt)}" width="800" height="600" loading="lazy" />
      <figcaption>${escaparHTML(p.nombre)}</figcaption>
    </figure>
    <div class="dest-body">
      <p class="country"><span class="tag-chip">${escaparHTML(p.tipo)}</span> ${escaparHTML(p.pais)}</p>
      <p>${escaparHTML(p.resumen)}</p>
      <p class="price-line"><strong>${formatoPrecio(p.precio)}</strong> <small>por persona</small></p>
      <div class="dest-actions">
        <a href="${escaparHTML(p.url)}" class="link">Ver detalle</a>
        <button type="button" class="btn btn-dark btn-sm" data-agregar="${escaparHTML(p.id)}">Agregar al carrito</button>
      </div>
    </div>`;
  return art;
}

function pintarResultados() {
  const contenedor = document.getElementById("resultados");
  if (!contenedor) return;

  const consulta = new URLSearchParams(window.location.search).get("q") || "";
  const entrada = document.getElementById("buscador");
  if (entrada) entrada.value = consulta;

  const orden = document.getElementById("orden").value;
  let resultados = buscarProductos(consulta);
  if (orden === "precio-asc") resultados.sort((a, b) => a.p.precio - b.p.precio);
  else if (orden === "precio-desc") resultados.sort((a, b) => b.p.precio - a.p.precio);
  else resultados.sort((a, b) => b.s - a.s);

  contenedor.innerHTML = "";
  resultados.forEach((r) => contenedor.appendChild(tarjetaProducto(r.p)));

  const estado = document.getElementById("resultados-estado");
  const sinResultados = document.getElementById("sin-resultados");
  sinResultados.hidden = resultados.length > 0;
  if (consulta.trim() === "") {
    estado.textContent = `Mostrando todo el catálogo (${resultados.length} productos).`;
  } else if (resultados.length > 0) {
    estado.textContent = `${resultados.length} resultado(s) para «${consulta.trim()}».`;
  } else {
    estado.textContent = `No encontramos resultados para «${consulta.trim()}».`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const orden = document.getElementById("orden");
  if (!orden) return;
  orden.addEventListener("change", pintarResultados);
  pintarResultados();
});
