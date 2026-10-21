import ProductoCard from "./ProductoCard.jsx";

/** Grilla responsiva (1 columna móvil, 2 tablet, 3 escritorio) que renderiza un conjunto de productos. */
export default function ListaProductos({ productos, mostrarTipo = true, vacio = "No hay productos para mostrar." }) {
  if (!productos.length) return <p className="alert alert-light border">{vacio}</p>;
  return (
    <ul className="row g-4 list-unstyled m-0" data-testid="lista-productos">
      {productos.map((p) => (
        <li className="col-12 col-md-6 col-lg-4" key={p.id}>
          <ProductoCard producto={p} mostrarTipo={mostrarTipo} />
        </li>
      ))}
    </ul>
  );
}
