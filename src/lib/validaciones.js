/**
 * validaciones.js
 * Reglas de validación de formularios en JavaScript puro (sin librerías).
 * Son funciones puras: reciben el tipo de campo y su valor y devuelven el
 * mensaje de error ("" si es válido). El hook useFormulario las aplica.
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

export const MENSAJES = {
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
  password: "Usa al menos 8 caracteres, con letras y números.",
  confirmar: "Las contraseñas no coinciden.",
};

/** Fecha local en formato AAAA-MM-DD (evita el desfase de toISOString/UTC). */
export function fechaLocalISO(fecha) {
  const m = String(fecha.getMonth() + 1).padStart(2, "0");
  const d = String(fecha.getDate()).padStart(2, "0");
  return `${fecha.getFullYear()}-${m}-${d}`;
}

/**
 * Devuelve el mensaje de error de un campo, o "" si es válido.
 * @param {object} campo   { tipo, required } según la configuración del formulario
 * @param {any}    valor   valor actual (string, o boolean para checkbox)
 * @param {object} valores todos los valores del formulario (para "confirmar")
 */
export function obtenerError(campo, valor, valores) {
  const { tipo, required } = campo;

  if (tipo === "acepto") {
    return required && !valor ? MENSAJES.acepto : "";
  }

  const texto = String(valor).trim();
  if (required && texto === "") {
    return tipo === "seleccion" ? MENSAJES.seleccion : MENSAJES.requerido;
  }
  if (texto === "") return "";

  switch (tipo) {
    case "nombre":
      if (texto.length > 60) return MENSAJES.nombreLargo;
      return REGEX_NOMBRE.test(texto) ? "" : MENSAJES.nombre;
    case "email":
      return REGEX_EMAIL.test(texto) ? "" : MENSAJES.email;
    case "telefono":
      return REGEX_TELEFONO.test(texto.replace(/\s+/g, "")) ? "" : MENSAJES.telefono;
    case "fecha": {
      const hoy = new Date();
      const limite = new Date(hoy.getFullYear() + 2, hoy.getMonth(), hoy.getDate());
      if (texto < fechaLocalISO(hoy)) return MENSAJES.fechaPasada;
      if (texto > fechaLocalISO(limite)) return MENSAJES.fechaLejana;
      return "";
    }
    case "personas": {
      const n = Number(texto);
      return Number.isInteger(n) && n >= 1 && n <= 12 ? "" : MENSAJES.personas;
    }
    case "mensaje":
      return texto.length < 10 ? MENSAJES.mensajeCorto : "";
    case "password":
      return String(valor).length >= 8 && /[A-Za-z]/.test(valor) && /\d/.test(valor) ? "" : MENSAJES.password;
    case "confirmar":
      return valores.clave === valor ? "" : MENSAJES.confirmar;
    default:
      return "";
  }
}

/** Sugerencia no bloqueante (ej. dominio de correo mal escrito). */
export function obtenerSugerencia(tipo, valor) {
  if (tipo !== "email") return "";
  const texto = String(valor).trim();
  const [usuario, dominio] = texto.split("@");
  const correcto = dominio && ERRORES_DOMINIO[dominio.toLowerCase()];
  return correcto ? `¿Quisiste decir ${usuario}@${correcto}?` : "";
}
