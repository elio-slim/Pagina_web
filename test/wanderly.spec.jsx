import { act } from "react";
import ListaProductos from "../src/components/ListaProductos.jsx";
import MensajeError from "../src/components/MensajeError.jsx";
import Boton from "../src/components/Boton.jsx";
import SelectorCantidad from "../src/components/SelectorCantidad.jsx";
import FormularioAcceso from "../src/components/FormularioAcceso.jsx";
import ProductoCard from "../src/components/ProductoCard.jsx";
import Header from "../src/components/Header.jsx";
import Campo from "../src/components/Campo.jsx";
import { useFormulario } from "../src/hooks/useFormulario.js";
import { useCart } from "../src/context/CartContext.jsx";
import { PRODUCTOS } from "../src/data/catalogo.js";
import { PRODUCTOS_ADMIN_SEED } from "../src/data/mock.js";
import AdminProductosCriticos from "../src/admin/AdminProductosCriticos.jsx";
import { montar, limpiar, ConProveedores, clic, escribir, enviar } from "./helpers.jsx";

describe("Wanderly — pruebas unitarias de componentes", () => {
  afterEach(limpiar);

  // ───────────── 2 pruebas de RENDERIZADO ─────────────
  describe("Renderizado", () => {
    it("1. ListaProductos renderiza un elemento por cada producto recibido", () => {
      const datos = PRODUCTOS.slice(0, 4);
      const dom = montar(<ConProveedores><ListaProductos productos={datos} /></ConProveedores>);
      const items = dom.querySelectorAll('[data-testid="lista-productos"] > li');
      expect(items.length).toBe(4);
      expect(dom.textContent).toContain(datos[0].nombre);
      expect(dom.textContent).toContain(datos[3].nombre);
    });

    it("2. MensajeError solo se muestra cuando el estado de error es verdadero", () => {
      const sinError = montar(<MensajeError hayError={false} texto="Falló el pago" />);
      expect(sinError.querySelector('[data-testid="mensaje-error"]')).toBeNull();

      const conError = montar(<MensajeError hayError={true} texto="Falló el pago" />);
      const alerta = conError.querySelector('[data-testid="mensaje-error"]');
      expect(alerta).not.toBeNull();
      expect(alerta.textContent).toBe("Falló el pago");
    });
  });

  // ───────────── 2 pruebas de PROPS ─────────────
  describe("Props", () => {
    it("3. Boton recibe y muestra su label por props", () => {
      const dom = montar(<Boton label="Comprar ahora" />);
      expect(dom.querySelector("button").textContent).toBe("Comprar ahora");
    });

    it("4. Boton ejecuta la función onClick recibida por props al hacer clic", () => {
      const espia = jasmine.createSpy("onClick");
      const dom = montar(<Boton label="Guardar" onClick={espia} />);
      clic(dom.querySelector("button"));
      clic(dom.querySelector("button"));
      expect(espia).toHaveBeenCalledTimes(2);
    });
  });

  // ───────────── 2 pruebas de ESTADO ─────────────
  describe("Estado", () => {
    it("5. El estado de los inputs del formulario cambia cuando el usuario escribe", () => {
      function Demo() {
        const form = useFormulario({ nombre: { id: "t-nombre", tipo: "nombre", required: true } });
        return <Campo form={form} nombre="nombre" config={{ id: "t-nombre", tipo: "nombre", required: true }} etiqueta="Nombre" type="text" />;
      }
      const dom = montar(<Demo />);
      const input = dom.querySelector("#t-nombre");
      expect(input.value).toBe("");
      escribir(input, "Ana Pérez");
      expect(input.value).toBe("Ana Pérez");
    });

    it("6. SelectorCantidad actualiza su estado interno ante cada interacción", () => {
      const dom = montar(<SelectorCantidad inicial={2} max={3} />);
      const salida = dom.querySelector('[data-testid="cantidad"]');
      const [menos, mas] = dom.querySelectorAll("button");
      expect(salida.textContent).toBe("2");
      clic(mas);
      expect(salida.textContent).toBe("3");
      clic(mas); // respeta el máximo
      expect(salida.textContent).toBe("3");
      clic(menos);
      expect(salida.textContent).toBe("2");
    });
  });

  // ───────────── 2 pruebas de SIMULACIÓN DE EVENTOS ─────────────
  describe("Simulación de eventos", () => {
    it("7. Clic en «Agregar al carrito» cambia el estado del carrito", () => {
      function Contador() {
        const { totalPersonas } = useCart();
        return <span data-testid="total">{totalPersonas}</span>;
      }
      const dom = montar(
        <ConProveedores>
          <ProductoCard producto={PRODUCTOS[0]} />
          <Contador />
        </ConProveedores>
      );
      expect(dom.querySelector('[data-testid="total"]').textContent).toBe("0");
      const boton = [...dom.querySelectorAll("button")].find((b) => b.textContent.includes("Agregar al carrito"));
      clic(boton);
      expect(dom.querySelector('[data-testid="total"]').textContent).toBe("1");
    });

    it("8. Envío del formulario (onSubmit) ejecuta su handler con los datos ingresados", () => {
      const handler = jasmine.createSpy("onEnviar");
      const dom = montar(<FormularioAcceso onEnviar={handler} />);
      escribir(dom.querySelector("#l-email"), "ana@correo.com");
      escribir(dom.querySelector("#l-clave"), "Secreta123");
      enviar(dom.querySelector("form"));
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.calls.mostRecent().args[0]).toEqual({ email: "ana@correo.com", clave: "Secreta123" });
    });
  });

  // ───────────── 2 pruebas ADICIONALES (DOM y datos mock) ─────────────
  describe("Integración / DOM y lógica", () => {
    it("9. El botón del menú del Header actualiza clases y atributos en el DOM", () => {
      const dom = montar(<ConProveedores><Header /></ConProveedores>);
      const nav = dom.querySelector("#siteNav");
      const toggle = dom.querySelector("#navToggle");
      expect(nav.classList.contains("open")).toBeFalse();
      expect(toggle.getAttribute("aria-expanded")).toBe("false");
      clic(toggle);
      expect(nav.classList.contains("open")).toBeTrue();
      expect(toggle.getAttribute("aria-expanded")).toBe("true");
    });

    it("10. Los componentes usan datos mock y almacenamiento simulado (localStorage)", () => {
      // Almacenamiento simulado: el inventario mock se siembra en localStorage al abrir la vista.
      const criticosEsperados = PRODUCTOS_ADMIN_SEED.filter((p) => p.stock <= p.stockCritico);
      const dom = montar(<ConProveedores><AdminProductosCriticos /></ConProveedores>);
      expect(dom.querySelectorAll("tbody tr").length).toBe(criticosEsperados.length);
      expect(localStorage.getItem("wanderly_admin_productos")).not.toBeNull();
    });
  });
});
