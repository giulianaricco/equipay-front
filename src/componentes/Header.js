import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const buttonStyle = {
    background: '#27A281',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    margin: '0 10px',
    cursor: 'pointer',
    borderRadius: '20px', // Agrega border-radius para hacer los botones redondeados
  };

  return (
    <div
      style={{
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        color: '#27A281',
      }}
    >
      <div>
        <span style={{ fontSize: '1.5em', fontWeight: 'bold' }}>EQUIPAY</span>
      </div>
      <div>
        <Link to="/" style={buttonStyle}>
          Inicio
        </Link>
      </div>
    </div>
  );
};

export default Header;

