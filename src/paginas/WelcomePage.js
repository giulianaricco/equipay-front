import React from 'react';import EquiPayLogo from '../img/EquiPay-verde-sinFondo.png';
import UsuarioHeader from "../componentes/UsuarioHeader";
import AdminHeader from "../componentes/AdminHeader";
import { useAuth } from '../contexto/AuthContext';

function WelcomePage() {
  const { user } = useAuth();

  const textStyle = {
    color: 'black',
    textAlign: 'center',
    fontSize: '2.5em',  // Ajusta el tamaño del texto según tus preferencias
    fontWeight: 'bold',
  };

  const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',  // Ajusta esto según tu diseño
    };

  return (
    <div>
      {user && user.rol === 'Usuario' && <UsuarioHeader nombre={user.nombre} />}
      {user && user.rol === 'Admin' && <AdminHeader nombre={user.nombre} />}
      <div style={containerStyle}>
      <div style={textStyle}>
        <p>¡Bienvenido/a!</p>
      </div>
      <img src={EquiPayLogo} alt="Descripción de la imagen" style={{ maxWidth: '100%' }} />
    </div>
    </div>
  );
}

export default WelcomePage;
