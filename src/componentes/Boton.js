import React from 'react';

const Boton = (props) => {
  return (
    <button
      style={{
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '15px',
        marginBottom: '5px',
      }}
      {...props}
    />
  );
};

export default Boton;
