/**
 * auth.js
 * Registro, inicio y cierre de sesión — SIMULADOS en el navegador.
 *
 * IMPORTANTE (proyecto sin backend): los usuarios se guardan en localStorage
 * de este navegador. No es un sistema de seguridad real: en una tienda de
 * verdad la autenticación se hace en un servidor. Aun así, no se guarda la
 * contraseña en texto plano, solo su huella SHA-256.
 */

const CLAVE_USUARIOS = "wanderly_usuarios";
const CLAVE_SESION = "wanderly_sesion";

function leerAlmacen(clave, porDefecto) {
  try {
    const crudo = localStorage.getItem(clave);
    return crudo ? JSON.parse(crudo) : porDefecto;
  } catch (e) {
    return porDefecto;
  }
}

function guardarAlmacen(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (e) {
    return false;
  }
}

/** Huella SHA-256 de la contraseña (con respaldo simple si el navegador no la ofrece). */
async function huellaClave(texto) {
  if (window.crypto && window.crypto.subtle) {
    const datos = new TextEncoder().encode("wanderly:" + texto);
    const buffer = await window.crypto.subtle.digest("SHA-256", datos);
    return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  return "b64:" + btoa(unescape(encodeURIComponent("wanderly:" + texto)));
}

function obtenerSesion() {
  return leerAlmacen(CLAVE_SESION, null);
}

async function registrarUsuario({ nombre, email, clave }) {
  const usuarios = leerAlmacen(CLAVE_USUARIOS, []);
  const correo = email.trim().toLowerCase();
  if (usuarios.some((u) => u.email === correo)) {
    return { ok: false, mensaje: "Ya existe una cuenta con ese correo. Prueba iniciando sesión." };
  }
  usuarios.push({ nombre: nombre.trim(), email: correo, huella: await huellaClave(clave) });
  if (!guardarAlmacen(CLAVE_USUARIOS, usuarios)) {
    return { ok: false, mensaje: "Tu navegador no permite guardar datos. Activa el almacenamiento local e inténtalo otra vez." };
  }
  guardarAlmacen(CLAVE_SESION, { nombre: nombre.trim(), email: correo });
  return { ok: true };
}

async function iniciarSesion({ email, clave }) {
  const usuarios = leerAlmacen(CLAVE_USUARIOS, []);
  const correo = email.trim().toLowerCase();
  const usuario = usuarios.find((u) => u.email === correo);
  if (!usuario || usuario.huella !== (await huellaClave(clave))) {
    return { ok: false, mensaje: "Correo o contraseña incorrectos." };
  }
  guardarAlmacen(CLAVE_SESION, { nombre: usuario.nombre, email: usuario.email });
  return { ok: true };
}

function cerrarSesion() {
  try {
    localStorage.removeItem(CLAVE_SESION);
  } catch (e) {
    /* sin almacenamiento: nada que borrar */
  }
}

/** Solo se permite volver a páginas del propio sitio (evita redirecciones a otros dominios). */
function destinoSeguro(valor) {
  return valor && /^[a-z0-9-]+\.html(\?[^\s]*)?$/i.test(valor) ? valor : "index.html";
}

/** Muestra el estado de la sesión en la cabecera (Ingresar / Hola, nombre + Salir). */
function actualizarCabeceraSesion() {
  const etiqueta = document.getElementById("cuentaEtiqueta");
  const enlace = document.getElementById("cuentaEnlace");
  const salir = document.getElementById("btnSalir");
  if (!etiqueta || !enlace || !salir) return;

  const sesion = obtenerSesion();
  if (sesion) {
    etiqueta.textContent = "Hola, " + sesion.nombre.split(" ")[0];
    enlace.setAttribute("href", "carrito.html");
    enlace.setAttribute("title", "Sesión iniciada como " + sesion.email);
    salir.hidden = false;
  } else {
    etiqueta.textContent = "Ingresar";
    enlace.setAttribute("href", "login.html");
    enlace.removeAttribute("title");
    salir.hidden = true;
  }
}

function mostrarEstado(form, texto, tipo) {
  const caja = form.querySelector(".form-status");
  caja.textContent = texto;
  caja.className = "form-status show " + tipo;
}

/** Página login.html: pestañas y envío de los dos formularios. */
function activarPaginaLogin() {
  const formLogin = document.getElementById("form-login");
  const formRegistro = document.getElementById("form-registro");
  if (!formLogin || !formRegistro) return;

  const tabs = document.querySelectorAll(".tab");
  const paneles = { login: formLogin.closest(".auth-panel"), registro: formRegistro.closest(".auth-panel") };

  function mostrarPanel(modo) {
    tabs.forEach((t) => t.setAttribute("aria-selected", String(t.dataset.modo === modo)));
    Object.entries(paneles).forEach(([clave, panel]) => (panel.hidden = clave !== modo));
  }
  tabs.forEach((t) => t.addEventListener("click", () => mostrarPanel(t.dataset.modo)));
  mostrarPanel(new URLSearchParams(window.location.search).get("modo") === "registro" ? "registro" : "login");

  const siguiente = destinoSeguro(new URLSearchParams(window.location.search).get("next"));
  const aviso = document.getElementById("auth-aviso");
  if (aviso && siguiente === "carrito.html") {
    aviso.textContent = "Inicia sesión o crea una cuenta para finalizar tu compra.";
    aviso.hidden = false;
  }

  if (obtenerSesion()) {
    mostrarEstado(formLogin, "Ya tienes una sesión iniciada. Puedes seguir explorando.", "success");
  }

  formLogin.addEventListener("wanderly:valido", async () => {
    const resultado = await iniciarSesion({ email: formLogin.email.value, clave: formLogin.clave.value });
    if (!resultado.ok) return mostrarEstado(formLogin, resultado.mensaje, "error");
    mostrarEstado(formLogin, "¡Bienvenido de vuelta! Te estamos redirigiendo…", "success");
    window.setTimeout(() => (window.location.href = siguiente), 700);
  });

  formRegistro.addEventListener("wanderly:valido", async () => {
    const resultado = await registrarUsuario({
      nombre: formRegistro.nombre.value,
      email: formRegistro.email.value,
      clave: formRegistro.clave.value,
    });
    if (!resultado.ok) return mostrarEstado(formRegistro, resultado.mensaje, "error");
    mostrarEstado(formRegistro, "¡Cuenta creada! Te estamos redirigiendo…", "success");
    window.setTimeout(() => (window.location.href = siguiente), 700);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarCabeceraSesion();
  activarPaginaLogin();

  const salir = document.getElementById("btnSalir");
  if (salir) {
    salir.addEventListener("click", () => {
      cerrarSesion();
      actualizarCabeceraSesion();
      if (document.body.dataset.requiereSesion === "true") window.location.href = "index.html";
    });
  }
});
