import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { borrarSesion, iniciarSesion, obtenerSesion, registrarUsuario } from "../lib/usuarios.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(() => obtenerSesion());

  const registrar = useCallback(async (datos) => {
    const resultado = await registrarUsuario(datos);
    if (resultado.ok) setSesion(resultado.sesion);
    return resultado;
  }, []);

  const ingresar = useCallback(async (datos) => {
    const resultado = await iniciarSesion(datos);
    if (resultado.ok) setSesion(resultado.sesion);
    return resultado;
  }, []);

  const salir = useCallback(() => {
    borrarSesion();
    setSesion(null);
  }, []);

  const valor = useMemo(() => ({ sesion, registrar, ingresar, salir }), [sesion, registrar, ingresar, salir]);
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
