/** Botón reutilizable: recibe su etiqueta (label) y la acción (onClick) por props. */
export default function Boton({ label, onClick, variante = "primary", tipo = "button", className = "", ...resto }) {
  return (
    <button type={tipo} className={`btn btn-${variante} ${className}`.trim()} onClick={onClick} {...resto}>
      {label}
    </button>
  );
}
