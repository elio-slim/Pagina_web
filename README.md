# Wanderly (React)

Migración de la tienda de viajes Wanderly (originalmente HTML5 + CSS3 + JavaScript Vanilla)
a **React 18 + Vite + React Router**. Mantiene todas las funciones: buscador, carrito,
cuenta (registro/login simulados con `localStorage`), validación de formularios y fichas de destino.

## Cómo ejecutarlo

```bash
npm install
npm run dev       # servidor de desarrollo en http://localhost:5173
npm run build     # versión de producción en /dist
npm run preview   # probar la versión de producción
```

> Ya no se puede abrir con doble clic (`file://`): React necesita un servidor (`npm run dev`).

## Estructura

```
src/
├── main.jsx / App.jsx          -> punto de entrada y rutas
├── styles/styles.css           -> la misma hoja de estilos del proyecto original
├── data/                       -> catalogo.js (productos), destinos.js (fichas), experiencias.js
├── lib/                        -> lógica pura: formato, almacén, buscador, validaciones, usuarios
├── context/                    -> AuthContext (sesión), CartContext (carrito), ToastContext (avisos)
├── hooks/                      -> useFormulario (validación), useTitulo
├── components/                 -> Header, Footer, Layout, Campo, ProductoCard, VideoDestino, Hero...
└── pages/                      -> una página por ruta
public/img/                     -> imágenes y SVG
```

## Equivalencias con el proyecto original

| Original                  | React                                                    |
| ------------------------- | -------------------------------------------------------- |
| `index.html`, `*.html`    | `src/pages/*.jsx` + rutas en `App.jsx`                   |
| header/footer repetidos   | `components/Header.jsx`, `Footer.jsx` dentro de `Layout` |
| `destino-detalle.html?destino=x` | `/destinos/:id`                                   |
| `catalogo.js`             | `data/catalogo.js`                                       |
| `auth.js`                 | `lib/usuarios.js` + `context/AuthContext.jsx`            |
| `carrito.js`              | `context/CartContext.jsx` + `pages/Carrito.jsx`          |
| `buscar.js`               | `lib/buscador.js` + `pages/Buscar.jsx`                   |
| `validaciones.js`         | `lib/validaciones.js` + `hooks/useFormulario.js` + `components/Campo.jsx` |
| `main.js` (menú, filtro, volver arriba) | `Header.jsx`, `Destinos.jsx`, `Footer.jsx` |

Las claves de `localStorage` (`wanderly_usuarios`, `wanderly_sesion`, `wanderly_carrito`,
`wanderly_pedidos`) son las mismas que en la versión HTML.

## Rutas

`/` · `/destinos` · `/destinos/:id` · `/experiencias` · `/paquetes` · `/nosotros` ·
`/contacto` · `/login` · `/registro` · `/buscar?q=` · `/carrito` · `/checkout` · `/pago-correcto` · `/pago-error` · `/ofertas` · `/categorias` · `/categorias/:slug` · `/blogs` · `/blogs/:id` · `/admin` (dashboard, órdenes, productos/CRUD, críticos, reportes, categorías/CRUD, usuarios, perfil)

## Extensión: Bootstrap, panel admin y pruebas

- **Bootstrap 5** (`npm i` ya lo incluye) se importa en `src/main.jsx`; ajustes en `src/styles/admin.css`.
- **Administrador de prueba:** `admin@wanderly.cl` / `Admin1234` (definido en `src/data/mock.js`). Panel en `/admin`.
- **Pruebas:** `npm test` (Karma + Jasmine en Chrome headless) o `npm run test:jsdom` (sin navegador). `npm run test:coverage` genera el informe HTML en `coverage/index.html` y el resumen en consola. Las pruebas existentes están en `test/wanderly.spec.jsx`; revisa `docs/COBERTURA.md` para el alcance y las limitaciones.


## Sincronización del inventario

El catálogo de la tienda se combina con `wanderly_admin_productos` en `localStorage`. Los productos inactivos no se muestran; el precio y la categoría provienen del panel, y al confirmar una compra se valida y descuenta el stock. Los productos nuevos se muestran con una imagen genérica hasta que se agregue un campo de imagen en el formulario admin. La persistencia es local al navegador: no es una base de datos compartida entre dispositivos.
