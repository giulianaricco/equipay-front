import React from 'react';

const cardStyles = {
  card: {
    backgroundColor: '#27A281',
    color: 'white',
    padding: '0rem',
    paddingBottom: '1rem',
    borderRadius: '10px',
    margin: '0 auto',
    maxWidth: '60%',
  },
  cardTitle: {
    backgroundColor: 'black',
    padding: '10px',
    fontWeight: 'bold',
    textAlign: 'center', // Centra el texto
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  cardContent: {
    paddingTop: '20px', // Ajusta el espacio en la parte superior
    textAlign: 'center', // Centra el contenido
  },
};

const Card = ({ title, children }) => {
  return (
    <div style={cardStyles.card}>
      <div style={cardStyles.cardTitle}>{title}</div>
      <div style={cardStyles.cardContent}>{children}</div>
    </div>
  );
};

export default Card;


