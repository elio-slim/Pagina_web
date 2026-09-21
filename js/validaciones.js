/**
 * validaciones.js
 * Motor de validación de formularios en JavaScript puro (sin librerías).
 * Se aplica a todo <form data-validar-form> (reserva en paquetes.html y
 * contacto en contacto.html).
 *
 * - Valida al salir del campo (blur) y en tiempo real una vez que hay error.
 * - Cada campo tiene su regla y un mensaje de error específico, mostrado
 *   justo debajo del campo (no se usa alert()).
 * - Muestra sugerencias contextuales (p. ej. corrige errores típicos de
 *   dominio de correo: "gmial.com" -> "¿Quisiste decir gmail.com?").
 * - Bloquea el envío mientras existan datos incorrectos o incompletos.
 * - Accesibilidad: aria-invalid, aria-describedby y foco en el primer error.
 */

const LETRAS = "A-Za-zÁÉÍÓÚÜáéíóúüÑñ";
const REGEX_NOMBRE = new RegExp(`^[${LETRAS}'’-]{2,}(\\s+[${LETRAS}'’-]+)+$`);
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REGEX_TELEFONO = /^\+?\d{8,15}$/;

const ERRORES_DOMINIO = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmail.co": "gmail.com",
  "hotmial.com": "hotmail.com",
  "hotmal.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "yaho.com": "yahoo.com",
};

const MENSAJES = {
  requerido: "Este campo es obligatorio.",
  nombre: "Escribe tu nombre y apellido usando solo letras (ejemplo: Ana Pérez).",
  nombreLargo: "El nombre no puede superar los 60 caracteres.",
  email: "Ingresa un correo válido, por ejemplo nombre@correo.com.",
  telefono: "Ingresa un teléfono de 8 a 15 dígitos; puede empezar con + y llevar espacios.",
  fechaPasada: "La fecha no puede ser anterior a hoy.",
  fechaLejana: "Elige una fecha dentro de los próximos 2 años.",
  personas: "Indica un número entero entre 1 y 12 personas.",
  seleccion: "Selecciona una opción de la lista.",
  mensajeCorto: "Cuéntanos en al menos 10 caracteres qué necesitas.",
  acepto: "Debes aceptar el uso de tus datos para poder enviar el formulario.",
};

/** Fecha local en formato AAAA-MM-DD (evita el desfase de toISOString/UTC). */
function fechaLocalISO(fecha) {
  const m = String(fecha.getMonth() + 1).padStart(2, "0");
  const d = String(fecha.getDate()).padStart(2, "0");
  return `${fecha.getFullYear()}-${m}-${d}`;
}

/** Devuelve el mensaje de error del campo, o "" si es válido. */
function obtenerError(campo) {
  const tipo = campo.dataset.validar;
  const valor = campo.value.trim();

  if (campo.type === "checkbox") {
    return campo.required && !campo.checked ? MENSAJES.acepto : "";
  }
  if (campo.required && valor === "") {
    return tipo === "seleccion" ? MENSAJES.seleccion : MENSAJES.requerido;
  }
  if (valor === "") return "";

  switch (tipo) {
    case "nombre":
      if (valor.length > 60) return MENSAJES.nombreLargo;
      return REGEX_NOMBRE.test(valor) ? "" : MENSAJES.nombre;
    case "email":
      return REGEX_EMAIL.test(valor) ? "" : MENSAJES.email;
    case "telefono":
      return REGEX_TELEFONO.test(valor.replace(/\s+/g, "")) ? "" : MENSAJES.telefono;
    case "fecha": {
      const hoy = new Date();
      const limite = new Date(hoy.getFullYear() + 2, hoy.getMonth(), hoy.getDate());
      if (valor < fechaLocalISO(hoy)) return MENSAJES.fechaPasada;
      if (valor > fechaLocalISO(limite)) return MENSAJES.fechaLejana;
      return "";
    }
    case "personas": {
      const n = Number(valor);
      return Number.isInteger(n) && n >= 1 && n <= 12 ? "" : MENSAJES.personas;
    }
    case "mensaje":
      return valor.length < 10 ? MENSAJES.mensajeCorto : "";
    default:
      return "";
  }
}

