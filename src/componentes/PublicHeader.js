// PublicHeader.js
import React from 'react';
import { Link } from 'react-router-dom';

const PublicHeader = () => {
  const headerStyle = {
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center', // Centrar verticalmente los elementos
    padding: '10px',
    color: '#27A281',
  };

  const buttonStyle = {
    background: '#27A281',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    margin: '10px', // Ajusta el valor según tus preferencias
    cursor: 'pointer',
    borderRadius: '20px',
  };

  return (
    <div style={headerStyle}>
      <div>
        <span style={{ fontSize: '1.5em', fontWeight: 'bold' }}>EQUIPAY</span>
      </div>
      <div>
        <Link to="/iniciar-sesion" style={buttonStyle}>
          Iniciar sesión
        </Link>
        <Link to="/registrar-usuario" style={buttonStyle}>
          Registrarse
        </Link>
      </div>
    </div>
  );
};

export default PublicHeader;
