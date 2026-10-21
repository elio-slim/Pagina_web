import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import Campo, { CampoAcepto, EstadoFormulario } from "../components/Campo.jsx";
import FormularioAcceso from "../components/FormularioAcceso.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useFormulario } from "../hooks/useFormulario.js";
import { useTitulo } from "../hooks/useTitulo.js";
import { destinoSeguro } from "../lib/usuarios.js";

const CONFIG_REGISTRO = {
  nombre: { id: "g-nombre", tipo: "nombre", required: true },
  email: { id: "g-email", tipo: "email", required: true },
  clave: { id: "g-clave", tipo: "password", required: true },
  confirmar: { id: "g-clave2", tipo: "confirmar", required: true },
  acepto: { id: "g-acepto", tipo: "acepto", required: true },
};

export default function Login({ modoInicial }) {
  useTitulo("Ingresar — Wanderly");
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { sesion, ingresar, registrar } = useAuth();

  const [modo, setModo] = useState(modoInicial === "registro" || params.get("modo") === "registro" ? "registro" : "login");
  const siguiente = destinoSeguro(params.get("next"));

  const irAlSiguiente = (rol) => window.setTimeout(() => navigate(rol === "admin" && siguiente === "/" ? "/admin" : siguiente), 700);
  const [avisoLogin, setAvisoLogin] = useState(null);

  const alIngresar = async (v, form) => {
    const r = await ingresar({ email: v.email, clave: v.clave });
    if (!r.ok) return form.setEstado({ texto: r.mensaje, tipo: "error" });
    form.setEstado({ texto: "¡Bienvenido de vuelta! Te estamos redirigiendo…", tipo: "success" });
    irAlSiguiente(r.sesion.rol);
  };

  const formRegistro = useFormulario(CONFIG_REGISTRO, {
    manual: true,
    alValido: async (v) => {
      const r = await registrar({ nombre: v.nombre, email: v.email, clave: v.clave });
      if (!r.ok) return formRegistro.setEstado({ texto: r.mensaje, tipo: "error" });
      formRegistro.setEstado({ texto: "¡Cuenta creada! Te estamos redirigiendo…", tipo: "success" });
      irAlSiguiente("cliente");
    },
  });

  // Si ya hay sesión al entrar, se avisa en el formulario de ingreso.
  useEffect(() => {
    if (sesion) setAvisoLogin({ texto: "Ya tienes una sesión iniciada. Puedes seguir explorando.", tipo: "success" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tab = (clave, texto) => (
    <button
      type="button"
      className="tab"
      role="tab"
      id={`tab-${clave}`}
      aria-controls={`panel-${clave}`}
      aria-selected={modo === clave}
      onClick={() => setModo(clave)}
    >
      {texto}
    </button>
  );

  return (
    <>
      <Hero etiqueta="Mi cuenta" titulo="Ingresa o crea tu cuenta" bajada="Con una cuenta puedes finalizar tus compras de viaje." />

      <section className="container py-4" aria-label="Formularios de cuenta">
        <div className="auth-wrap mx-auto w-100">
          <p className="auth-aviso" id="auth-aviso" role="status" hidden={!siguiente.startsWith("/c")}>
            {siguiente.startsWith("/c") ? "Inicia sesión o crea una cuenta para finalizar tu compra." : ""}
          </p>

          <div className="tabs" role="tablist" aria-label="Elige una opción">
            {tab("login", "Ingresar")}
            {tab("registro", "Crear cuenta")}
          </div>

          <div className="form-card">
            <div className="auth-panel" id="panel-login" role="tabpanel" aria-labelledby="tab-login" hidden={modo !== "login"}>
              <FormularioAcceso onEnviar={alIngresar} estadoExterno={avisoLogin} />
            </div>

            <div className="auth-panel" id="panel-registro" role="tabpanel" aria-labelledby="tab-registro" hidden={modo !== "registro"}>
              <form id="form-registro" onSubmit={formRegistro.enviar} noValidate>
                <div className="row g-3">
                  <Campo form={formRegistro} nombre="nombre" config={CONFIG_REGISTRO.nombre} etiqueta="Nombre completo" ayuda="Nombre y apellido, por ejemplo: Ana Pérez." type="text" autoComplete="name" />
                  <Campo form={formRegistro} nombre="email" config={CONFIG_REGISTRO.email} etiqueta="Correo electrónico" ayuda="Lo usarás para ingresar." type="email" autoComplete="email" />
                  <Campo form={formRegistro} nombre="clave" config={CONFIG_REGISTRO.clave} etiqueta="Contraseña" ayuda="Mínimo 8 caracteres, con letras y números." type="password" autoComplete="new-password" />
                  <Campo form={formRegistro} nombre="confirmar" config={CONFIG_REGISTRO.confirmar} etiqueta="Repite la contraseña" ayuda="Debe ser igual a la anterior." type="password" autoComplete="new-password" />
                  <CampoAcepto form={formRegistro} nombre="acepto" config={CONFIG_REGISTRO.acepto} etiqueta="Acepto que Wanderly use estos datos para gestionar mi cuenta y mis compras." />
                </div>
                <button type="submit" className="btn btn-primary">
                  Crear cuenta
                </button>
                <EstadoFormulario estado={formRegistro.estado} />
              </form>
            </div>
          </div>

          <p className="pay-note" style={{ marginTop: 16 }}>
            Proyecto académico sin servidor: las cuentas se guardan solo en este navegador y no representan un sistema de seguridad real.
          </p>
        </div>
      </section>
    </>
  );
}
