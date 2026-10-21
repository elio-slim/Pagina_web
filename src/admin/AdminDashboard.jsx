import { Link } from "react-router-dom";
import { formatoPrecio } from "../lib/formato.js";
import { hoyISO, obtenerPedidos, obtenerUsuarios, totalPedido, useProductosAdmin } from "../lib/adminStore.js";
import { Metrica, Tabla, Titulo, fechaCorta } from "./ui.jsx";

export default function AdminDashboard() {
  const [productos] = useProductosAdmin();
  const pedidos = obtenerPedidos();
  const usuarios = obtenerUsuarios();
  const hoy = pedidos.filter((p) => p.fecha.slice(0, 10) === hoyISO());
  const criticos = productos.filter((p) => p.stock <= p.stockCritico);
  const ventas = pedidos.reduce((s, p) => s + totalPedido(p), 0);

  return (
    <>
      <Titulo titulo="Dashboard" />
      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-3"><Metrica titulo="Ventas totales" valor={formatoPrecio(ventas)} detalle={`${pedidos.length} órdenes`} /></div>
        <div className="col-6 col-xl-3"><Metrica titulo="Órdenes de hoy" valor={hoy.length} detalle={formatoPrecio(hoy.reduce((s, p) => s + totalPedido(p), 0))} /></div>
        <div className="col-6 col-xl-3"><Metrica titulo="Productos críticos" valor={criticos.length} tono={criticos.length ? "danger" : "success"} detalle="Stock en el mínimo o bajo él" /></div>
        <div className="col-6 col-xl-3"><Metrica titulo="Usuarios" valor={usuarios.length} detalle={`${usuarios.filter((u) => u.rol === "admin").length} administrador(es)`} /></div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-8">
          <h2 className="h5">Últimas órdenes</h2>
          <Tabla columnas={["N°", "Fecha", "Cliente", "Total", ""]}>
            {pedidos.slice(0, 5).map((p) => (
              <tr key={p.numero}>
                <td>{p.numero}</td><td>{fechaCorta(p.fecha)}</td><td>{p.nombre || p.email}</td><td>{formatoPrecio(totalPedido(p))}</td>
                <td><Link className="btn btn-sm btn-outline-dark" to={`/admin/ordenes/${p.numero}`}>Ver boleta</Link></td>
              </tr>
            ))}
          </Tabla>
        </div>
        <div className="col-12 col-xl-4">
          <h2 className="h5">Actividad diaria</h2>
          <ul className="list-group shadow-sm">
            <li className="list-group-item">🧾 {hoy.length} orden(es) registradas hoy</li>
            {criticos.slice(0, 4).map((p) => (
              <li className="list-group-item list-group-item-warning" key={p.id}>⚠️ Stock crítico: {p.nombre} ({p.stock} u.)</li>
            ))}
            <li className="list-group-item">👤 {usuarios.filter((u) => u.estado === "activo").length} usuarios activos</li>
          </ul>
        </div>
      </div>
    </>
  );
}
