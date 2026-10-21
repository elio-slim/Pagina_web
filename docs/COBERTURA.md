# Informe de pruebas y cobertura — Wanderly

## Ejecución

- `npm run build`: compilación de producción.
- `npm run test:jsdom`: pruebas Jasmine/Karma en jsdom, sin necesitar Chrome.
- `npm test`: pruebas con Chrome Headless; requiere Chrome/Chromium disponible.
- `npm run test:coverage`: ejecuta las pruebas con instrumentación y genera `coverage/index.html`, `coverage/lcov.info` y un resumen en consola.

## Alcance conocido

La suite de `test/wanderly.spec.jsx` contiene 10 pruebas de componentes y comportamiento básico. La cobertura de pruebas no equivale a cobertura total del proyecto. Se deben revisar especialmente las validaciones de `src/lib/validaciones.js`, el checkout, el carrito y el CRUD administrativo. Resultado de `npm run test:coverage` con las 10 pruebas (10/10 exitosas): sentencias 59,27 % (262/442), ramas 37,97 % (109/287), funciones 57,41 % (89/155) y líneas 65,49 % (224/342). Capturas en `docs/evidencias/`.

## Pruebas manuales recomendadas

1. Crear un producto desde `/admin/productos/nuevo` y confirmar que aparece en `/productos`.
2. Editar su precio/estado/categoría y confirmar el reflejo en la tienda.
3. Marcar un producto como inactivo y comprobar que deja de aparecer.
4. Comprar una cantidad menor o igual al stock y confirmar que el stock disminuye.
5. Intentar comprar más unidades que el stock y verificar que no se crea el pedido.
6. Crear, editar y eliminar una categoría y revisar `/categorias`.
7. Completar un checkout exitoso y comprobar número, detalle, total, dirección, impresión/PDF y enlace de correo.
8. Seleccionar “Tarjeta rechazada” y comprobar que no se descuenta inventario ni se vacía el carrito.

## Limitaciones

Los datos son simulados y locales al navegador. La opción de correo prepara un mensaje en el cliente de correo; la aplicación no envía emails por sí sola. La salida de cobertura depende de las versiones de dependencias instaladas y del entorno de ejecución.
