/**
 * main.js
 * Comportamiento común a todas las páginas de Wanderly:
 *  - Menú móvil (hamburguesa) accesible.
 *  - Año dinámico en el footer y botón "Volver arriba".
 *  - Filtro de destinos por país (destinos.html).
 *  - Preselección del destino en el formulario de reserva (paquetes.html?destino=...).
 *
 * El header y el footer están escritos directamente en cada página HTML,
 * por lo que el sitio funciona igual abriéndolo con doble clic (file://)
 * que desde un servidor local.
 */

function activarMenuMovil() {
  const boton = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");
  if (!boton || !nav) return;

  const cerrar = () => {
    nav.classList.remove("open");
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-label", "Abrir menú");
  };

  boton.addEventListener("click", () => {
    const abierto = nav.classList.toggle("open");
    boton.setAttribute("aria-expanded", String(abierto));
    boton.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });

  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", cerrar));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrar();
  });
}

function pintarAnio() {
  const el = document.getElementById("footerYear");
  if (el) el.textContent = new Date().getFullYear();
}

function activarVolverArriba() {
  const boton = document.getElementById("btnTop");
  if (!boton) return;
  boton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function activarFiltroDestinos() {
  const botones = document.querySelectorAll("[data-filtro]");
  const tarjetas = document.querySelectorAll("#lista-destinos [data-pais]");
  const estado = document.getElementById("filtro-estado");
  if (!botones.length || !tarjetas.length) return;

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const filtro = boton.dataset.filtro;
      let visibles = 0;

      botones.forEach((b) => b.setAttribute("aria-pressed", String(b === boton)));
      tarjetas.forEach((t) => {
        const mostrar = filtro === "todos" || t.dataset.pais === filtro;
        t.hidden = !mostrar;
        if (mostrar) visibles++;
      });

      if (estado) {
        estado.textContent =
          filtro === "todos"
            ? `Mostrando los ${visibles} destinos.`
            : `Mostrando ${visibles} destino(s) en ${filtro}.`;
      }
    });
  });
}

function preseleccionarDestino() {
  const select = document.getElementById("r-destino");
  if (!select) return;
  const clave = new URLSearchParams(window.location.search).get("destino");
  if (clave && [...select.options].some((o) => o.value === clave)) {
    select.value = clave;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  activarMenuMovil();
  pintarAnio();
  activarVolverArriba();
  activarFiltroDestinos();
  preseleccionarDestino();
});
