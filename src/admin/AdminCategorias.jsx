import { useState } from "react";
import { useCategoriasAdmin, useProductosAdmin } from "../lib/adminStore.js";
import { guardarAlmacen, leerAlmacen } from "../lib/almacen.js";
import MensajeError from "../components/MensajeError.jsx";
import { Tabla, Titulo } from "./ui.jsx";

const slug = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function AdminCategorias() {
  const [cats, setCats] = useCategoriasAdmin();
  const [productos, setProductos] = useProductosAdmin();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");
  const [editando, setEditando] = useState(null);
  const [edNombre, setEdNombre] = useState("");
  const [edDescripcion, setEdDescripcion] = useState("");

  const agregar = (e) => {
    e.preventDefault();
    const s = slug(nombre);
    if (nombre.trim().length < 3) return setError("El nombre debe tener al menos 3 caracteres.");
    if (cats.some((c) => c.slug === s)) return setError("Ya existe una categoría con ese nombre.");
    setCats((l) => [...l, { slug: s, nombre: nombre.trim(), descripcion: descripcion.trim() || "Nueva categoría.", ids: [] }]);
    setNombre(""); setDescripcion(""); setError("");
  };

  const comenzarEdicion = (c) => { setEditando(c.slug); setEdNombre(c.nombre); setEdDescripcion(c.descripcion); setError(""); };
  const guardarEdicion = (e) => {
    e.preventDefault(); const nuevoSlug = slug(edNombre);
    if (edNombre.trim().length < 3) return setError("El nombre debe tener al menos 3 caracteres.");
    if (cats.some((c) => c.slug !== editando && c.slug === nuevoSlug)) return setError("Ya existe una categoría con ese nombre.");
    setCats((lista) => lista.map((c) => c.slug !== editando ? c : { ...c, slug: nuevoSlug, nombre: edNombre.trim(), descripcion: edDescripcion.trim() || "Categoría de viajes." }));
    if (nuevoSlug !== editando) setProductos((lista) => lista.map((p) => p.categoria === editando ? { ...p, categoria: nuevoSlug } : p));
    setEditando(null); setError("");
  };

  return (
    <>
      <Titulo titulo="Categorías" />
      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <form onSubmit={agregar} className="card card-body shadow-sm" noValidate>
            <h2 className="h5">Agregar nueva categoría</h2>
            <MensajeError hayError={Boolean(error)} texto={error} />
            <label className="form-label" htmlFor="c-nombre">Nombre</label>
            <input id="c-nombre" className="form-control mb-3" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <label className="form-label" htmlFor="c-desc">Descripción</label>
            <textarea id="c-desc" className="form-control mb-3" rows="3" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            <button className="btn btn-primary" type="submit">Agregar categoría</button>
          </form>
        </div>
        <div className="col-12 col-lg-7">
          <Tabla columnas={["Categoría", "Productos", "Acciones"]}>
            {cats.map((c) => (
              <tr key={c.slug}>
                <td><strong>{c.nombre}</strong><br /><small className="text-muted">{c.descripcion}</small></td>
                <td>{productos.filter((p) => p.categoria === c.slug || c.ids.includes(p.id)).length}</td>
                <td className="text-nowrap"><button className="btn btn-sm btn-outline-primary me-2" onClick={() => comenzarEdicion(c)}>Editar</button><button className="btn btn-sm btn-outline-danger" onClick={() => { if (window.confirm(`¿Eliminar la categoría «${c.nombre}»?`)) setCats((l) => l.filter((x) => x.slug !== c.slug)); }}>Eliminar</button></td>
              </tr>
            ))}
          </Tabla>
          {editando && <form className="card card-body mt-3" onSubmit={guardarEdicion}>
            <h2 className="h5">Editar categoría</h2><MensajeError hayError={Boolean(error)} texto={error} />
            <label className="form-label" htmlFor="ce-nombre">Nombre</label><input id="ce-nombre" className="form-control mb-3" value={edNombre} onChange={(e) => setEdNombre(e.target.value)} />
            <label className="form-label" htmlFor="ce-desc">Descripción</label><textarea id="ce-desc" className="form-control mb-3" value={edDescripcion} onChange={(e) => setEdDescripcion(e.target.value)} />
            <div className="d-flex gap-2"><button className="btn btn-primary" type="submit">Guardar cambios</button><button className="btn btn-outline-secondary" type="button" onClick={() => { setEditando(null); setError(""); }}>Cancelar</button></div>
          </form>}
        </div>
      </div>
    </>
  );
}
