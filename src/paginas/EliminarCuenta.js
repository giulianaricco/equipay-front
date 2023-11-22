import React, { useState, useEffect } from 'react';
import AdminHeader from '../componentes/AdminHeader';
import UsuarioHeader from '../componentes/UsuarioHeader';
import Boton from '../componentes/Boton';
import Card from '../componentes/Card';
import axios from '../utils/axios';
import { useAuth } from '../contexto/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const styles = {
  inputStyle: {
    width: '80%',
    backgroundColor: '#27A281', // Fondo verde
    borderRadius: '5px', // Esquinas redondeadas
    padding: '8px', // Relleno interno
    border: '1px solid white', // Borde blanco
    color: 'white', // Texto en blanco
    placeholder: 'white', // Color del marcador de posición en blanco
  },
  selectStyle: {
    width: '80%',
    backgroundColor: '#27A281', // Fondo verde
    borderRadius: '5px',
    padding: '8px',
    border: '1px solid white', // Borde blanco
    color: 'white', // Texto en blanco
    placeholder: 'white', // Color del marcador de posición en blanco
  }

};

const EliminarCuenta = () => {
  const { getToken } = useAuth();
  const token = getToken();
  const { user } = useAuth();
  const [idUsuario, setIdUsuario] = useState("");
  const [usuarioDetalles, setUsuarioDetalles] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar detalles del usuario al montar el componente
    if (user) {
      cargarDetallesUsuario(user.correo);
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

  const cargarDetallesUsuario = async (selectedUserId) => {
    try {
      const response = await axios.get(`/api/usuarios/${selectedUserId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
      });
  
      if (response.status === 200) {
        setUsuarioDetalles(response.data);
      }
    } catch (error) {
      console.error('Error al obtener los detalles del usuario:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.delete(`/api/usuarios/${idUsuario}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 200) {
        console.log('Usuario eliminado exitosamente');
        alert("Usuario eliminado exitosamente.");
        // Actualizar la lista después de la eliminación
        setIdUsuario("");
        navigate('/');
        
      } else {
        console.error('Error inesperado:', response.statusText);
        alert('Error inesperado: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {user && user.rol === 'Usuario' && <UsuarioHeader nombre={user.nombre} />}
      {user && user.rol === 'Admin' && <AdminHeader nombre={user.nombre} />}
      {(
        <div style={{ marginTop: '50px' }}>
          <div className="container">
            <Card title="Eliminar Cuenta">
              {usuarioDetalles && (
                <div style={styles.userDetails}>
                  <h4>Detalles del Usuario</h4>
                  <p>Correo: {usuarioDetalles.correo}</p>
                  <p>Nombre: {usuarioDetalles.nombre} {usuarioDetalles.apellido ? usuarioDetalles.apellido : ' '}</p>
                </div>
              )}
              <Boton onClick={confirmarEliminacion}>Eliminar</Boton>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default EliminarCuenta;