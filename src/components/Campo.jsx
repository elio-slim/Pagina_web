import { obtenerSugerencia } from "../lib/validaciones.js";

/**
 * Campo de formulario accesible: etiqueta, ayuda, mensaje de error y estado
 * válido/inválido. Funciona con inputs, select y textarea.
 *
 * Props: form (resultado de useFormulario), nombre, config (del campo),
 * etiqueta, ayuda, as ("input" | "select" | "textarea"), y el resto de atributos HTML.
 */
export default function Campo({ form, nombre, config, etiqueta, ayuda, as = "input", contador = false, className = "", children, ...resto }) {
  const { id, tipo } = config;
  const valor = form.valores[nombre];
  const error = form.errores[nombre] || "";
  const sugerencia = !error && tipo === "email" ? obtenerSugerencia(tipo, valor) : "";
  const idAyuda = `${id}-ayuda-0`;
  const idError = `${id}-ayuda-1`;

  const propsComunes = {
    id,
    name: nombre,
    value: valor,
    required: Boolean(config.required),
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": `${idAyuda} ${idError}`,
    onBlur: () => form.salirDelCampo(nombre),
    onChange: (e) => form.cambiar(nombre, e.target.value, as === "select"),
    ...resto,
  };

  let control;
  if (as === "select") control = <select {...propsComunes}>{children}</select>;
  else if (as === "textarea") control = <textarea {...propsComunes} />;
  else control = <input {...propsComunes} />;

  const clases = ["field", className, error ? "invalid" : "", form.validos[nombre] && !error ? "valid" : ""].filter(Boolean).join(" ");
  const maximo = resto.maxLength || 500;

  return (
    <div className={clases}>
      <label htmlFor={id}>{etiqueta}</label>
      {control}
      <span className={"hint" + (sugerencia ? " suggestion" : "")} id={idAyuda}>
        {sugerencia || ayuda}
      </span>
      {contador && (
        <span className="char-count" aria-hidden="true">
          {String(valor).length}/{maximo}
        </span>
      )}
      <span className="error-msg" id={idError} aria-live="polite">
        {error}
      </span>
    </div>
  );
}

/** Casilla de aceptación (checkbox) con su mensaje de error. */
export function CampoAcepto({ form, nombre, config, etiqueta, className = "" }) {
  const { id } = config;
  const error = form.errores[nombre] || "";
  const clases = ["field", "field-check", className, error ? "invalid" : "", form.validos[nombre] && !error ? "valid" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={clases}>
      <div className="check-row">
        <input
          type="checkbox"
          id={id}
          name={nombre}
          checked={form.valores[nombre]}
          required={Boolean(config.required)}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={`${id}-ayuda-1`}
          onChange={(e) => form.cambiar(nombre, e.target.checked, true)}
        />
        <label htmlFor={id}>{etiqueta}</label>
      </div>
      <span className="error-msg" id={`${id}-ayuda-1`} aria-live="polite">
        {error}
      </span>
    </div>
  );
}

/** Mensaje de estado del formulario (éxito o error). */
export function EstadoFormulario({ estado }) {
  return (
    <p className={"form-status" + (estado.texto ? ` show ${estado.tipo}` : "")} role="status">
      {estado.texto}
    </p>
  );
}
