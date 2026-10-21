import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Inicio from "./pages/Inicio.jsx";
import Destinos from "./pages/Destinos.jsx";
import DestinoDetalle from "./pages/DestinoDetalle.jsx";
import Experiencias from "./pages/Experiencias.jsx";
import Paquetes from "./pages/Paquetes.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";
import Buscar from "./pages/Buscar.jsx";
import Carrito from "./pages/Carrito.jsx";
import Productos from "./pages/Productos.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx";
import Ofertas from "./pages/Ofertas.jsx";
import { Categorias, CategoriaDetalle } from "./pages/Categorias.jsx";
import { Blogs, BlogDetalle } from "./pages/Blogs.jsx";
import Checkout from "./pages/Checkout.jsx";
import { PagoCorrecto, PagoError } from "./pages/Pago.jsx";
import NoEncontrada from "./pages/NoEncontrada.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import { AdminOrdenes, AdminBoleta } from "./admin/AdminOrdenes.jsx";
import AdminProductosCriticos from "./admin/AdminProductosCriticos.jsx";
import { AdminProductos, AdminProductoForm, AdminProductosReportes } from "./admin/AdminProductos.jsx";
import AdminCategorias from "./admin/AdminCategorias.jsx";
import { AdminUsuarios, AdminUsuarioForm, AdminUsuarioHistorial } from "./admin/AdminUsuarios.jsx";
import { AdminReportes, AdminPerfil } from "./admin/AdminReportesPerfil.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="destinos" element={<Destinos />} />
        <Route path="destinos/:id" element={<DestinoDetalle />} />
        <Route path="experiencias" element={<Experiencias />} />
        <Route path="paquetes" element={<Paquetes />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/:id" element={<ProductoDetalle />} />
        <Route path="ofertas" element={<Ofertas />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="categorias/:slug" element={<CategoriaDetalle />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:id" element={<BlogDetalle />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Login modoInicial="registro" />} />
        <Route path="buscar" element={<Buscar />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="pago-correcto" element={<PagoCorrecto />} />
        <Route path="pago-error" element={<PagoError />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>

      {/* Panel de administración (solo rol Administrador) */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="ordenes" element={<AdminOrdenes />} />
        <Route path="ordenes/:numero" element={<AdminBoleta />} />
        <Route path="productos" element={<AdminProductos />} />
        <Route path="productos/nuevo" element={<AdminProductoForm />} />
        <Route path="productos/criticos" element={<AdminProductosCriticos />} />
        <Route path="productos/reportes" element={<AdminProductosReportes />} />
        <Route path="productos/:id/editar" element={<AdminProductoForm />} />
        <Route path="categorias" element={<AdminCategorias />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="usuarios/nuevo" element={<AdminUsuarioForm />} />
        <Route path="usuarios/:email/editar" element={<AdminUsuarioForm />} />
        <Route path="usuarios/:email/historial" element={<AdminUsuarioHistorial />} />
        <Route path="reportes" element={<AdminReportes />} />
        <Route path="perfil" element={<AdminPerfil />} />
      </Route>
    </Routes>
  );
}
