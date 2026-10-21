/**
 * usuarios.js
 * Registro, inicio y cierre de sesión — SIMULADOS en el navegador.
 *
 * IMPORTANTE (proyecto sin backend): los usuarios se guardan en localStorage
 * de este navegador. No es un sistema de seguridad real: en una tienda de
 * verdad la autenticación se hace en un servidor. Aun así, no se guarda la
 * contraseña en texto plano, solo su huella SHA-256.
 */
import { leerAlmacen, guardarAlmacen, borrarAlmacen } from "./almacen.js";
import { USUARIOS_MOCK } from "../data/mock.js";

export const CLAVE_USUARIOS = "wanderly_usuarios";
export const CLAVE_SESION = "wanderly_sesion";
export const CLAVE_USUARIOS_ADMIN = "wanderly_admin_usuarios";

/** Usuarios del panel (mock): se siembran desde data/mock.js la primera vez. */
export function usuariosAdmin() {
  const guardados = leerAlmacen(CLAVE_USUARIOS_ADMIN, null);
  if (guardados) return guardados;
  guardarAlmacen(CLAVE_USUARIOS_ADMIN, USUARIOS_MOCK);
  return USUARIOS_MOCK;
}

export const esAdmin = (sesion) => sesion?.rol === "admin";

/** Huella SHA-256 de la contraseña (con respaldo simple si el navegador no la ofrece). */
async function huellaClave(texto) {
  if (window.crypto && window.crypto.subtle) {
    const datos = new TextEncoder().encode("wanderly:" + texto);
    const buffer = await window.crypto.subtle.digest("SHA-256", datos);
    return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  return "b64:" + btoa(unescape(encodeURIComponent("wanderly:" + texto)));
}

export function obtenerSesion() {
  return leerAlmacen(CLAVE_SESION, null);
}

export async function registrarUsuario({ nombre, email, clave }) {
  const usuarios = leerAlmacen(CLAVE_USUARIOS, []);
  const correo = email.trim().toLowerCase();
  if (usuarios.some((u) => u.email === correo) || usuariosAdmin().some((u) => u.email === correo)) {
    return { ok: false, mensaje: "Ya existe una cuenta con ese correo. Prueba iniciando sesión." };
  }
  usuarios.push({ nombre: nombre.trim(), email: correo, huella: await huellaClave(clave) });
  if (!guardarAlmacen(CLAVE_USUARIOS, usuarios)) {
    return { ok: false, mensaje: "Tu navegador no permite guardar datos. Activa el almacenamiento local e inténtalo otra vez." };
  }
  const sesion = { nombre: nombre.trim(), email: correo, rol: "cliente" };
  guardarAlmacen(CLAVE_SESION, sesion);
  return { ok: true, sesion };
}

export async function iniciarSesion({ email, clave }) {
  const usuarios = leerAlmacen(CLAVE_USUARIOS, []);
  const correo = email.trim().toLowerCase();
  // 1) Usuarios mock/administrados desde el panel (incluye al Administrador).
  const interno = usuariosAdmin().find((u) => u.email === correo && u.clave === clave);
  if (interno) {
    if (interno.estado === "inactivo") return { ok: false, mensaje: "Tu cuenta está inactiva. Contacta al administrador." };
    const sesion = { nombre: interno.nombre, email: interno.email, rol: interno.rol };
    guardarAlmacen(CLAVE_SESION, sesion);
    return { ok: true, sesion };
  }
  // 2) Usuarios registrados desde el formulario público.
  const usuario = usuarios.find((u) => u.email === correo);
  if (!usuario || usuario.huella !== (await huellaClave(clave))) {
    return { ok: false, mensaje: "Correo o contraseña incorrectos." };
  }
  const sesion = { nombre: usuario.nombre, email: usuario.email, rol: "cliente" };
  guardarAlmacen(CLAVE_SESION, sesion);
  return { ok: true, sesion };
}

export function borrarSesion() {
  borrarAlmacen(CLAVE_SESION);
}

/** Solo se permite volver a rutas del propio sitio (evita redirecciones a otros dominios). */
export function destinoSeguro(valor) {
  return valor && /^\/(?!\/)[a-z0-9\-/]*(\?[^\s]*)?$/i.test(valor) ? valor : "/";
}
