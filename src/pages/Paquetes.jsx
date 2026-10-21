import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import Campo, { CampoAcepto, EstadoFormulario } from "../components/Campo.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useFormulario } from "../hooks/useFormulario.js";
import { useTitulo } from "../hooks/useTitulo.js";
import { DESTINOS } from "../data/destinos.js";
import { buscarProducto } from "../data/catalogo.js";
import { formatoPrecio } from "../lib/formato.js";
import { fechaLocalISO } from "../lib/validaciones.js";

const PAQUETES = [
  {
    id: "paquete-explorador",
    nombre: "Explorador",
    incluye: ["4 días / 3 noches", "1 destino", "Alojamiento estándar", "Traslados incluidos"],
    botonReservar: "btn btn-dark",
  },
  {
    id: "paquete-trotamundos",
    nombre: "Trotamundos",
    destacado: true,
    incluye: ["7 días / 6 noches", "2 destinos combinados", "Alojamiento boutique", "1 experiencia guiada incluida", "Traslados y desayunos"],
    botonReservar: "btn btn-outline",
  },
];

function FormularioReserva({ destinoInicial }) {
  const config = useMemo(
    () => ({
      nombre: { id: "r-nombre", tipo: "nombre", required: true },
      email: { id: "r-email", tipo: "email", required: true },
      telefono: { id: "r-telefono", tipo: "telefono", required: true },
      destino: { id: "r-destino", tipo: "seleccion", required: true, inicial: destinoInicial },
      fecha: { id: "r-fecha", tipo: "fecha", required: true },
      personas: { id: "r-personas", tipo: "personas", required: true },
      comentario: { id: "r-comentario", tipo: null },
      acepto: { id: "r-acepto", tipo: "acepto", required: true },
    }),
    [destinoInicial]
  );
  const form = useFormulario(config, { mensajeExito: "¡Listo! Recibimos tu información. Te contactaremos pronto a tu correo." });

  return (
    <form onSubmit={form.enviar} noValidate>
      <div className="form-grid">
        <Campo form={form} nombre="nombre" config={config.nombre} etiqueta="Nombre completo" ayuda="Nombre y apellido, por ejemplo: Ana Pérez." type="text" autoComplete="name" />
        <Campo form={form} nombre="email" config={config.email} etiqueta="Correo electrónico" ayuda="Te enviaremos la propuesta a este correo." type="email" autoComplete="email" />
        <Campo form={form} nombre="telefono" config={config.telefono} etiqueta="Teléfono" ayuda="Con código de país si es posible: +56 9 1234 5678." type="tel" autoComplete="tel" placeholder="+56 9 1234 5678" />

        <Campo form={form} nombre="destino" config={config.destino} etiqueta="Destino de interés" ayuda="Si aún no decides, elige el que más te llame la atención." as="select">
          <option value="">Selecciona un destino</option>
          {Object.entries(DESTINOS).map(([clave, d]) => (
            <option key={clave} value={clave}>
              {d.nombre}
            </option>
          ))}
        </Campo>

        <Campo form={form} nombre="fecha" config={config.fecha} etiqueta="Fecha estimada de viaje" ayuda="Desde hoy y hasta dentro de 2 años." type="date" min={fechaLocalISO(new Date())} />
        <Campo form={form} nombre="personas" config={config.personas} etiqueta="Número de personas" ayuda="Entre 1 y 12 personas." type="number" min="1" max="12" inputMode="numeric" />

        <div className="field full">
          <label htmlFor="r-comentario">Cuéntanos algo más (opcional)</label>
          <textarea
            id="r-comentario"
            name="comentario"
            maxLength={500}
            placeholder="Ej: viajamos con niños, buscamos algo tranquilo, tenemos una fecha fija..."
            value={form.valores.comentario}
            onChange={(e) => form.cambiar("comentario", e.target.value)}
          />
        </div>

        <CampoAcepto form={form} nombre="acepto" config={config.acepto} className="full" etiqueta="Acepto que Wanderly use estos datos para responder mi solicitud." />
      </div>

      <button type="submit" className="btn btn-primary">
        Enviar solicitud de reserva
      </button>
      <EstadoFormulario estado={form.estado} />
    </form>
  );
}

export default function Paquetes() {
  useTitulo("Paquetes — Wanderly");
  const { agregar } = useCart();
  const [params] = useSearchParams();

  // /paquetes?destino=chiloe preselecciona el destino en el formulario de reserva.
  const pedido = params.get("destino");
  const destinoInicial = pedido && DESTINOS[pedido] ? pedido : "";

  return (
    <>
      <Hero etiqueta="Paquetes" titulo="Tres formas de viajar con nosotros" bajada="Cada paquete es un punto de partida editable, no un cierre de trato." />

      <section className="container" aria-label="Paquetes disponibles">
        <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
          {PAQUETES.map((paq) => {
            const producto = buscarProducto(paq.id);
            return (
              <article className={"pkg-card" + (paq.destacado ? " featured" : "")} key={paq.id}>
                <h2 className="h3">{paq.nombre}</h2>
                <p className="price">
                  {formatoPrecio(producto.precio)} <small>por persona</small>
                </p>
                <p>{producto.resumen}</p>
                <ul>
                  {paq.incluye.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="pkg-actions">
                  <button type="button" className="btn btn-primary" onClick={() => agregar(paq.id)}>
                    Agregar al carrito
                  </button>
                  <a href="#reserva" className={paq.botonReservar}>
                    Reservar
                  </a>
                </div>
              </article>
            );
          })}

          <article className="pkg-card">
            <h2 className="h3">A tu manera</h2>
            <p className="price">
              Desde $300.000 <small>por persona</small>
            </p>
            <p>Armamos el itinerario contigo desde cero, destino por destino.</p>
            <ul>
              <li>Duración a definir</li>
              <li>Destinos a elección</li>
              <li>Asesoría 1 a 1</li>
              <li>Cotización personalizada</li>
            </ul>
            <Link to="/contacto" className="btn btn-dark">
              Hablar con Wanderly
            </Link>
          </article>
        </div>
      </section>

      <section className="container" id="reserva" aria-labelledby="reserva-titulo">
        <div className="section-head">
          <div>
            <p className="kicker">Reserva</p>
            <h2 id="reserva-titulo">Cuéntanos tu viaje ideal</h2>
          </div>
        </div>

        <div className="form-card">
          <FormularioReserva key={destinoInicial} destinoInicial={destinoInicial} />
        </div>
      </section>
    </>
  );
}
