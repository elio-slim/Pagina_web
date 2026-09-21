# Guion para la presentación individual (Situación evaluativa 2)

Cada integrante presenta **de forma individual** y debe poder explicar todo
el sitio, no solo su parte. Tiempo sugerido: 8–10 minutos.

## 1. HTML semántico (IE1.1.3 · 10%)
- Abre `index.html` y muestra `header`, `nav`, `main`, `section`, `article`, `figure` y `footer`.
- Explica **por qué** importa la semántica: accesibilidad (lectores de pantalla,
  `aria-current`, enlace "Saltar al contenido"), SEO y mantenimiento.
- Muestra: hipervínculos entre las 7 páginas, imágenes con `alt`, botones,
  video embebido (`iframe`) y formularios con `label` asociado.

## 2. CSS externo y personalizado (IE1.1.4 · 15%)
- Muestra que todas las páginas usan `<link rel="stylesheet" href="css/styles.css">`
  y que no hay estilos en línea.
- Explica las variables CSS (`:root`), la grilla responsiva y los `@media`
  (prueba el sitio en modo móvil con F12).
- Beneficio de mantenimiento: un cambio de color en `:root` se refleja en todo el sitio.

## 3. Validaciones en JavaScript (IE1.2.2 · 15%)
- Abre `paquetes.html#reserva`, presiona "Enviar" vacío y muestra los errores.
- Prueba: nombre sin apellido, teléfono inválido, fecha pasada, 20 personas,
  casilla sin marcar y un correo como `ana@gmial.com` (sugerencia).
- Explica en `js/validaciones.js`: `obtenerError`, `validarCampo`, `aria-invalid`,
  y por qué se valida en `blur` y luego en `input`.

## 4. Repositorio colaborativo (IE1.3.2 · 20%)
- Muestra en GitHub: commits con mensajes descriptivos (`feat:`, `style:`, `fix:`),
  ramas por integrante, Pull Requests y la pestaña Contributors.
- Justifica por qué importa comentar bien los cambios y repartir tareas
  (trazabilidad, revisión, resolución de conflictos).
