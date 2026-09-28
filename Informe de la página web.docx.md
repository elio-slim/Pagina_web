

**Especificación de Requisitos del Software (ERS)**

Proyecto Wanderly — sitio web de una agencia de viajes

| Dato | Detalle |
| :---- | :---- |
| Evaluación | Evaluación Parcial N° 1 |
| Versión | 1.0  |
| Fecha | Septiembre de 2026 |
| Equipo | Victor Gomez, Elio Millan, Ramses Escalona |
| Docente | Giovanni Valdivia |
| Repositorio | https://github.com/elio-slim/Pagina\_web |

# **1\. Introducción**

## **1.1 Propósito**

Este documento define los requisitos, las herramientas y la propuesta de trabajo del proyecto Wanderly, el sitio web frontend que el equipo desarrolla para la Evaluación Parcial N° 1 de Desarrollo Fullstack II. Corresponde a la versión 1 y se ampliará en las evaluaciones siguientes.

## **1.2 Alcance**

Wanderly es el frontend de una tienda online de servicios de viaje: permite explorar destinos, experiencias y paquetes, y enviar solicitudes de reserva y mensajes de contacto. El alcance de esta entrega incluye siete páginas HTML, una hoja de estilos CSS externa y JavaScript para menús, filtros, contenido dinámico y validación de formularios. Quedan fuera de esta versión el backend, la base de datos, el pago en línea y la autenticación de usuarios.

## **1.3 Definiciones y siglas**

| Término | Significado |
| :---- | :---- |
| ERS | Especificación de Requisitos del Software. |
| RF / RNF | Requisito funcional / requisito no funcional. |
| HTML5 semántico | Uso de etiquetas que describen el significado del contenido (header, nav, main, section, article, footer). |
| Frontend | Parte de la aplicación que se ejecuta en el navegador del usuario. |
| Repositorio remoto | Copia del proyecto alojada en GitHub para trabajar en equipo. |

# **2\. Descripción general**

## **2.1 Perspectiva del producto**

Wanderly es un sitio estático multipágina que se ejecuta íntegramente en el navegador. Cada página comparte el mismo header, footer y hoja de estilos, y el contenido dinámico (detalle de destinos, filtros y validaciones) se resuelve con JavaScript sin servidor.

## **2.2 Usuarios**

| Usuario | Necesidad principal |
| :---- | :---- |
| Viajero interesado | Explorar destinos, comparar paquetes y solicitar una reserva. |
| Cliente con dudas | Contactar al equipo y obtener respuesta por correo. |
| Equipo Wanderly | Mantener el sitio con facilidad gracias a su estructura ordenada. |

## **2.3 Supuestos**

* Los usuarios acceden desde navegadores modernos con conexión a internet para videos, mapa y tipografías.

* El envío de formularios se simula en el navegador porque no existe servidor en esta etapa.

# **3\. Definición de los requisitos**

## **3.1 Requisitos funcionales**

| ID | Descripción | Prioridad | Página |
| :---- | :---- | :---- | :---- |
| RF-01 | El sitio debe permitir navegar entre las 7 páginas mediante un menú principal y un footer con enlaces presentes en todas las páginas. | Alta | Todas |
| RF-02 | El sitio debe mostrar un listado de 6 destinos con imagen, país, descripción y enlace al detalle. | Alta | destinos.html, index.html |
| RF-03 | El usuario debe poder filtrar los destinos por país mediante botones. | Media | destinos.html |
| RF-04 | El sitio debe mostrar el detalle de un destino (foto, resumen, duración, dificultad y qué incluye) según el parámetro ?destino= de la URL. | Alta | destino-detalle.html |
| RF-05 | El sitio debe incluir videos embebidos que permitan conocer el destino. | Media | index.html, destino-detalle.html |
| RF-06 | El sitio debe presentar las experiencias disponibles, cada una vinculada a su destino. | Media | experiencias.html |
| RF-07 | El sitio debe presentar los paquetes de viaje con precio, duración y contenido. | Alta | paquetes.html |
| RF-08 | El usuario debe poder enviar una solicitud de reserva mediante un formulario con validación en JavaScript. | Alta | paquetes.html |
| RF-09 | El usuario debe poder enviar un mensaje de contacto mediante un formulario con validación en JavaScript. | Alta | contacto.html |
| RF-10 | Al reservar desde el detalle de un destino, el formulario de reserva debe preseleccionar ese destino. | Baja | destino-detalle.html, paquetes.html |
| RF-11 | El sitio debe ofrecer un menú desplegable en pantallas pequeñas. | Media | Todas |
| RF-12 | El sitio debe presentar al equipo y la historia del proyecto. | Baja | nosotros.html |

## **3.2 Reglas de validación de formularios**

