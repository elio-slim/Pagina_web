import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext.jsx";
import { ToastProvider } from "../src/context/ToastContext.jsx";
import { CartProvider } from "../src/context/CartContext.jsx";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const montados = [];

/** Monta un elemento React en el DOM real del navegador de pruebas. */
export function montar(elemento) {
  const contenedor = document.createElement("div");
  document.body.appendChild(contenedor);
  const raiz = createRoot(contenedor);
  act(() => raiz.render(elemento));
  montados.push({ raiz, contenedor });
  return contenedor;
}

/** Desmonta todo lo montado y limpia el almacenamiento simulado (usar en afterEach). */
export function limpiar() {
  while (montados.length) {
    const { raiz, contenedor } = montados.pop();
    act(() => raiz.unmount());
    contenedor.remove();
  }
  localStorage.clear();
}

/** Envuelve un componente con router + proveedores de la app. */
export function ConProveedores({ children, ruta = "/" }) {
  return (
    <MemoryRouter initialEntries={[ruta]}>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>{children}</CartProvider>
        </ToastProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

export const clic = (nodo) => act(() => nodo.dispatchEvent(new MouseEvent("click", { bubbles: true })));

/** Escribe en un input controlado de React (setter nativo + evento input). */
export function escribir(input, texto) {
  const setter = Object.getOwnPropertyDescriptor(input.constructor.prototype, "value").set;
  act(() => {
    setter.call(input, texto);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

export const enviar = (formulario) =>
  act(() => formulario.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
