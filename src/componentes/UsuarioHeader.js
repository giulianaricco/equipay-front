import React from 'react';
import { useAuth } from '../contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UsuarioHeader = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleOptionSelect = (value) => {
    if (value === '/cerrar-sesion') {
      logout();
      navigate('/');
    } 
    else {
      navigate(value);
    }
  };

    const headerStyle = {
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // Centrar verticalmente los elementos
        padding: '10px',
        color: '#27A281',
      };
    
      const selectStyle = {
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
          <Link to="/welcome">
            <span style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#27A281' }}>EQUIPAY</span>
          </Link>
          </div>
          <div>
            <select style={selectStyle} onChange={(e) => navigate(e.target.value)}>
                <option value="/">Grupos</option>
                <option value="/agregar-grupo">Alta de grupo</option>
                <option value="/unirse-grupo-codigo">Unirse a un grupo</option>
                <option value="/listar-grupos">Listar y modificar grupos</option>
                <option value="/invitar-amigo">Invitar amigos a un grupo</option>
                <option value="/registrar-gasto">Registrar gasto</option>
                <option value="/registrar-pago">Registrar pago</option>
                <option value="/consultar-deudas">Consultar deudas</option>
                <option value="/historico-actividad">Actividad del grupo</option>
            </select>
            <select style={selectStyle} onChange={(e) => handleOptionSelect(e.target.value)}>
                <option value="/">Perfil</option>
                <option value="/modificar-perfil">Modificar perfil</option>
                <option value="/eliminar-cuenta">Eliminar cuenta</option>
                <option value="/estadisticas-personales">Visualizar estadísticas</option>
                <option value="/cerrar-sesion">Cerrar sesión</option>
            </select>
          </div>
        </div>
      );
};

export default UsuarioHeader;
