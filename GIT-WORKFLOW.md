# Flujo de trabajo Git — Equipo de 3 personas

Esta guía cubre el indicador **IE1.3.1 / IE1.3.2**: cambios coherentes,
comentados, colaborativos y con tareas distribuidas en el repositorio.

## 1. Convención de commits

Usa el formato:

```
tipo: descripción breve en minúsculas
```

Tipos disponibles:

| Tipo     | Cuándo usarlo                                      |
|----------|-----------------------------------------------------|
| `feat`   | Nueva funcionalidad o página                        |
| `style`  | Cambios de CSS / diseño visual                       |
| `fix`    | Corrección de un error                               |
| `docs`   | Cambios en README, TAREAS, comentarios de código     |
| `chore`  | Tareas de configuración (estructura de carpetas, etc.)|

**Ejemplos reales de este proyecto:**
```
feat: agregar página de detalle de destino con contenido dinámico
style: ajustar grid de tarjetas de destino en mobile
fix: corregir validación de teléfono que rechazaba el símbolo +
docs: actualizar README con instrucciones de ejecución
feat: implementar validación de formulario de reserva en paquetes.html
```

Evita commits genéricos como `cambios`, `update`, `arreglos varios`.

## 2. Configuración inicial (una sola persona)

Quien cree el repositorio en GitHub:

```bash
cd wanderly
git init
git add .
git commit -m "chore: estructura inicial del proyecto Wanderly"
git branch -M main
git remote add origin https://github.com/<usuario>/wanderly.git
git push -u origin main
```

Luego, en GitHub, agrega a los otros 2 integrantes como colaboradores
(Settings → Collaborators) o crea la organización del equipo.

## 3. Los otros 2 integrantes clonan el proyecto

```bash
git clone https://github.com/<usuario>/wanderly.git
cd wanderly
```

## 4. Trabajar en ramas por integrante (recomendado)

Cada integrante trabaja en su propia rama según su área
(ver `TAREAS.md`), para que los commits queden claramente atribuidos:

```bash
git checkout -b feature/html-paginas       # Integrante 1
git checkout -b feature/estilos-css        # Integrante 2
git checkout -b feature/js-validaciones    # Integrante 3
```

Flujo diario:

```bash
git add .
git commit -m "feat: agregar sección de estadísticas en index.html"
git push origin feature/html-paginas
```

Luego, en GitHub, cada integrante abre un **Pull Request** hacia `main`
para que el equipo revise antes de integrar (esto también demuestra
trabajo colaborativo y distribución de tareas frente al indicador
IE1.3.1).

## 5. Alternativa más simple (si el equipo prefiere trabajar sobre `main`)

Si el equipo prefiere no usar ramas, cada integrante debe:

```bash
git pull origin main          # traer los cambios más recientes primero
# ... hacer sus cambios ...
git add .
git commit -m "feat: descripción de lo que hiciste"
git pull origin main          # traer de nuevo por si hubo cambios mientras trabajabas
git push origin main
```

**Importante:** hacer `git pull` antes de cada `push` evita
sobrescribir el trabajo de los demás.

## 6. Resolver conflictos básicos

Si Git avisa un conflicto al hacer `pull`:

1. Abre los archivos marcados con `<<<<<<<`, `=======`, `>>>>>>>`.
2. Decide qué parte del código dejar (o combina ambas).
3. Elimina las marcas de conflicto.
4. Guarda, luego:
   ```bash
   git add .
   git commit -m "fix: resolver conflicto entre estilos de header y footer"
   git push origin main
   ```

## 7. Verificar que los 3 integrantes tengan commits

Antes de entregar, revisen el historial:

```bash
git log --oneline --author="" --all
```

O en GitHub: pestaña **Insights → Contributors**, donde debe verse
la participación de los 3 integrantes.

## 8. Historial honesto y verificable

La rúbrica (IE1.3.1 / IE1.3.2) evalúa commits **reales** de cada integrante.
No copien el historial de otra persona ni hagan commits a nombre de alguien
más: cada uno debe configurar su propio usuario antes de trabajar.

```bash
git config user.name  "Tu Nombre"
git config user.email "tu-correo@duocuc.cl"
```

Reparto sugerido de commits iniciales (uno o más por integrante, en su rama):

| Integrante | Rama | Commits de ejemplo |
|-----------|------|--------------------|
| 1 | `feature/html-paginas` | `feat: agregar estructura semántica de index.html`<br>`feat: agregar página de destinos con filtro por país` |
| 2 | `feature/estilos-css` | `style: definir paleta y tipografía en styles.css`<br>`style: ajustar tarjetas y grilla para móvil` |
| 3 | `feature/js-validaciones` | `feat: validar formulario de reserva con mensajes por campo`<br>`feat: mostrar sugerencia de corrección de correo` |

## 9. Entrega final

```bash
# Asegúrate de estar en main y actualizado
git checkout main
git pull origin main
```

Luego:
1. Copia el enlace público del repositorio de GitHub.
2. Comprime la carpeta del proyecto (`.zip`) para el segundo entregable.
3. Adjunta ambos junto con el documento ERS.
