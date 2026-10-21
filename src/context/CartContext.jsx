import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MAX_PERSONAS, buscarProducto, precioFinal } from "../data/catalogo.js";
import { PRODUCTOS_ADMIN_SEED } from "../data/mock.js";
import { guardarAlmacen, leerAlmacen } from "../lib/almacen.js";
import { useToast } from "./ToastContext.jsx";

const CLAVE_CARRITO = "wanderly_carrito";
const CLAVE_PEDIDOS = "wanderly_pedidos";
const CLAVE_PRODUCTOS_ADMIN = "wanderly_admin_productos";

const CartContext = createContext(null);

function leerCarrito() {
  // Descarta productos que ya no existen en el catálogo.
  return leerAlmacen(CLAVE_CARRITO, []).filter((i) => buscarProducto(i.id));
}

export function CartProvider({ children }) {
  const { mostrarAviso } = useToast();
  const [items, setItems] = useState(leerCarrito);

  useEffect(() => {
    guardarAlmacen(CLAVE_CARRITO, items);
  }, [items]);

  useEffect(() => {
    const sincronizarCatalogo = () => setItems((actuales) => actuales.filter((i) => buscarProducto(i.id)));
    window.addEventListener("wanderly:catalogo-actualizado", sincronizarCatalogo);
    return () => window.removeEventListener("wanderly:catalogo-actualizado", sincronizarCatalogo);
  }, []);

  const agregar = useCallback(
    (id) => {
      const producto = buscarProducto(id);
      if (!producto) return;
      setItems((actuales) => {
        const existe = actuales.find((i) => i.id === id);
        return existe
          ? actuales.map((i) => (i.id === id ? { ...i, cantidad: Math.min(MAX_PERSONAS, i.cantidad + 1) } : i))
          : [...actuales, { id, cantidad: 1 }];
      });
      mostrarAviso(`Agregaste «${producto.nombre}» al carrito.`);
    },
    [mostrarAviso]
  );

  const cambiarCantidad = useCallback((id, cantidad) => {
    const n = Math.max(1, Math.min(MAX_PERSONAS, Math.round(Number(cantidad)) || 1));
    setItems((actuales) => actuales.map((i) => (i.id === id ? { ...i, cantidad: n } : i)));
  }, []);

  const quitar = useCallback((id) => setItems((actuales) => actuales.filter((i) => i.id !== id)), []);
  const vaciar = useCallback(() => setItems([]), []);

  const totalPersonas = useMemo(() => items.reduce((suma, i) => suma + i.cantidad, 0), [items]);
  const total = useMemo(() => items.reduce((suma, i) => suma + precioFinal(buscarProducto(i.id)) * i.cantidad, 0), [items]);

  /** Genera el pedido (pago simulado), lo guarda en localStorage y vacía el carrito. */
  const confirmarCompra = useCallback(
    (sesion, envio = null) => {
      if (!sesion || items.length === 0) return null;
      const inventario = leerAlmacen(CLAVE_PRODUCTOS_ADMIN, PRODUCTOS_ADMIN_SEED);
      if (Array.isArray(inventario)) {
        const insuficiente = items.find((i) => { const p = inventario.find((x) => x.id === i.id); return !p || p.estado === "inactivo" || Number(p.stock) < i.cantidad; });
        if (insuficiente) { mostrarAviso("No hay stock suficiente para uno de los productos. Revisa el carrito."); return null; }
      }
      const numero = "WDL-" + Date.now().toString().slice(-6);
      const pedidos = leerAlmacen(CLAVE_PEDIDOS, []);
      pedidos.push({
        numero,
        fecha: new Date().toISOString(),
        email: sesion.email,
        nombre: sesion.nombre,
        estado: "Pagado",
        envio,
        total,
        items: items.map((i) => ({ id: i.id, cantidad: i.cantidad, precio: precioFinal(buscarProducto(i.id)) })),
      });
      guardarAlmacen(CLAVE_PEDIDOS, pedidos);
      if (Array.isArray(inventario)) {
        const comprados = new Map(items.map((i) => [i.id, i.cantidad]));
        guardarAlmacen(CLAVE_PRODUCTOS_ADMIN, inventario.map((p) => comprados.has(p.id) ? { ...p, stock: Math.max(0, Number(p.stock) - comprados.get(p.id)) } : p));
        window.dispatchEvent(new CustomEvent("wanderly:catalogo-actualizado"));
      }
      setItems([]);
      return numero;
    },
    [items, total]
  );

  const valor = useMemo(
    () => ({ items, totalPersonas, total, agregar, cambiarCantidad, quitar, vaciar, confirmarCompra }),
    [items, totalPersonas, total, agregar, cambiarCantidad, quitar, vaciar, confirmarCompra]
  );
  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
