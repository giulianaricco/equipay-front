import React from 'react';
import { useAuth } from '../contexto/AuthContext';
import { useNavigate } from 'react-router-dom';

const UsuarioHeader = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Llamar a la función logout al hacer clic en el botón de cerrar sesión
    logout();
    // Redirigir a la página de inicio después del logout
    navigate('/');
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
            <span style={{ fontSize: '1.5em', fontWeight: 'bold' }}>EQUIPAY</span>
          </div>
          <div>
            <select style={selectStyle} onChange={(e) => navigate(e.target.value)}>
                <option value="/" disabled>Grupos</option>
                <option value="/agregar-grupo">Alta de grupo</option>
                <option value="/otra-opcion-usuario">Baja de grupo</option>
                <option value="/listar-grupos">Listar grupos</option>
                <option value="/listar-grupos">Buscar grupo</option>
                <option value="/otra-opcion-usuario">Visualizar actividad</option>
                <option value="/registrar-gasto">Registrar gasto</option>
                <option value="/otra-opcion-usuario">Registrar pago</option>
                <option value="/otra-opcion-usuario">Consultar deudas</option>
            </select>
            <select style={selectStyle} onChange={(e) => navigate(e.target.value)}>
                <option value="/" disabled>Perfil</option>
                <option value="/otra-opcion-categoria">Modificar perfil</option>
                <option value="/otra-opcion-categoria">Eliminar cuenta</option>
                <option value="/otra-opcion-categoria">Eliminar cuenta</option>
                <option value="/otra-opcion-categoria">Visualizar estadísticas</option>
                <option onClick={handleLogout}>Cerrar sesión</option>
            </select>
          </div>
        </div>
      );
};

export default UsuarioHeader;