| ID | Regla |
| :---- | :---- |
| VAL-01 | Los campos obligatorios vacíos deben mostrar el mensaje "Este campo es obligatorio" junto al campo. |
| VAL-02 | El nombre debe incluir nombre y apellido, solo con letras (máximo 60 caracteres). |
| VAL-03 | El correo debe tener formato válido; ante dominios mal escritos frecuentes (p. ej. gmial.com) se muestra una sugerencia de corrección. |
| VAL-04 | El teléfono debe tener entre 8 y 15 dígitos, con \+ inicial y espacios opcionales. |
| VAL-05 | La fecha de viaje debe ser hoy o posterior y no superar los 2 años. |
| VAL-06 | El número de personas debe ser un entero entre 1 y 12\. |
| VAL-07 | El mensaje de contacto debe tener entre 10 y 500 caracteres, con contador visible. |
| VAL-08 | Debe marcarse la casilla de aceptación de uso de datos antes de enviar. |
| VAL-09 | El envío se bloquea mientras existan errores y el foco pasa al primer campo con error. |

## **3.3 Requisitos no funcionales**

| ID | Categoría | Descripción |
| :---- | :---- | :---- |
| RNF-01 | Tecnología | El sitio se construye solo con HTML5, CSS3 y JavaScript, sin frameworks ni backend. |
| RNF-02 | Semántica | Todas las páginas usan etiquetas semánticas (header, nav, main, section, article, figure, footer). |
| RNF-03 | Mantenibilidad | Todas las páginas comparten una única hoja de estilos externa; no se usan estilos en línea. El JavaScript se separa por responsabilidad (main, validaciones, destino-detalle). |
| RNF-04 | Responsividad | La interfaz debe adaptarse a móvil, tablet y escritorio (puntos de quiebre en 860 px y 620 px). |
| RNF-05 | Accesibilidad | Imágenes con texto alternativo, etiquetas asociadas a cada campo, foco visible, aria-invalid y aria-describedby en formularios, y enlace para saltar al contenido. |
| RNF-06 | Portabilidad | El sitio debe funcionar abriendo index.html directamente (file://) y desde un servidor local. |
| RNF-07 | Compatibilidad | Debe funcionar en las versiones actuales de Chrome, Edge y Firefox. |
| RNF-08 | Rendimiento | Imágenes livianas en formato SVG y carga diferida (loading="lazy") en imágenes y videos. |
| RNF-09 | Trabajo colaborativo | El código se gestiona en un repositorio Git público con commits descriptivos de los tres integrantes. |

# **4\. Herramientas y tecnologías**

| Herramienta | Uso en el proyecto |
| :---- | :---- |
| Visual Studio Code | Editor de código del equipo. |
| HTML5 / CSS3 / JavaScript (ES6+) | Lenguajes del frontend, sin frameworks. |
| Git y GitHub | Control de versiones y repositorio público colaborativo (ramas y Pull Requests). |
| Google Chrome DevTools | Depuración, pruebas responsivas y revisión de accesibilidad. |
| W3C Markup Validator | Validación del HTML. |
| Google Fonts | Tipografías Fraunces y Work Sans. |
| YouTube (incrustación) | Videos embebidos de los destinos. |
| OpenStreetMap (incrustación) | Mapa de ubicación en la página de contacto. |
| Microsoft Word | Redacción del documento ERS. |

# **5\. Propuestas del proyecto**

## **5.1 Enfoque**

El equipo propone un sitio de agencia de viajes con identidad propia: paleta de colores petróleo, arena y arcilla, tipografía con carácter para los títulos e ilustraciones locales para cada destino. Se prioriza una estructura HTML semántica, un único archivo CSS y un JavaScript dividido por responsabilidad para que el sitio sea fácil de mantener y de explicar por cada integrante.

## **5.2 Estructura del sitio**

| Página | Contenido |
| :---- | :---- |
| index.html | Portada, destinos destacados, cifras, video y forma de trabajo. |
| destinos.html | Seis destinos con filtro por país. |
| destino-detalle.html | Detalle dinámico de un destino, video y destinos sugeridos. |
| experiencias.html | Actividades que se pueden sumar a un paquete. |
| paquetes.html | Tres paquetes y formulario de reserva. |
| nosotros.html | Historia del proyecto y equipo. |
| contacto.html | Formulario de contacto, datos y mapa. |

## **5.3 Organización del equipo**

| Integrante | Responsabilidad principal | Rama de trabajo |
| :---- | :---- | :---- |
| Victor Gomez | Estructura HTML, contenido, navegación e imágenes. | feature/html-paginas |
| Elio Millan | Hoja de estilos, diseño visual y responsividad. | feature/estilos-css |
| Ramses Escalona | JavaScript: validaciones, filtros y contenido dinámico. | feature/js-validaciones |

## **5.4 Control de versiones**

* Repositorio público en GitHub con la rama principal main y una rama por integrante.

* Convención de commits: feat, style, fix, docs y chore, con descripciones claras en minúsculas.

* Integración mediante Pull Requests y git pull antes de cada push.

