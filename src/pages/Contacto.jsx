import Hero from "../components/Hero.jsx";
import Campo, { CampoAcepto, EstadoFormulario } from "../components/Campo.jsx";
import { useFormulario } from "../hooks/useFormulario.js";
import { useTitulo } from "../hooks/useTitulo.js";

const CONFIG = {
  nombre: { id: "c-nombre", tipo: "nombre", required: true },
  email: { id: "c-email", tipo: "email", required: true },
  asunto: { id: "c-asunto", tipo: "seleccion", required: true },
  mensaje: { id: "c-mensaje", tipo: "mensaje", required: true },
  acepto: { id: "c-acepto", tipo: "acepto", required: true },
};

export default function Contacto() {
  useTitulo("Contacto — Wanderly");
  const form = useFormulario(CONFIG, { mensajeExito: "¡Listo! Recibimos tu información. Te contactaremos pronto a tu correo." });

  return (
    <>
      <Hero etiqueta="Contacto" titulo="Escríbenos, respondemos nosotros mismos" bajada="Sin call center. El mensaje llega directo al equipo que arma los itinerarios." />

      <section className="container" aria-label="Formulario y datos de contacto">
        <div className="split row g-4 align-items-center">
          <div className="form-card">
            <form onSubmit={form.enviar} noValidate>
              <Campo form={form} nombre="nombre" config={CONFIG.nombre} etiqueta="Nombre completo" ayuda="Nombre y apellido, por ejemplo: Ana Pérez." type="text" autoComplete="name" />
              <Campo form={form} nombre="email" config={CONFIG.email} etiqueta="Correo electrónico" ayuda="Aquí te responderemos." type="email" autoComplete="email" />

              <Campo form={form} nombre="asunto" config={CONFIG.asunto} etiqueta="Asunto" ayuda="Nos ayuda a derivar tu mensaje a la persona correcta." as="select">
                <option value="">Selecciona un asunto</option>
                <option value="cotizacion">Cotización de viaje</option>
                <option value="soporte">Soporte a una reserva existente</option>
                <option value="alianzas">Alianzas y prensa</option>
                <option value="otro">Otro</option>
              </Campo>

              <Campo form={form} nombre="mensaje" config={CONFIG.mensaje} etiqueta="Mensaje" ayuda="Mínimo 10 y máximo 500 caracteres." as="textarea" maxLength={500} contador />

              <CampoAcepto form={form} nombre="acepto" config={CONFIG.acepto} etiqueta="Acepto que Wanderly use estos datos para responder mi solicitud." />

              <button type="submit" className="btn btn-primary">
                Enviar mensaje
              </button>
              <EstadoFormulario estado={form.estado} />
            </form>
          </div>

          <div>
            <h2 className="h3">Otras formas de encontrarnos</h2>
            <p>Si prefieres, también puedes escribirnos directo o pasar por nuestra oficina.</p>
            <p className="contact-list">
              <strong>Correo:</strong> <a href="mailto:hola@wanderly.cl">hola@wanderly.cl</a>
              <br />
              <strong>Teléfono:</strong> <a href="tel:+56900000000">+56 9 0000 0000</a>
            </p>
            <iframe
              className="map-frame"
              title="Mapa de Santiago, Chile"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-70.69%2C-33.46%2C-70.63%2C-33.42&layer=mapnik&marker=-33.4372%2C-70.6506"
            />
            <p className="video-fallback">
              <a href="https://www.openstreetmap.org/?mlat=-33.4372&mlon=-70.6506#map=14/-33.4372/-70.6506" target="_blank" rel="noopener noreferrer">
                Ver mapa más grande
              </a>{" "}
              — Santiago, Chile.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
