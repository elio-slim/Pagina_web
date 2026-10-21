import Campo, { EstadoFormulario } from "./Campo.jsx";
import { useFormulario } from "../hooks/useFormulario.js";

const CONFIG = {
  email: { id: "l-email", tipo: "email", required: true },
  clave: { id: "l-clave", tipo: "clave", required: true },
};

/** Formulario de inicio de sesión. Si los datos son válidos, ejecuta onEnviar(valores) (handler recibido por props). */
export default function FormularioAcceso({ onEnviar, textoBoton = "Ingresar", estadoExterno }) {
  const form = useFormulario(CONFIG, { manual: true, alValido: (v) => onEnviar?.(v, form) });
  const estado = form.estado.texto ? form.estado : estadoExterno || form.estado;
  return (
    <form id="form-login" onSubmit={form.enviar} noValidate>
      <div className="row g-3">
        <div className="col-12">
          <Campo form={form} nombre="email" config={CONFIG.email} etiqueta="Correo electrónico" ayuda="El correo con el que creaste tu cuenta." type="email" autoComplete="email" />
        </div>
        <div className="col-12">
          <Campo form={form} nombre="clave" config={CONFIG.clave} etiqueta="Contraseña" ayuda="Distingue mayúsculas y minúsculas." type="password" autoComplete="current-password" />
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-100 w-md-auto">{textoBoton}</button>
      <EstadoFormulario estado={estado} />
    </form>
  );
}
