# ERS — Especificación de Requisitos de Software (Wanderly)

**Versión:** 1.0 · **Tipo de sistema:** tienda web académica de destinos y paquetes turísticos.

## 1. Propósito y alcance
Wanderly permite explorar destinos y paquetes, filtrar y buscar productos, gestionar un carrito y simular una compra. Incluye un panel administrativo para mantener productos, categorías y usuarios, y revisar pedidos e informes. La persistencia de demostración usa `localStorage`; no procesa pagos reales ni envía correos desde un servidor.

## 2. Perfiles de usuario
- **Visitante:** consulta páginas públicas, productos, destinos, experiencias, blogs y ofertas; puede registrarse e iniciar sesión.
- **Cliente autenticado:** administra el carrito, completa los datos de entrega y confirma una compra simulada.
- **Administrador:** accede a `/admin` para consultar el tablero, pedidos, inventario, categorías, usuarios y reportes.

## 3. Requisitos funcionales
- **RF-01 Catálogo:** listar destinos y paquetes activos con nombre, tipo, precio e información descriptiva.
- **RF-02 Búsqueda y filtros:** buscar productos por texto y filtrar/ordenar el catálogo por tipo y precio.
- **RF-03 Detalle:** mostrar información del producto seleccionado y permitir agregarlo al carrito.
- **RF-04 Cuenta:** registrar usuarios y permitir inicio/cierre de sesión de demostración.
- **RF-05 Carrito:** agregar productos, cambiar cantidades, eliminar líneas, vaciar y calcular subtotales/total.
- **RF-06 Checkout:** exigir sesión y validar nombre, teléfono, dirección, comuna y región antes de confirmar.
- **RF-07 Pago simulado:** mostrar resultado exitoso o rechazado sin realizar cobros reales.
- **RF-08 Inventario:** permitir al administrador crear, consultar, editar y eliminar productos; gestionar precio, estado, categoría y stock.
- **RF-09 Stock:** impedir la confirmación si el producto está inactivo o no hay unidades suficientes; descontar cantidades tras una compra válida.
- **RF-10 Categorías:** crear, consultar, editar y eliminar categorías; relacionar productos mediante el campo categoría.
- **RF-11 Pedidos:** conservar los pedidos simulados y mostrar su estado y detalle en el panel.
- **RF-12 Usuarios y reportes:** consultar cuentas y mostrar resúmenes del inventario y la actividad disponible.
- **RF-13 Confirmación:** presentar número de pedido, productos, total y dirección de entrega; permitir imprimir/guardar la vista como PDF y abrir un correo preparado.

## 4. Requisitos no funcionales
- **RNF-01 Usabilidad:** interfaz adaptable a escritorio y móvil, con controles etiquetados y mensajes de validación.
- **RNF-02 Compatibilidad:** aplicación basada en React 18, Vite, React Router y Bootstrap 5.
- **RNF-03 Mantenibilidad:** separación entre páginas, componentes, contexto, hooks, datos y utilidades.
- **RNF-04 Persistencia de demo:** usar `localStorage` y manejar fallos de lectura/escritura sin bloquear la aplicación.
- **RNF-05 Pruebas:** disponer de pruebas Jasmine/Karma y reporte de cobertura ejecutable.
- **RNF-06 Seguridad/limitación:** la autenticación y los datos son simulados en el cliente; no se considera segura para producción ni debe guardar datos sensibles reales.

## 5. Reglas de negocio
1. Solo productos activos deben aparecer en el catálogo público.
2. El precio debe ser mayor que cero y el stock un entero no negativo.
3. Las cantidades del carrito deben ser enteros positivos y no superar el límite de 12 personas por línea.
4. Una compra solo se confirma con sesión activa y stock suficiente.
5. El stock se descuenta al confirmar una compra simulada; una compra rechazada no debe descontarlo.
6. Las categorías deben tener nombre de al menos tres caracteres y slug único.

## 6. Datos principales
- **Producto:** id, nombre, tipo, país, precio, stock, stock crítico, categoría, estado.
- **Categoría:** slug, nombre, descripción e identificadores de productos asociados.
- **Usuario:** nombre, email, rol y estado.
- **Pedido:** número, fecha, email, nombre, estado, dirección de entrega, líneas de productos y total.

## 7. Restricciones y supuestos
El proyecto es una prueba de concepto sin API ni base de datos remota. `localStorage` es propio del navegador y no sincroniza automáticamente distintos dispositivos o perfiles. El botón de correo abre el cliente de correo configurado; no acredita que el mensaje haya sido enviado. La función de PDF utiliza el diálogo de impresión del navegador y permite elegir “Guardar como PDF”.

## 8. Criterios de aceptación
- El build de producción finaliza sin errores.
- Las pruebas automáticas configuradas finalizan correctamente.
- Cambios en productos del panel se reflejan al volver a las vistas públicas.
- Un producto inactivo no aparece en tienda y una compra sin stock suficiente no se confirma.
- El detalle de compra exitosa presenta productos, total y dirección cuando la compra procede del checkout.
- Categorías pueden crearse, editarse y eliminarse desde el panel.
