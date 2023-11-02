// componentes/InputField.js

import React from 'react';

const InputField = ({ value, onChange, placeholder }) => {
  const inputStyles = {
    backgroundColor: '#27A281', // Fondo verde
    borderRadius: '5px', // Esquinas redondeadas
    padding: '8px', // Relleno interno
    border: '1px solid white', // Borde blanco
    color: 'white', // Texto en blanco
    placeholder: 'white', // Color del marcador de posición en blanco
  };

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={inputStyles} // Aplica los estilos definidos
      className='placeholder-white'
    />
  );
};

export default InputField;