/** Sugerencia no bloqueante (ej. dominio de correo mal escrito). */
function obtenerSugerencia(campo) {
  if (campo.dataset.validar !== "email") return "";
  const dominio = campo.value.trim().split("@")[1];
  const correcto = dominio && ERRORES_DOMINIO[dominio.toLowerCase()];
  return correcto ? `¿Quisiste decir ${campo.value.trim().split("@")[0]}@${correcto}?` : "";
}

function validarCampo(campo) {
  const contenedor = campo.closest(".field");
  const errorEl = contenedor.querySelector(".error-msg");
  const hintEl = contenedor.querySelector(".hint");
  const mensaje = obtenerError(campo);

  if (hintEl) {
    if (!hintEl.dataset.original) hintEl.dataset.original = hintEl.textContent;
    const sugerencia = mensaje ? "" : obtenerSugerencia(campo);
    hintEl.textContent = sugerencia || hintEl.dataset.original;
    hintEl.classList.toggle("suggestion", Boolean(sugerencia));
  }

  if (mensaje) {
    contenedor.classList.add("invalid");
    contenedor.classList.remove("valid");
    errorEl.textContent = mensaje;
    campo.setAttribute("aria-invalid", "true");
    return false;
  }

  contenedor.classList.remove("invalid");
  contenedor.classList.toggle("valid", campo.type === "checkbox" ? campo.checked : campo.value.trim() !== "");
  errorEl.textContent = "";
  campo.removeAttribute("aria-invalid");
  return true;
}

function vincularAyudas(campo) {
  const contenedor = campo.closest(".field");
  const ids = [];
  contenedor.querySelectorAll(".hint, .error-msg").forEach((el, i) => {
    if (!el.id) el.id = `${campo.id}-ayuda-${i}`;
    ids.push(el.id);
  });
  if (ids.length) campo.setAttribute("aria-describedby", ids.join(" "));
  const error = contenedor.querySelector(".error-msg");
  if (error) error.setAttribute("aria-live", "polite");
}

function inicializarContador(campo) {
  const contador = campo.closest(".field").querySelector(".char-count");
  if (!contador) return;
  const max = campo.getAttribute("maxlength") || 500;
  const actualizar = () => (contador.textContent = `${campo.value.length}/${max}`);
  campo.addEventListener("input", actualizar);
  actualizar();
}

function inicializarFormulario(form) {
  const campos = form.querySelectorAll("[data-validar]");
  const statusBox = form.querySelector(".form-status");

  campos.forEach((campo) => {
    vincularAyudas(campo);
    inicializarContador(campo);

    if (campo.dataset.validar === "fecha") {
      campo.min = fechaLocalISO(new Date());
    }

    const evento = campo.tagName === "SELECT" || campo.type === "checkbox" ? "change" : "blur";
    campo.addEventListener(evento, () => validarCampo(campo));
    campo.addEventListener("input", () => {
      const contenedor = campo.closest(".field");
      if (contenedor.classList.contains("invalid") || campo.dataset.validar === "email") {
        validarCampo(campo);
      }
    });
  });

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    let formularioValido = true;
    campos.forEach((campo) => {
      if (!validarCampo(campo)) formularioValido = false;
    });

    if (!formularioValido) {
      const cantidad = form.querySelectorAll(".field.invalid").length;
      statusBox.textContent = `Revisa los ${cantidad} campo(s) marcados antes de enviar.`;
      statusBox.className = "form-status show error";
      const primerError = form.querySelector(
        ".field.invalid input, .field.invalid select, .field.invalid textarea"
      );
      if (primerError) primerError.focus();
      return;
    }

    // Sitio sin backend: simulamos el envío y confirmamos al usuario.
    statusBox.textContent =
      "¡Listo! Recibimos tu información. Te contactaremos pronto a tu correo.";
    statusBox.className = "form-status show success";
    form.reset();
    form.querySelectorAll(".field").forEach((f) => f.classList.remove("valid", "invalid"));
    form.querySelectorAll(".hint").forEach((h) => {
      if (h.dataset.original) h.textContent = h.dataset.original;
      h.classList.remove("suggestion");
    });
    form.querySelectorAll(".char-count").forEach((c) => (c.textContent = c.textContent.replace(/^\d+/, "0")));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("form[data-validar-form]").forEach(inicializarFormulario);
});
