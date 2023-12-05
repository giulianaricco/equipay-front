import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import EquiPayLogo from '../../img/EquiPay-verde-sinFondo.png';
import PublicHeader from "../../componentes/PublicHeader";
import { useAuth } from '../../contexto/AuthContext'; 

function PaginaInicio() {
  const { getToken } = useAuth();
  const token = getToken();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Verificar la existencia del token y redirigir según sea necesario
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',  // Ajusta esto según tu diseño
    };
  
    const textStyle = {
      color: 'black',
      textAlign: 'center',
      fontSize: '2.5em',  // Ajusta el tamaño del texto según tus preferencias
      fontWeight: 'bold',
    };
  
    const smallerTextStyle = {
      ...textStyle,  // Copia los estilos del textStyle original
      fontSize: '1.5em',  // Ajusta el tamaño del segundo texto según tus preferencias
    };
        
    return (
      <div>
        <PublicHeader />
        <div style={containerStyle}>
          <div style={textStyle}>
            <p>¡Organiza los gastos con tus amigos!</p>
          </div>
          <img src={EquiPayLogo} 
            alt="Descripción de la imagen" 
            style={{ maxWidth: '100%'}} />
          <div style={smallerTextStyle}>
            <p>También puedes descargar la aplicación en Android y iOS</p>
          </div>
        </div>
      </div>
    );
};

export default PaginaInicio;
