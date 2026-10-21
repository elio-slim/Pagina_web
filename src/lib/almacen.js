/** Acceso seguro a localStorage (puede fallar en modo privado o con el almacenamiento bloqueado). */

export function leerAlmacen(clave, porDefecto) {
  try {
    const crudo = localStorage.getItem(clave);
    return crudo ? JSON.parse(crudo) : porDefecto;
  } catch (e) {
    return porDefecto;
  }
}

export function guardarAlmacen(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (e) {
    return false;
  }
}

export function borrarAlmacen(clave) {
  try {
    localStorage.removeItem(clave);
  } catch (e) {
    /* sin almacenamiento: nada que borrar */
  }
}
