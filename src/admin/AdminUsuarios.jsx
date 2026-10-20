import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatoPrecio } from "../lib/formato.js";
import { guardarUsuarios, obtenerPedidos, obtenerUsuarios, totalPedido } from "../lib/adminStore.js";
import { usuariosAdmin } from "../lib/usuarios.js";
import MensajeError from "../components/MensajeError.jsx";
import { BtnLink, Insignia, Tabla, Titulo, fechaCorta } from "./ui.jsx";

/** Listar usuarios. */
export function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState(obtenerUsuarios);
  const eliminar = (u) => {
    if (u.rol === "admin" || !window.confirm(`¿Eliminar a ${u.nombre}?`)) return;
    guardarUsuarios(usuariosAdmin().filter((x) => x.email !== u.email));
    setUsuarios(obtenerUsuarios());
  };
  return (
    <>
      <Titulo titulo="Usuarios"><Link to="/admin/usuarios/nuevo" className="btn btn-sm btn-primary">+ Crear usuario</Link></Titulo>
      <Tabla columnas={["Nombre", "Correo", "Rol", "Estado", "Acciones"]}>
        {usuarios.map((u) => (
          <tr key={u.email}>
            <td>{u.nombre}</td><td>{u.email}</td>
            <td><Insignia texto={u.rol} tono={u.rol === "admin" ? "dark" : "info"} /></td>
            <td><Insignia texto={u.estado} tono={u.estado === "activo" ? "success" : "secondary"} /></td>
            <td className="text-nowrap">
              <BtnLink to={`/admin/usuarios/${encodeURIComponent(u.email)}/editar`}>Editar</BtnLink>{" "}
              <BtnLink to={`/admin/usuarios/${encodeURIComponent(u.email)}/historial`}>Historial</BtnLink>{" "}
              {u.rol !== "admin" && <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(u)}>Eliminar</button>}
            </td>
          </tr>
        ))}
      </Tabla>
    </>
  );
}

/** Crear nuevo usuario / Editar usuario. */
export function AdminUsuarioForm() {
  const { email } = useParams();
  const navigate = useNavigate();
  const existente = email ? obtenerUsuarios().find((u) => u.email === email) : null;
  const [f, setF] = useState(existente ? { ...existente, clave: "" } : { nombre: "", email: "", clave: "", rol: "cliente", estado: "activo" });
  const [error, setError] = useState("");
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));

  if (email && !existente) return <><Titulo titulo="Usuario no encontrado" /><Link to="/admin/usuarios">Volver</Link></>;

  const guardar = (e) => {
    e.preventDefault();
    const correo = f.email.trim().toLowerCase();
    const lista = usuariosAdmin();
    if (f.nombre.trim().length < 3) return setError("Ingresa el nombre completo.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) return setError("Ingresa un correo válido.");
    if (!existente && obtenerUsuarios().some((u) => u.email === correo)) return setError("Ya existe un usuario con ese correo.");
    const previo = lista.find((u) => u.email === (existente?.email ?? correo));
    if (!previo && f.clave.length < 8) return setError("La contraseña debe tener al menos 8 caracteres.");
    if (f.clave && f.clave.length < 8) return setError("La contraseña debe tener al menos 8 caracteres.");
    const nuevo = { nombre: f.nombre.trim(), email: correo, rol: f.rol, estado: f.estado, clave: f.clave || previo?.clave || "" };
    guardarUsuarios(previo ? lista.map((u) => (u.email === previo.email ? nuevo : u)) : [...lista, nuevo]);
    navigate("/admin/usuarios");
  };

  return (
    <>
      <Titulo titulo={existente ? "Editar usuario" : "Crear nuevo usuario"} />
      <form onSubmit={guardar} className="card card-body shadow-sm" noValidate>
        <MensajeError hayError={Boolean(error)} texto={error} />
        <div className="row g-3">
          <div className="col-12 col-md-6"><label className="form-label" htmlFor="u-nombre">Nombre completo</label><input id="u-nombre" className="form-control" value={f.nombre} onChange={set("nombre")} /></div>
          <div className="col-12 col-md-6"><label className="form-label" htmlFor="u-email">Correo</label><input id="u-email" type="email" className="form-control" value={f.email} onChange={set("email")} readOnly={Boolean(existente)} /></div>
          <div className="col-12 col-md-4"><label className="form-label" htmlFor="u-clave">Contraseña {existente && <small className="text-muted">(vacía = sin cambios)</small>}</label><input id="u-clave" type="password" className="form-control" value={f.clave} onChange={set("clave")} autoComplete="new-password" /></div>
          <div className="col-6 col-md-4"><label className="form-label" htmlFor="u-rol">Rol</label><select id="u-rol" className="form-select" value={f.rol} onChange={set("rol")}><option value="cliente">Cliente</option><option value="admin">Administrador</option></select></div>
          <div className="col-6 col-md-4"><label className="form-label" htmlFor="u-estado">Estado</label><select id="u-estado" className="form-select" value={f.estado} onChange={set("estado")}><option value="activo">Activo</option><option value="inactivo">Inactivo</option></select></div>
        </div>
        <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
          <button className="btn btn-primary" type="submit">Guardar</button>
          <Link to="/admin/usuarios" className="btn btn-outline-secondary">Cancelar</Link>
        </div>
      </form>
    </>
  );
}

/** Historial de compras de un usuario. */
export function AdminUsuarioHistorial() {
  const { email } = useParams();
  const u = obtenerUsuarios().find((x) => x.email === email);
  const compras = obtenerPedidos().filter((p) => p.email === email);
  return (
    <>
      <Titulo titulo={`Historial de compras${u ? " — " + u.nombre : ""}`}><BtnLink to="/admin/usuarios">Volver</BtnLink></Titulo>
      <p className="text-muted">{email} · {compras.length} compra(s) · {formatoPrecio(compras.reduce((s, p) => s + totalPedido(p), 0))} en total</p>
      <Tabla columnas={["N° orden", "Fecha", "Personas", "Total", ""]} vacio="Este usuario aún no registra compras.">
        {compras.map((p) => (
          <tr key={p.numero}><td>{p.numero}</td><td>{fechaCorta(p.fecha)}</td><td>{p.items.reduce((s, i) => s + i.cantidad, 0)}</td><td>{formatoPrecio(totalPedido(p))}</td>
            <td><BtnLink to={`/admin/ordenes/${p.numero}`}>Boleta</BtnLink></td></tr>
        ))}
      </Tabla>
    </>
  );
}
