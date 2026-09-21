# Wanderly

Tienda online (e-commerce) de una agencia de viajes ficticia, desarrollado como Evaluación
Parcial N°1 de **DSY1104 – Desarrollo Fullstack II** (Duoc UC).

Construido solo con **HTML5, CSS3 y JavaScript Vanilla** (sin frameworks,
sin backend), tal como exige la pauta de la evaluación. Incluye buscador,
carrito de compras e inicio de sesión (simulados en el navegador).

## Estructura del proyecto

```
wanderly/
├── index.html
├── destinos.html
├── destino-detalle.html      -> contenido dinámico según ?destino=
├── experiencias.html
├── paquetes.html             -> formulario de reserva
├── nosotros.html
├── contacto.html             -> formulario de contacto
├── login.html                -> ingresar / crear cuenta (e-commerce)
├── buscar.html               -> resultados del buscador (?q=)
├── carrito.html              -> carrito y finalización de compra
├── css/
│   └── styles.css            -> única hoja de estilos externa (todas las páginas)
├── js/
│   ├── main.js               -> menú móvil, filtro de destinos, "volver arriba"
│   ├── validaciones.js       -> motor de validación de formularios
│   ├── destino-detalle.js    -> datos y render de cada destino
│   ├── catalogo.js           -> productos y precios de la tienda
│   ├── auth.js               -> registro, login y sesión (localStorage)
│   ├── carrito.js            -> carrito de compras y pedidos
│   └── buscar.js             -> buscador y ordenamiento de resultados
├── img/                      -> fotos JPG de destinos + SVG (hero, mapa, equipo, favicon)
├── TAREAS.md                 -> reparto de tareas del equipo
├── GIT-WORKFLOW.md           -> flujo de trabajo colaborativo con Git
├── PRESENTACION.md           -> guion para la presentación individual
└── README.md
```

## Funciones de e-commerce

- **Buscador** en la cabecera de todas las páginas (`buscar.html?q=...`), sin distinguir tildes ni mayúsculas, con orden por precio.
- **Carrito**: botón «Agregar al carrito» en destinos, ficha de destino, paquetes y resultados; cantidad de personas editable (1 a 12); total y contador en la cabecera.
- **Cuenta**: registro e inicio de sesión con validaciones (contraseña de 8+ caracteres con letras y números). Para finalizar la compra se exige sesión.
- **Compra**: genera un número de pedido y lo guarda en `localStorage`. El pago es **simulado**: no se piden datos de tarjeta.
- **Limitación**: al no haber backend, cuentas, carrito y pedidos viven solo en el navegador (`localStorage`); no es un sistema de seguridad real.

## Cómo abrir el proyecto

Basta con abrir `index.html` con doble clic: el header y el footer están
escritos dentro de cada página, por lo que **ya no dependen de un servidor
local** y las imágenes se ven siempre (son archivos locales en `img/`).

Si prefieres un servidor local (por ejemplo con la extensión Live Server de
VS Code o `python -m http.server 5500`), también funciona igual.

> Los videos (YouTube), el mapa de Santiago (OpenStreetMap) y las tipografías
> (Google Fonts) requieren conexión a internet. Sin conexión, el sitio sigue
> siendo legible gracias a las fuentes de respaldo.

## Cómo cumple la pauta de la evaluación

| Indicador | Dónde se evidencia |
|-----------|--------------------|
| IE1.1.1 HTML semántico, hipervínculos, imágenes, botones, videos, navegación, formularios y footer | `header`, `nav`, `main`, `section`, `article`, `figure`, `footer` en las 7 páginas; `<img>` con `alt`; botones `<button>`; video embebido en `index.html` y `destino-detalle.html`; formularios en `paquetes.html` y `contacto.html` |
| IE1.1.2 CSS personalizado y externo | Todas las páginas enlazan `css/styles.css`; no hay estilos en línea ni bloques `<style>` |
| IE1.2.1 Validaciones con JavaScript, sugerencias y mensajes personalizados | `js/validaciones.js` (mensaje específico por campo, pistas, sugerencia de correo, contador de caracteres, `aria-invalid`) |
| IE1.3.1 Cambios coherentes en repositorio colaborativo | `GIT-WORKFLOW.md` y `TAREAS.md`; el historial real debe generarlo el equipo (ver esos archivos) |

## Fotos de los destinos

Las 6 fotos de destinos están en `img/` como JPG: `atacama.jpg`,
`valle-sagrado.jpg`, `chiloe.jpg`, `bariloche.jpg`, `cartagena.jpg` y
`torres-del-paine.jpg`. Se pueden reemplazar por fotos reales **sin tocar el
código**, siempre que conserven el mismo nombre y la extensión `.jpg`:

- Formato JPG, proporción 4:3 (recomendado 1200 × 900 px) y menos de 300 KB
  (se pueden comprimir en https://squoosh.app).
- Usar solo fotos propias o con licencia libre (Unsplash, Pexels, Wikimedia
  Commons) y anotar el crédito en la tabla de abajo.
- Si la foto nueva muestra otra escena, actualizar el texto `alt` en
  `index.html`, `destinos.html`, `destino-detalle.html`,
  `js/destino-detalle.js` y `js/catalogo.js`.

### Créditos de imágenes

| Archivo | Autor | Fuente / licencia |
|---------|-------|-------------------|
| atacama.jpg | (completar) | (completar) |
| valle-sagrado.jpg | (completar) | (completar) |
| chiloe.jpg | (completar) | (completar) |
| bariloche.jpg | (completar) | (completar) |
| cartagena.jpg | (completar) | (completar) |
| torres-del-paine.jpg | (completar) | (completar) |

## Videos por destino

Solo San Pedro de Atacama tiene un video configurado. Para agregar los demás,
abre `js/destino-detalle.js` y reemplaza `videoId: null` por el ID del video de
YouTube (lo que va después de `v=` en la URL).

## Equipo

Ver reparto de responsabilidades en [`TAREAS.md`](./TAREAS.md).

## Documento ERS

El documento ERS (Especificación de Requisitos del Software, versión 1)
se entrega por separado junto con el enlace de GitHub y este proyecto comprimido.


## Fotografías reales

Las imágenes de destinos fueron reemplazadas por fotografías de Wikimedia Commons mediante URLs directas. Se mantienen los créditos y licencias correspondientes en el pie de página. El sitio necesita conexión a Internet para cargar estas fotografías.
