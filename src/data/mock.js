/**
 * mock.js — Fuente de datos simulada (sin backend).
 *
 * ADMINISTRADOR de prueba para entrar al panel (/admin):
 *     correo:     admin@wanderly.cl
 *     contraseña: Admin1234
 * (Credenciales en texto plano SOLO porque es un mock académico; en un sistema real
 *  la autenticación y el hash de contraseñas ocurren en el servidor.)
 */
import { PRODUCTOS } from "./catalogo.js";

export const USUARIOS_MOCK = [
  { nombre: "Administrador Wanderly", email: "admin@wanderly.cl", clave: "Admin1234", rol: "admin", estado: "activo" },
  { nombre: "María González", email: "maria@correo.com", clave: "Cliente123", rol: "cliente", estado: "activo" },
  { nombre: "Juan Pérez", email: "juan@correo.com", clave: "Cliente123", rol: "cliente", estado: "activo" },
  { nombre: "Camila Rojas", email: "camila@correo.com", clave: "Cliente123", rol: "cliente", estado: "inactivo" },
];

export const CATEGORIAS_SEED = [
  { slug: "desierto", nombre: "Desierto y astronomía", descripcion: "Salares, géiseres y los cielos más limpios del hemisferio sur.", ids: ["atacama"] },
  { slug: "patagonia", nombre: "Patagonia y montaña", descripcion: "Lagos glaciares, trekking y granito sobre lagos turquesa.", ids: ["bariloche", "torres-del-paine"] },
  { slug: "cultura", nombre: "Cultura e historia", descripcion: "Ciudades coloniales, terrazas incas y patrimonio vivo.", ids: ["valle-sagrado", "cartagena"] },
  { slug: "islas-sur", nombre: "Islas del sur", descripcion: "Palafitos, iglesias de madera y gastronomía chilota.", ids: ["chiloe"] },
  { slug: "paquetes", nombre: "Paquetes", descripcion: "Viajes armados para que solo te ocupes de disfrutar.", ids: ["paquete-explorador", "paquete-trotamundos"] },
];

const STOCK = { atacama: [25, 5], "valle-sagrado": [4, 5], chiloe: [18, 5], bariloche: [3, 5], cartagena: [12, 5], "torres-del-paine": [2, 5], "paquete-explorador": [40, 8], "paquete-trotamundos": [9, 10] };
const CAT_DE = Object.fromEntries(CATEGORIAS_SEED.flatMap((c) => c.ids.map((id) => [id, c.slug])));

/** Inventario del panel: el catálogo de la tienda + stock, stock crítico y categoría. */
export const PRODUCTOS_ADMIN_SEED = PRODUCTOS.map((p) => ({
  id: p.id, nombre: p.nombre, tipo: p.tipo, pais: p.pais, precio: p.precio,
  stock: STOCK[p.id][0], stockCritico: STOCK[p.id][1], categoria: CAT_DE[p.id], estado: "activo",
}));

const dia = (n) => new Date(Date.now() - n * 86400000).toISOString();
const linea = (id, cantidad) => ({ id, cantidad, precio: PRODUCTOS.find((p) => p.id === id).precio });
const total = (items) => items.reduce((s, i) => s + i.precio * i.cantidad, 0);
const pedido = (numero, n, email, nombre, items) => ({ numero, fecha: dia(n), email, nombre, estado: "Pagado", total: total(items), items });

/** Órdenes de ejemplo; las compras reales hechas en el checkout se suman a estas. */
export const PEDIDOS_SEED = [
  pedido("WDL-100101", 0, "maria@correo.com", "María González", [linea("atacama", 2), linea("chiloe", 1)]),
  pedido("WDL-100102", 0, "juan@correo.com", "Juan Pérez", [linea("paquete-trotamundos", 2)]),
  pedido("WDL-100103", 1, "maria@correo.com", "María González", [linea("bariloche", 1)]),
  pedido("WDL-100104", 2, "camila@correo.com", "Camila Rojas", [linea("torres-del-paine", 2)]),
  pedido("WDL-100105", 4, "juan@correo.com", "Juan Pérez", [linea("cartagena", 3)]),
  pedido("WDL-100106", 6, "maria@correo.com", "María González", [linea("paquete-explorador", 4)]),
];
