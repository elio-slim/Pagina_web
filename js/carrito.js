/**
 * carrito.js
 * Carrito de compras guardado en localStorage. Se encarga de:
 *  - los botones "Agregar al carrito" ([data-agregar="id-del-producto"]),
 *  - el contador del icono del carrito en la cabecera,
 *  - la página carrito.html (lista, cantidades, total y finalizar compra).
 * Depende de catalogo.js (precios) y auth.js (sesión).
 */

const CLAVE_CARRITO = "wanderly_carrito";
const CLAVE_PEDIDOS = "wanderly_pedidos";

function leerCarrito() {
  const items = leerAlmacen(CLAVE_CARRITO, []);
  // Descarta productos que ya no existen en el catálogo.
  return items.filter((i) => buscarProducto(i.id));
}

function guardarCarrito(items) {
  guardarAlmacen(CLAVE_CARRITO, items);
  actualizarContadorCarrito();
}

function totalPersonas(items) {
  return items.reduce((suma, i) => suma + i.cantidad, 0);
}

function totalCarrito(items) {
  return items.reduce((suma, i) => suma + buscarProducto(i.id).precio * i.cantidad, 0);
}

function agregarAlCarrito(id) {
  const producto = buscarProducto(id);
  if (!producto) return;
  const items = leerCarrito();
  const existente = items.find((i) => i.id === id);
  if (existente) {
    existente.cantidad = Math.min(MAX_PERSONAS, existente.cantidad + 1);
  } else {
    items.push({ id, cantidad: 1 });
  }
  guardarCarrito(items);
  mostrarAviso(`Agregaste «${producto.nombre}» al carrito.`);
}

function cambiarCantidad(id, cantidad) {
  const n = Math.max(1, Math.min(MAX_PERSONAS, Math.round(Number(cantidad)) || 1));
  const items = leerCarrito();
  const item = items.find((i) => i.id === id);
  if (item) item.cantidad = n;
  guardarCarrito(items);
  pintarCarrito();
}

function quitarDelCarrito(id) {
  guardarCarrito(leerCarrito().filter((i) => i.id !== id));
  pintarCarrito();
}

function actualizarContadorCarrito() {
  const badge = document.getElementById("cartCount");
  const enlace = document.getElementById("cartLink");
  if (!badge || !enlace) return;
  const n = totalPersonas(leerCarrito());
  badge.textContent = String(n);
  badge.dataset.vacio = String(n === 0);
  enlace.setAttribute("aria-label", `Carrito de compras, ${n} ${n === 1 ? "persona" : "personas"} en total`);
}

/** Aviso breve y accesible (aria-live) al agregar un producto. */
function mostrarAviso(texto) {
  let aviso = document.getElementById("toast");
  if (!aviso) {
    aviso = document.createElement("div");
    aviso.id = "toast";
    aviso.className = "toast";
    aviso.setAttribute("role", "status");
    document.body.appendChild(aviso);
  }
  aviso.textContent = texto;
  aviso.classList.add("show");
  window.clearTimeout(mostrarAviso.temporizador);
  mostrarAviso.temporizador = window.setTimeout(() => aviso.classList.remove("show"), 2600);
}

