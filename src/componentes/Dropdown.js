import React from 'react';

const Dropdown = ({ options, value, onChange, placeholder }) => {
  const dropdownStyles = {
    backgroundColor: '#27A281',
    borderRadius: '5px',
    padding: '8px',
    border: '1px solid white',
    color: 'white',
    width: '17%',
  };

  return (
    <select
      style={dropdownStyles}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled hidden>{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};


export default Dropdown;
