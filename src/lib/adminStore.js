/**
 * adminStore.js — "Base de datos" simulada del panel (localStorage + datos de mock.js).
 * La primera vez que se lee una colección se siembra con los datos mock.
 */
import { useCallback, useEffect, useState } from "react";
import { leerAlmacen, guardarAlmacen } from "./almacen.js";
import { CATEGORIAS_SEED, PEDIDOS_SEED, PRODUCTOS_ADMIN_SEED } from "../data/mock.js";
import { usuariosAdmin, CLAVE_USUARIOS } from "./usuarios.js";

export const CLAVES = {
  productos: "wanderly_admin_productos",
  categorias: "wanderly_admin_categorias",
  usuarios: "wanderly_admin_usuarios",
  pedidos: "wanderly_pedidos",
};

export function cargar(clave, seed) {
  const v = leerAlmacen(clave, null);
  if (v) return v;
  guardarAlmacen(clave, seed);
  return seed;
}

/** Hook: lista persistente. Devuelve [lista, actualizar(fn|valor)]. */
export function useColeccion(clave, seed) {
  const [lista, setLista] = useState(() => cargar(clave, seed));
  useEffect(() => {
    guardarAlmacen(clave, lista);
    if (clave === CLAVES.productos || clave === CLAVES.categorias) window.dispatchEvent(new CustomEvent("wanderly:catalogo-actualizado"));
  }, [clave, lista]);
  return [lista, setLista];
}

export const useProductosAdmin = () => useColeccion(CLAVES.productos, PRODUCTOS_ADMIN_SEED);
export const useCategoriasAdmin = () => useColeccion(CLAVES.categorias, CATEGORIAS_SEED);

/** Categorías vigentes (las usa también la tienda). */
export const obtenerCategorias = () => cargar(CLAVES.categorias, CATEGORIAS_SEED);

/** Órdenes = ejemplos mock + compras reales hechas en el checkout, más recientes primero. */
export function obtenerPedidos() {
  const reales = leerAlmacen(CLAVES.pedidos, []);
  return [...PEDIDOS_SEED, ...reales].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

/** Usuarios del panel + cuentas creadas desde el formulario público de registro. */
export function obtenerUsuarios() {
  const internos = usuariosAdmin();
  const registrados = leerAlmacen(CLAVE_USUARIOS, [])
    .filter((r) => !internos.some((u) => u.email === r.email))
    .map((r) => ({ nombre: r.nombre, email: r.email, rol: "cliente", estado: "activo", origen: "registro" }));
  return [...internos, ...registrados];
}

export const guardarUsuarios = (lista) => guardarAlmacen(CLAVES.usuarios, lista);

export const totalPedido = (p) => p.items.reduce((s, i) => s + i.precio * i.cantidad, 0);
export const hoyISO = () => new Date().toISOString().slice(0, 10);
