<<<<<<< HEAD
# proyecto-p-gina-web-
=======
# Wanderly

Sitio web de una agencia de viajes ficticia, desarrollado como Evaluación
Parcial N°1 de **DSY1104 – Desarrollo Fullstack II** (Duoc UC).

Construido solo con **HTML5, CSS3 y JavaScript Vanilla** (sin frameworks,
sin backend), tal como exige la pauta de la evaluación.

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
├── css/
│   └── styles.css            -> única hoja de estilos externa (todas las páginas)
├── js/
│   ├── main.js               -> menú móvil, filtro de destinos, "volver arriba"
│   ├── validaciones.js       -> motor de validación de formularios
│   └── destino-detalle.js    -> datos y render de cada destino
├── img/                      -> ilustraciones SVG locales (destinos, hero, mapa, equipo)
├── TAREAS.md                 -> reparto de tareas del equipo
├── GIT-WORKFLOW.md           -> flujo de trabajo colaborativo con Git
├── PRESENTACION.md           -> guion para la presentación individual
└── README.md
```

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

## Cambiar las imágenes por fotos reales (opcional)

Las imágenes de `img/` son ilustraciones SVG. Si quieres fotos reales, guárdalas
con el mismo nombre base y cambia la extensión en los `src` (o conserva el
nombre y el formato). Recuerda mantener el atributo `alt` descriptivo.

## Videos por destino

Solo San Pedro de Atacama tiene un video configurado. Para agregar los demás,
abre `js/destino-detalle.js` y reemplaza `videoId: null` por el ID del video de
YouTube (lo que va después de `v=` en la URL).

## Equipo

Ver reparto de responsabilidades en [`TAREAS.md`](./TAREAS.md).

## Documento ERS

El documento ERS (Especificación de Requisitos del Software, versión 1)
se entrega por separado junto con el enlace de GitHub y este proyecto comprimido.
>>>>>>> 9c52cb9 (chore: estructura inicial del proyecto Wanderly)
