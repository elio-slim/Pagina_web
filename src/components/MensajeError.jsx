/** Renderizado condicional: el mensaje solo existe en el DOM cuando hay error. */
export default function MensajeError({ hayError, texto = "Ocurrió un error. Inténtalo nuevamente." }) {
  if (!hayError) return null;
  return (
    <div className="alert alert-danger" role="alert" data-testid="mensaje-error">
      {texto}
    </div>
  );
}
