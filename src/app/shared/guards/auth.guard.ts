import { CanActivateFn } from '@angular/router';

// Función guard que verifica si el usuario está autenticado
export const authGuard: CanActivateFn = (route, state) => {

  // Verifica si el token de usuario está en localStorage (simulando autenticación)
  const token = localStorage.getItem('userToken');

  // Si el token existe, el usuario está autenticado, así que podemos permitir el acceso
  if (token) {
    return true;
  } else {
    // Si no hay token, redirige a la página de inicio de sesión (por ejemplo)
    return false;
  }
};
