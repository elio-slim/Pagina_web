import { useState } from "react";
import { MAX_PERSONAS } from "../data/catalogo.js";

/** Selector de personas con estado interno (+ / −). Avisa cada cambio con onChange(valor). */
export default function SelectorCantidad({ inicial = 1, max = MAX_PERSONAS, onChange }) {
  const [cantidad, setCantidad] = useState(inicial);
  const cambiar = (n) => {
    const v = Math.max(1, Math.min(max, n));
    setCantidad(v);
    onChange?.(v);
  };
  return (
    <div className="input-group input-group-sm qty-bs" role="group" aria-label="Cantidad de personas">
      <button type="button" className="btn btn-outline-dark" aria-label="Una persona menos" onClick={() => cambiar(cantidad - 1)}>−</button>
      <output className="form-control text-center" data-testid="cantidad">{cantidad}</output>
      <button type="button" className="btn btn-outline-dark" aria-label="Una persona más" onClick={() => cambiar(cantidad + 1)}>+</button>
    </div>
  );
}
