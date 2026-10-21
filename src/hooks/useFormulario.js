import { useCallback, useState } from "react";
import { obtenerError } from "../lib/validaciones.js";

/**
 * useFormulario
 * Motor de validación de formularios (equivalente al antiguo validaciones.js).
 *
 * - Valida al salir del campo (blur) y en tiempo real una vez que hay error.
 * - Cada campo tiene su regla y un mensaje específico bajo el campo (sin alert()).
 * - Bloquea el envío mientras existan datos incorrectos o incompletos.
 * - Enfoca el primer campo con error.
 *
 * @param {Record<string, {tipo?: string|null, required?: boolean, inicial?: any}>} config
 *   Un campo con tipo null/undefined no se valida (p. ej. comentario opcional).
 * @param {{ manual?: boolean, alValido?: (valores) => void, mensajeExito?: string }} opciones
 *   manual: el envío lo resuelve la página (login/registro) mediante alValido.
 */
export function useFormulario(config, { manual = false, alValido, mensajeExito = "" } = {}) {
  const valoresIniciales = () =>
    Object.fromEntries(
      Object.entries(config).map(([nombre, c]) => [nombre, c.inicial ?? (c.tipo === "acepto" ? false : "")])
    );

  const valoresVacios = () =>
    Object.fromEntries(Object.entries(config).map(([nombre, c]) => [nombre, c.tipo === "acepto" ? false : ""]));

  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [validos, setValidos] = useState({});
  const [estado, setEstado] = useState({ texto: "", tipo: "" });

  const aplicarValidacion = useCallback(
    (nombre, todos) => {
      const campo = config[nombre];
      if (!campo || !campo.tipo) return true;
      const valor = todos[nombre];
      const mensaje = obtenerError(campo, valor, todos);
      setErrores((e) => ({ ...e, [nombre]: mensaje }));
      setValidos((v) => ({
        ...v,
        [nombre]: !mensaje && (campo.tipo === "acepto" ? Boolean(valor) : String(valor).trim() !== ""),
      }));
      return !mensaje;
    },
    [config]
  );

  const cambiar = useCallback(
    (nombre, valor, validarYa = false) => {
      const todos = { ...valores, [nombre]: valor };
      setValores(todos);
      const campo = config[nombre];

      if (validarYa) {
        aplicarValidacion(nombre, todos);
        return;
      }
      // Tiempo real: si el campo ya tenía error (o es un correo, para sugerir dominio) se revalida.
      if (campo?.tipo === "password" && todos.confirmar) aplicarValidacion("confirmar", todos);
      if (errores[nombre] || campo?.tipo === "email") aplicarValidacion(nombre, todos);
    },
    [valores, errores, config, aplicarValidacion]
  );

  const salirDelCampo = useCallback((nombre) => aplicarValidacion(nombre, valores), [valores, aplicarValidacion]);

  const reiniciar = useCallback(() => {
    // Como form.reset() del HTML: tras enviar, los campos quedan en blanco.
    setValores(valoresVacios());
    setErrores({});
    setValidos({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enviar = useCallback(
    (evento) => {
      evento.preventDefault();

      const nombres = Object.keys(config).filter((n) => config[n].tipo);
      const resultados = nombres.map((n) => [n, aplicarValidacion(n, valores)]);
      const invalidos = resultados.filter(([, ok]) => !ok).map(([n]) => n);

      if (invalidos.length > 0) {
        setEstado({ texto: `Revisa los ${invalidos.length} campo(s) marcados antes de enviar.`, tipo: "error" });
        const primero = config[invalidos[0]].id;
        window.setTimeout(() => document.getElementById(primero)?.focus(), 0);
        return;
      }

      // Formularios con lógica propia (login/registro): avisamos que ya son válidos.
      if (manual) {
        setEstado({ texto: "", tipo: "" });
        alValido?.(valores);
        return;
      }

      // Sitio sin backend: simulamos el envío y confirmamos al usuario.
      setEstado({ texto: mensajeExito, tipo: "success" });
      reiniciar();
    },
    [config, valores, manual, alValido, mensajeExito, aplicarValidacion, reiniciar]
  );

  return { valores, errores, validos, estado, setEstado, cambiar, salirDelCampo, enviar };
}
