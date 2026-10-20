import { useProductosAdmin } from "../lib/adminStore.js";
import { BtnLink, Insignia, Tabla, Titulo } from "./ui.jsx";

/** Listado de productos críticos (stock ≤ stock crítico). */
export default function AdminProductosCriticos() {
  const [productos] = useProductosAdmin();
  const criticos = productos.filter((p) => p.stock <= p.stockCritico);
  return (
    <>
      <Titulo titulo="Productos críticos"><BtnLink to="/admin/productos">Ver todos</BtnLink></Titulo>
      <Tabla columnas={["Producto", "Stock", "Mínimo", "Faltante", ""]} vacio="No hay productos en estado crítico.">
        {criticos.map((p) => (
          <tr key={p.id}>
            <td>{p.nombre}</td><td><Insignia texto={p.stock} tono="danger" /></td><td>{p.stockCritico}</td><td>{Math.max(0, p.stockCritico - p.stock + 1)}</td>
            <td><BtnLink to={`/admin/productos/${p.id}/editar`}>Reponer</BtnLink></td>
          </tr>
        ))}
      </Tabla>
    </>
  );
}
