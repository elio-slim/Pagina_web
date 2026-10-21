import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const ToastContext = createContext(null);

/** Aviso breve y accesible (role="status") para confirmar acciones, p. ej. al agregar al carrito. */
export function ToastProvider({ children }) {
  const [texto, setTexto] = useState("");
  const [visible, setVisible] = useState(false);
  const temporizador = useRef(null);

  const mostrarAviso = useCallback((mensaje) => {
    setTexto(mensaje);
    setVisible(true);
    window.clearTimeout(temporizador.current);
    temporizador.current = window.setTimeout(() => setVisible(false), 2600);
  }, []);

  useEffect(() => () => window.clearTimeout(temporizador.current), []);

  return (
    <ToastContext.Provider value={{ mostrarAviso }}>
      {children}
      <div id="toast" className={"toast" + (visible ? " show" : "")} role="status">
        {texto}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de <ToastProvider>");
  return ctx;
}
