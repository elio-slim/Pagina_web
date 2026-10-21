import { useState } from "react";
import { buscarProducto } from "../data/catalogo.js";
import { useAuth } from "../context/AuthContext.jsx";
import { formatoPrecio } from "../lib/formato.js";
import { guardarUsuarios, obtenerPedidos, totalPedido } from "../lib/adminStore.js";
import { usuariosAdmin, CLAVE_SESION } from "../lib/usuarios.js";
import { guardarAlmacen } from "../lib/almacen.js";
import { Metrica, Tabla, Titulo, fechaCorta } from "./ui.jsx";

/** Reportes: ventas por producto y por día. */
export function AdminReportes() {
  const pedidos = obtenerPedidos();
  const porProducto = {};
  const porDia = {};
  pedidos.forEach((p) => {
    porDia[p.fecha.slice(0, 10)] = (porDia[p.fecha.slice(0, 10)] || 0) + totalPedido(p);
    p.items.forEach((i) => {
      const a = (porProducto[i.id] ||= { personas: 0, monto: 0 });
      a.personas += i.cantidad; a.monto += i.cantidad * i.precio;
    });
  });
  const ranking = Object.entries(porProducto).sort((a, b) => b[1].monto - a[1].monto);
  const dias = Object.entries(porDia).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 7);
  const max = Math.max(1, ...dias.map(([, v]) => v));
  return (
    <>
      <Titulo titulo="Reportes"><button className="btn btn-sm btn-outline-dark" onClick={() => window.print()}>Imprimir</button></Titulo>
      <div className="row g-4">
        <div className="col-12 col-xl-6">
          <h2 className="h5">Ventas por producto</h2>
          <Tabla columnas={["Producto", "Personas", "Monto"]}>
            {ranking.map(([id, v]) => <tr key={id}><td>{buscarProducto(id)?.nombre || id}</td><td>{v.personas}</td><td>{formatoPrecio(v.monto)}</td></tr>)}
          </Tabla>
        </div>
        <div className="col-12 col-xl-6">
          <h2 className="h5">Ventas por día (últimos 7 con ventas)</h2>
          <Tabla columnas={["Día", "Monto", ""]}>
            {dias.map(([d, v]) => (
              <tr key={d}><td>{fechaCorta(d + "T12:00:00")}</td><td>{formatoPrecio(v)}</td>
                <td style={{ minWidth: 120 }}><div className="progress"><div className="progress-bar" style={{ width: `${(v / max) * 100}%` }} /></div></td></tr>
            ))}
          </Tabla>
        </div>
      </div>
    </>
  );
}

/** Perfil del administrador (nombre editable). */
export function AdminPerfil() {
  const { sesion } = useAuth();
  const [nombre, setNombre] = useState(sesion.nombre);
  const [ok, setOk] = useState(false);
  const guardar = (e) => {
    e.preventDefault();
    if (nombre.trim().length < 3) return;
    guardarUsuarios(usuariosAdmin().map((u) => (u.email === sesion.email ? { ...u, nombre: nombre.trim() } : u)));
    guardarAlmacen(CLAVE_SESION, { ...sesion, nombre: nombre.trim() });
    setOk(true);
  };
  return (
    <>
      <Titulo titulo="Perfil del administrador" />
      <div className="row g-4">
        <div className="col-12 col-md-5 col-xl-4"><Metrica titulo="Rol" valor="Administrador" detalle={sesion.email} /></div>
        <div className="col-12 col-md-7 col-xl-6">
          <form onSubmit={guardar} className="card card-body shadow-sm">
            <label className="form-label" htmlFor="perfil-nombre">Nombre</label>
            <input id="perfil-nombre" className="form-control mb-3" value={nombre} onChange={(e) => { setNombre(e.target.value); setOk(false); }} />
            <button className="btn btn-primary align-self-start" type="submit">Guardar cambios</button>
            {ok && <p className="text-success mt-3 mb-0" role="status">Perfil actualizado. Se verá reflejado al volver a iniciar sesión.</p>}
          </form>
        </div>
      </div>
    </>
  );
}
