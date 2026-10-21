import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

/** Estructura común a todas las páginas: cabecera, contenido (<main>) y pie. */
export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
