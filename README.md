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

## Fotos de los destinos

Las 6 fotos de destinos están en `img/` como JPG: `atacama.jpg`,
`valle-sagrado.jpg`, `chiloe.jpg`, `bariloche.jpg`, `cartagena.jpg` y
`torres-del-paine.jpg`. Se pueden reemplazar por fotos reales **sin tocar el
código**, siempre que conserven el mismo nombre y la extensión `.jpg`:

- Formato JPG, proporción 4:3 (recomendado 1200 × 900 px) y menos de 300 KB
  (se pueden comprimir en https://squoosh.app).

