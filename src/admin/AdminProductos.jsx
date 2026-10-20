import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatoPrecio } from "../lib/formato.js";
import { useCategoriasAdmin, useProductosAdmin } from "../lib/adminStore.js";
import MensajeError from "../components/MensajeError.jsx";
import { BtnLink, Insignia, Tabla, Titulo } from "./ui.jsx";

const nombreCategoria = (cats, slug) => cats.find((c) => c.slug === slug)?.nombre || "Sin categoría";

/** Mostrar / listar productos. */
export function AdminProductos() {
  const [productos, setProductos] = useProductosAdmin();
  const [cats] = useCategoriasAdmin();
  const eliminar = (p) => window.confirm(`¿Eliminar «${p.nombre}»?`) && setProductos((l) => l.filter((x) => x.id !== p.id));
  return (
    <>
      <Titulo titulo="Productos">
        <BtnLink to="/admin/productos/criticos" variante="danger">Críticos</BtnLink>
        <BtnLink to="/admin/productos/reportes">Reportes</BtnLink>
        <Link to="/admin/productos/nuevo" className="btn btn-sm btn-primary">+ Agregar producto</Link>
      </Titulo>
      <Tabla columnas={["Producto", "Tipo", "Categoría", "Precio", "Stock", "Estado", "Acciones"]}>
        {productos.map((p) => (
          <tr key={p.id}>
            <td>{p.nombre}</td><td>{p.tipo}</td><td>{nombreCategoria(cats, p.categoria)}</td><td>{formatoPrecio(p.precio)}</td>
            <td>{p.stock <= p.stockCritico ? <Insignia texto={`${p.stock} (crítico)`} tono="danger" /> : p.stock}</td>
            <td><Insignia texto={p.estado} tono={p.estado === "activo" ? "success" : "secondary"} /></td>
            <td className="text-nowrap">
              <BtnLink to={`/admin/productos/${p.id}/editar`}>Editar</BtnLink>{" "}
              <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(p)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </Tabla>
    </>
  );
}

/** Agregar nuevo producto / Editar producto (mismo formulario). */
export function AdminProductoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useProductosAdmin();
  const [cats] = useCategoriasAdmin();
  const existente = productos.find((p) => p.id === id);
  const [f, setF] = useState(existente || { nombre: "", tipo: "Destino", pais: "", precio: "", stock: "", stockCritico: 5, categoria: cats[0]?.slug || "", estado: "activo" });
  const [error, setError] = useState("");
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));

  if (id && !existente) return <><Titulo titulo="Producto no encontrado" /><Link to="/admin/productos">Volver</Link></>;

  const guardar = (e) => {
    e.preventDefault();
    const precio = Number(f.precio), stock = Number(f.stock), critico = Number(f.stockCritico);
    if (f.nombre.trim().length < 3) return setError("El nombre debe tener al menos 3 caracteres.");
    if (!(precio > 0)) return setError("El precio debe ser mayor que cero.");
    if (!Number.isInteger(stock) || stock < 0) return setError("El stock debe ser un entero igual o mayor que 0.");
    const nuevo = { ...f, nombre: f.nombre.trim(), precio, stock, stockCritico: critico };
    if (existente) setProductos((l) => l.map((p) => (p.id === id ? nuevo : p)));
    else setProductos((l) => [...l, { ...nuevo, id: f.nombre.trim().toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString().slice(-4) }]);
    navigate("/admin/productos");
  };

  return (
    <>
      <Titulo titulo={existente ? "Editar producto" : "Agregar nuevo producto"} />
      <form onSubmit={guardar} className="card shadow-sm card-body" noValidate>
        <MensajeError hayError={Boolean(error)} texto={error} />
        <div className="row g-3">
          <div className="col-12 col-md-6"><label className="form-label" htmlFor="p-nombre">Nombre</label><input id="p-nombre" className="form-control" value={f.nombre} onChange={set("nombre")} /></div>
          <div className="col-6 col-md-3"><label className="form-label" htmlFor="p-tipo">Tipo</label><select id="p-tipo" className="form-select" value={f.tipo} onChange={set("tipo")}><option>Destino</option><option>Paquete</option></select></div>
          <div className="col-6 col-md-3"><label className="form-label" htmlFor="p-pais">País</label><input id="p-pais" className="form-control" value={f.pais} onChange={set("pais")} /></div>
          <div className="col-6 col-md-3"><label className="form-label" htmlFor="p-precio">Precio (CLP)</label><input id="p-precio" type="number" min="1" className="form-control" value={f.precio} onChange={set("precio")} /></div>
          <div className="col-6 col-md-3"><label className="form-label" htmlFor="p-stock">Stock</label><input id="p-stock" type="number" min="0" className="form-control" value={f.stock} onChange={set("stock")} /></div>
          <div className="col-6 col-md-3"><label className="form-label" htmlFor="p-critico">Stock crítico</label><input id="p-critico" type="number" min="0" className="form-control" value={f.stockCritico} onChange={set("stockCritico")} /></div>
          <div className="col-6 col-md-3"><label className="form-label" htmlFor="p-estado">Estado</label><select id="p-estado" className="form-select" value={f.estado} onChange={set("estado")}><option value="activo">Activo</option><option value="inactivo">Inactivo</option></select></div>
          <div className="col-12 col-md-6"><label className="form-label" htmlFor="p-cat">Categoría</label>
            <select id="p-cat" className="form-select" value={f.categoria} onChange={set("categoria")}>{cats.map((c) => <option key={c.slug} value={c.slug}>{c.nombre}</option>)}</select></div>
        </div>
        <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
          <button className="btn btn-primary" type="submit">Guardar</button>
          <Link to="/admin/productos" className="btn btn-outline-secondary">Cancelar</Link>
        </div>
      </form>
    </>
  );
}

/** Reporte de productos: valor de inventario por categoría. */
export function AdminProductosReportes() {
  const [productos] = useProductosAdmin();
  const [cats] = useCategoriasAdmin();
  const filas = cats.map((c) => {
    const ps = productos.filter((p) => p.categoria === c.slug);
    return { nombre: c.nombre, cantidad: ps.length, unidades: ps.reduce((s, p) => s + p.stock, 0), valor: ps.reduce((s, p) => s + p.stock * p.precio, 0) };
  });
  const max = Math.max(1, ...filas.map((f) => f.valor));
  return (
    <>
      <Titulo titulo="Reporte de productos"><button className="btn btn-sm btn-outline-dark" onClick={() => window.print()}>Imprimir</button></Titulo>
      <Tabla columnas={["Categoría", "Productos", "Unidades", "Valor de inventario", ""]}>
        {filas.map((f) => (
          <tr key={f.nombre}>
            <td>{f.nombre}</td><td>{f.cantidad}</td><td>{f.unidades}</td><td>{formatoPrecio(f.valor)}</td>
            <td style={{ minWidth: 140 }}><div className="progress" aria-hidden="true"><div className="progress-bar bg-success" style={{ width: `${(f.valor / max) * 100}%` }} /></div></td>
          </tr>
        ))}
      </Tabla>
    </>
  );
}
