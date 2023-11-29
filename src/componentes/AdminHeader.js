import React from 'react';
import { useAuth } from '../contexto/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {

  
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
            <span style={{ fontSize: '1.5em', fontWeight: 'bold' }}>EQUIPAY</span>
          </div>
          <div>
            <select style={selectStyle} onChange={(e) => navigate(e.target.value)}>
                <option value="/usuarios">Usuarios</option>
                <option value="/alta-usuario">Alta de usuario</option>
                <option value="/eliminar-usuario">Baja de usuario</option>
                <option value="/listar-usuarios">Listar usuarios</option>
                <option value="/bloquear-usuario">Bloquear usuario</option>
                <option value="/desbloquear-usuario">Desbloquear usuario</option>
                <option value="/visualizar-usuario">Visualizar actividad</option>
            </select>
            <select style={selectStyle} onChange={(e) => navigate(e.target.value)}>
                <option value="/usuarios">Grupos</option>
                <option value="/agregar-grupo-admin">Alta de grupo</option>
                <option value="/listar-grupos-admin">Listar y buscar grupos</option>
                <option value="/listar-grupos-admin">Baja de grupo</option>
                <option value="/visualizar-grupo">Visualizar actividad</option>
                <option value="/estadisticas">Visualizar gráficos</option>
            </select>
            <select style={selectStyle} onChange={(e) => navigate(e.target.value)}>
                <option value="/">Categorías</option>
                <option value="/agregar-categoria">Agregar categoría</option>
                <option value="/eliminar-categoria">Eliminar categoría</option>
                <option value="/modificar-categoria">Modificar categoría</option>
            </select>
            <select style={selectStyle} onChange={(e) => handleOptionSelect(e.target.value)}>
                <option value="/">Perfil</option>
                <option value="/modificar-perfil-admin">Modificar perfil</option>
                <option value="/eliminar-cuenta">Eliminar cuenta</option>
                <option value="/cerrar-sesion">Cerrar sesión</option>
            </select>
          </div>
        </div>
      );
};

export default AdminHeader;
