import { Link, useLocation } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import { useTitulo } from "../hooks/useTitulo.js";
import { formatoPrecio } from "../lib/formato.js";

export function PagoCorrecto() {
  useTitulo("Pago correcto — Wanderly");
  const { state } = useLocation();
  return (
    <>
      <Hero etiqueta="Pago" titulo="¡Pago realizado con éxito!" bajada="Tu compra quedó registrada." />
      <section className="container py-5">
        <div className="alert alert-success text-center mx-auto" style={{ maxWidth: 640 }} role="status">
          <h2 className="h4">¡Gracias por tu compra!</h2>
          {state?.numero ? (
            <>
              <p className="mx-auto">Tu número de pedido es <strong>{state.numero}</strong> por {formatoPrecio(state.total)}.</p>
              <p className="mx-auto">Enviaremos el resumen a <strong>{state.email}</strong> (simulado).</p>
              {state.items?.length > 0 && <div className="text-start mt-4">
                <h3 className="h6">Resumen de productos</h3>
                <ul className="list-group mb-3">{state.items.map((i) => <li className="list-group-item d-flex justify-content-between gap-3" key={i.id}><span>{i.nombre} × {i.cantidad}</span><strong>{formatoPrecio(i.precio * i.cantidad)}</strong></li>)}</ul>
                <h3 className="h6">Dirección de entrega</h3>
                <p>{state.envio?.nombre}<br />{state.envio?.direccion}, {state.envio?.comuna}, {state.envio?.region}<br />Teléfono: {state.envio?.telefono}</p>
              </div>}
              <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                <button type="button" className="btn btn-outline-secondary" onClick={() => window.print()}>Descargar / imprimir boleta PDF</button>
                <a className="btn btn-outline-secondary" href={`mailto:${encodeURIComponent(state.email || "")}?subject=${encodeURIComponent(`Boleta ${state.numero}`)}&body=${encodeURIComponent(`Pedido ${state.numero}\nTotal: ${formatoPrecio(state.total)}\nResumen de compra generado por Wanderly.`)}`}>Enviar por correo</a>
              </div>
            </>
          ) : <p className="mx-auto">Tu pedido fue confirmado.</p>}
          <Link to="/productos" className="btn btn-primary">Seguir explorando</Link>
        </div>
      </section>
    </>
  );
}

export function PagoError() {
  useTitulo("Error en el pago — Wanderly");
  const { state } = useLocation();
  return (
    <>
      <Hero etiqueta="Pago" titulo="No pudimos procesar el pago" bajada="No se realizó ningún cobro." />
      <section className="container py-5">
        <div className="alert alert-danger text-center mx-auto" style={{ maxWidth: 640 }} role="alert">
          <h2 className="h4">Pago rechazado</h2>
          <p className="mx-auto">{state?.motivo || "Ocurrió un problema al procesar el pago."} Tu carrito sigue intacto.</p>
          <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
            <Link to="/checkout" className="btn btn-primary">Reintentar pago</Link>
            <Link to="/carrito" className="btn btn-outline-secondary">Volver al carrito</Link>
          </div>
        </div>
      </section>
    </>
  );
}
