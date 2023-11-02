import React from 'react';

const MessagePopup = ({ message, type, onClose }) => {
  return (
    <div style={{ display: message ? 'block' : 'none' }}>
      <div style={{ backgroundColor: type === 'error' ? 'red' : 'green' }}>
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default MessagePopup; 