import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="brand footer-logo">
            Wanderly<span className="brand-dot">.</span>
          </p>
          <p className="footer-tagline">Viajes diseñados alrededor de tu curiosidad, no de un catálogo.</p>
        </div>

        <nav className="footer-col" aria-label="Explora">
          <h3>Explora</h3>
          <Link to="/destinos">Destinos</Link>
          <Link to="/experiencias">Experiencias</Link>
          <Link to="/paquetes">Paquetes</Link>
        </nav>

        <nav className="footer-col" aria-label="Wanderly">
          <h3>Wanderly</h3>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/login">Ingresar</Link>
          <Link to="/carrito">Carrito</Link>
        </nav>

        <address className="footer-col" id="footer-contact">
          <h3>Contáctanos</h3>
          <a href="mailto:hola@wanderly.cl">hola@wanderly.cl</a>
          <a href="tel:+56900000000">+56 9 0000 0000</a>
          <span className="footer-address">Santiago, Chile</span>
        </address>
      </div>

      <div className="image-credits">
        <strong>Fotografías:</strong> Atacama — Leandro Neumann Ciuffo (CC BY 2.0); Torres del Paine — Gonzalobaeza (CC BY); Chiloé —
        Cplandco (CC BY-SA 4.0); Valle Sagrado — Emmanuel DYAN (CC BY 2.0); Cartagena — Robert Schediwy (dominio público); Bariloche —
        Matiasmehdi (dominio público). Fuentes:{" "}
        <a href="https://commons.wikimedia.org/" target="_blank" rel="noopener noreferrer">
          Wikimedia Commons
        </a>
        .
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} Wanderly. Proyecto académico — DSY1104 Desarrollo Fullstack II.</p>
          <button type="button" className="btn-top" id="btnTop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Volver arriba
          </button>
        </div>
      </div>
    </footer>
  );
}
