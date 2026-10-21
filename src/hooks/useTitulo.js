import { useEffect } from "react";

/** Actualiza el <title> de la pestaña al entrar en cada página. */
export function useTitulo(titulo) {
  useEffect(() => {
    document.title = titulo;
  }, [titulo]);
}
