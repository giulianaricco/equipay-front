import React, { useState, useEffect } from 'react';
import AdminHeader from '../../componentes/AdminHeader';
import UsuarioHeader from '../../componentes/UsuarioHeader';
import Boton from '../../componentes/Boton';
import Card from '../../componentes/Card';
import axios from '../../utils/axios';
import { useAuth } from '../../contexto/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const EliminarCuenta = () => {
  const { getToken } = useAuth();
  const token = getToken();
  const { user } = useAuth();
  const [idUsuario, setIdUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Actualiza el ID del usuario cuando el usuario cambia
    if (user) {
      setIdUsuario(user.correo); // Asumiendo que `user` tiene una propiedad `id`
    }
  }, [user]);
  

  const confirmarEliminacion = () => {
    // Muestra un cuadro de diálogo de confirmación
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta?");
    
    if (confirmacion) {
      // Si el usuario confirma, procede con la eliminación
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      if (!idUsuario) {
        console.error('ID de usuario no válido');
        return;
      }
      const response = await axios.delete(`/api/usuarios/${idUsuario}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 200) {
        console.log('Usuario eliminado exitosamente');
        alert("Usuario eliminado exitosamente.");
        // Actualizar la lista después de la eliminación
        setIdUsuario(null);
        navigate('/');
        
      } else {
        console.error('Error inesperado:', response.statusText);
        alert('Error inesperado: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = async (e) => {
      e.preventDefault();
      navigate('/welcome');
  }

  return (
    <div>
      {user && user.rol === 'Usuario' && <UsuarioHeader nombre={user.nombre} />}
      {user && user.rol === 'Admin' && <AdminHeader nombre={user.nombre} />}
      {(
        <div style={{ marginTop: '50px' }}>
          <div className="container">
            <Card title="Eliminar Cuenta">
              <br></br>
              <h3>¿Estás seguro de que deseas eliminar tu cuenta?</h3>
              <br></br>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Boton onClick={confirmarEliminacion}>Confirmar</Boton>
                <Boton onClick={handleCancel}>Cancelar</Boton>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default EliminarCuenta;