function pintarCarrito() {
  const lista = document.getElementById("carrito-lista");
  if (!lista) return;

  const items = leerCarrito();
  const vacio = document.getElementById("carrito-vacio");
  const contenido = document.getElementById("carrito-contenido");
  vacio.hidden = items.length > 0;
  contenido.hidden = items.length === 0;

  lista.innerHTML = "";
  items.forEach((item) => {
    const p = buscarProducto(item.id);
    const fila = document.createElement("li");
    fila.className = "cart-item";
    fila.innerHTML = `
      <img src="${escaparHTML(p.imagen)}" alt="${escaparHTML(p.alt)}" width="800" height="600" loading="lazy" />
      <div class="cart-info">
        <span class="tag-chip">${escaparHTML(p.tipo)}</span>
        <h3><a href="${escaparHTML(p.url)}">${escaparHTML(p.nombre)}</a></h3>
        <p class="cart-meta">${escaparHTML(p.duracion)} · ${formatoPrecio(p.precio)} por persona</p>
        <button type="button" class="link-btn" data-quitar="${escaparHTML(p.id)}">Quitar</button>
      </div>
      <div class="cart-side">
        <div class="qty" role="group" aria-label="Personas para ${escaparHTML(p.nombre)}">
          <button type="button" data-menos="${escaparHTML(p.id)}" aria-label="Una persona menos">−</button>
          <input type="number" min="1" max="${MAX_PERSONAS}" value="${item.cantidad}" data-cantidad="${escaparHTML(p.id)}" aria-label="Cantidad de personas" inputmode="numeric" />
          <button type="button" data-mas="${escaparHTML(p.id)}" aria-label="Una persona más">+</button>
        </div>
        <p class="cart-subtotal">${formatoPrecio(p.precio * item.cantidad)}</p>
      </div>`;
    lista.appendChild(fila);
  });

  document.getElementById("resumen-personas").textContent = String(totalPersonas(items));
  document.getElementById("resumen-total").textContent = formatoPrecio(totalCarrito(items));
}

function activarPaginaCarrito() {
  const lista = document.getElementById("carrito-lista");
  if (!lista) return;

  lista.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    const items = leerCarrito();
    if (b.dataset.quitar) quitarDelCarrito(b.dataset.quitar);
    if (b.dataset.mas) cambiarCantidad(b.dataset.mas, (items.find((i) => i.id === b.dataset.mas) || {}).cantidad + 1);
    if (b.dataset.menos) cambiarCantidad(b.dataset.menos, (items.find((i) => i.id === b.dataset.menos) || {}).cantidad - 1);
  });
  lista.addEventListener("change", (e) => {
    if (e.target.dataset.cantidad) cambiarCantidad(e.target.dataset.cantidad, e.target.value);
  });

  document.getElementById("btn-vaciar").addEventListener("click", () => {
    guardarCarrito([]);
    pintarCarrito();
  });

  const panelPago = document.getElementById("panel-pago");
  const btnFinalizar = document.getElementById("btn-finalizar");
  btnFinalizar.addEventListener("click", () => {
    const sesion = obtenerSesion();
    if (!sesion) {
      window.location.href = "login.html?next=carrito.html";
      return;
    }
    document.getElementById("pago-nombre").textContent = sesion.nombre;
    document.getElementById("pago-email").textContent = sesion.email;
    panelPago.hidden = false;
    btnFinalizar.hidden = true;
    document.getElementById("btn-confirmar").focus();
  });

  document.getElementById("btn-confirmar").addEventListener("click", () => {
    const sesion = obtenerSesion();
    const items = leerCarrito();
    if (!sesion || items.length === 0) return;

    const numero = "WDL-" + Date.now().toString().slice(-6);
    const pedidos = leerAlmacen(CLAVE_PEDIDOS, []);
    pedidos.push({
      numero,
      fecha: new Date().toISOString(),
      email: sesion.email,
      total: totalCarrito(items),
      items: items.map((i) => ({ id: i.id, cantidad: i.cantidad, precio: buscarProducto(i.id).precio })),
    });
    guardarAlmacen(CLAVE_PEDIDOS, pedidos);

    document.getElementById("pedido-numero").textContent = numero;
    document.getElementById("pedido-email").textContent = sesion.email;
    document.getElementById("carrito-contenido").hidden = true;
    document.getElementById("pedido-ok").hidden = false;
    document.getElementById("pedido-ok").focus();
    guardarCarrito([]);
  });

  pintarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  activarPaginaCarrito();

  // Botones "Agregar al carrito" (también los que se crean dinámicamente).
  document.addEventListener("click", (e) => {
    const boton = e.target.closest("[data-agregar]");
    if (boton) agregarAlCarrito(boton.dataset.agregar);
  });
});
