import { Link, useParams } from "react-router-dom";
import { buscarProducto } from "../data/catalogo.js";
import { formatoPrecio } from "../lib/formato.js";
import { obtenerPedidos, totalPedido } from "../lib/adminStore.js";
import { BtnLink, Insignia, Tabla, Titulo, fechaCorta } from "./ui.jsx";

export function AdminOrdenes() {
  const pedidos = obtenerPedidos();
  return (
    <>
      <Titulo titulo="Órdenes / Boletas" />
      <Tabla columnas={["N° orden", "Fecha", "Cliente", "Ítems", "Total", "Estado", ""]}>
        {pedidos.map((p) => (
          <tr key={p.numero}>
            <td>{p.numero}</td><td>{fechaCorta(p.fecha)}</td><td>{p.nombre || p.email}</td>
            <td>{p.items.reduce((s, i) => s + i.cantidad, 0)}</td><td>{formatoPrecio(totalPedido(p))}</td>
            <td><Insignia texto={p.estado || "Pagado"} tono="success" /></td>
            <td><BtnLink to={`/admin/ordenes/${p.numero}`}>Mostrar boleta</BtnLink></td>
          </tr>
        ))}
      </Tabla>
    </>
  );
}

export function AdminBoleta() {
  const { numero } = useParams();
  const p = obtenerPedidos().find((x) => x.numero === numero);
  if (!p) return <><Titulo titulo="Boleta no encontrada" /><Link to="/admin/ordenes">Volver a órdenes</Link></>;
  const total = totalPedido(p);
  const neto = Math.round(total / 1.19);
  return (
    <>
      <Titulo titulo={`Boleta ${p.numero}`}>
        <button className="btn btn-sm btn-outline-dark d-print-none" onClick={() => window.print()}>Imprimir</button>
        <BtnLink to="/admin/ordenes">Volver</BtnLink>
      </Titulo>
      <div className="card shadow-sm"><div className="card-body">
        <div className="row g-3 mb-3">
          <div className="col-12 col-md-6"><strong>Cliente</strong><br />{p.nombre || "—"}<br />{p.email}</div>
          <div className="col-12 col-md-6 text-md-end"><strong>Fecha</strong><br />{fechaCorta(p.fecha)}<br /><Insignia texto={p.estado || "Pagado"} tono="success" /></div>
          {p.envio && <div className="col-12"><strong>Entrega</strong><br />{p.envio.direccion}, {p.envio.comuna} — {p.envio.region}</div>}
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead><tr><th>Producto</th><th className="text-end">Personas</th><th className="text-end">Precio</th><th className="text-end">Subtotal</th></tr></thead>
            <tbody>
              {p.items.map((i) => (
                <tr key={i.id}><td>{buscarProducto(i.id)?.nombre || i.id}</td><td className="text-end">{i.cantidad}</td><td className="text-end">{formatoPrecio(i.precio)}</td><td className="text-end">{formatoPrecio(i.precio * i.cantidad)}</td></tr>
              ))}
            </tbody>
            <tfoot>
              <tr><td colSpan="3" className="text-end">Neto</td><td className="text-end">{formatoPrecio(neto)}</td></tr>
              <tr><td colSpan="3" className="text-end">IVA (19%)</td><td className="text-end">{formatoPrecio(total - neto)}</td></tr>
              <tr className="fw-bold"><td colSpan="3" className="text-end">Total</td><td className="text-end">{formatoPrecio(total)}</td></tr>
            </tfoot>
          </table>
        </div>
      </div></div>
    </>
  );
}
