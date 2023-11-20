// jwtUtils.js

export function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error al analizar el token JWT:', error);
      return null;
    }
  }
  
  // función para verificar si un token tiene un rol específico
  export function hasRole(token, roleName) {
    const decodedToken = parseJwt(token);
    return decodedToken && decodedToken.roles && decodedToken.roles.includes(roleName);
  }
  