import React from 'react';

//falta que obtenga los estados sin pasarselos manual

function Header({ isLoggedIn, isAdmin }) {
  return (
    <header class="p-3 mb-3 border-bottom">
    <div class="container">
        <div class="d-flex align-items-center justify-content-between">
            Logo y/o nombre
            <div class="d-flex flex-row align-items-center">
            {isLoggedIn ? (
              <div>
                {isAdmin ? (
                  <p>Bienvenido, Administrador</p>
                  //aca en vez de adminisrador o usuario, obtener nombre
                ) : (
                  <p>Bienvenido, Usuario</p>
                )}
                <button>Perfil</button>
                <button>Cerrar sesión</button>
              </div>
            ) : (
              <><button>Iniciar sesión</button><button>Registrarse</button></>
            )}
            </div>
        </div>
    </div>
    </header>
  );
}

export default Header;
