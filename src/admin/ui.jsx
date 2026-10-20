import { Link } from "react-router-dom";

export function Titulo({ titulo, children }) {
  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-4">
      <h1 className="h3 m-0 admin-h1">{titulo}</h1>
      <div className="d-flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function Metrica({ titulo, valor, detalle, tono = "dark" }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <p className="text-muted small mb-1">{titulo}</p>
        <p className={`display-6 fw-semibold mb-1 text-${tono}`}>{valor}</p>
        {detalle && <p className="small text-muted m-0">{detalle}</p>}
      </div>
    </div>
  );
}

export const Insignia = ({ texto, tono }) => <span className={`badge text-bg-${tono}`}>{texto}</span>;
export const BtnLink = ({ to, children, variante = "dark" }) => (
  <Link to={to} className={`btn btn-sm btn-outline-${variante}`}>{children}</Link>
);

/** Tabla responsiva: en móvil se desplaza horizontalmente dentro de su contenedor. */
export function Tabla({ columnas, children, vacio = "Sin registros." }) {
  const filas = Array.isArray(children) ? children.length : children ? 1 : 0;
  return (
    <div className="table-responsive card shadow-sm">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>{columnas.map((c) => <th key={c} scope="col" className="text-nowrap">{c}</th>)}</tr>
        </thead>
        <tbody>
          {children}
          {!filas && <tr><td colSpan={columnas.length} className="text-center text-muted py-4">{vacio}</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export const fechaCorta = (iso) => new Date(iso).toLocaleDateString("es-CL");
