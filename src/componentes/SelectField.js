import React from 'react';

const SelectField = ({ value, onChange, placeholder, options }) => {
  const selectStyles = {
    backgroundColor: '#27A281', // Fondo verde
    borderRadius: '5px', // Esquinas redondeadas
    padding: '8px', // Relleno interno
    border: '1px solid white', // Borde blanco
    color: 'white', // Texto en blanco
  };

  return (
    <select
      value={value}
      onChange={onChange}
      style={selectStyles} // Aplica los estilos definidos
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
