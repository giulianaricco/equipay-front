import React, { useState, useEffect } from 'react';
import AdminHeader from '../componentes/AdminHeader';
import Boton from '../componentes/Boton';
import Card from '../componentes/Card';
import axios from '../utils/axios';
import { useAuth } from '../contexto/AuthContext'; 

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

const DesbloquearUsuario = () => {
  const { getToken } = useAuth();
  const token = getToken();

  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setIdUsuario] = useState("");
  const [usuarioDetalles, setUsuarioDetalles] = useState(null);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('/api/usuarios/detalles', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) { 
        const usuariosFiltrados = response.data.filter(usuario => usuario.estadoUsuario !== 'ELIMINADO' && usuario.estadoUsuario !== 'ACTIVO');
        setUsuarios(usuariosFiltrados);
      }
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  useEffect(() => {
    // Llamar a obtenerUsuarios al montar el componente
    obtenerUsuarios();
  }, []); // Sin dependencias, se ejecutará solo una vez al montar el componente

  const cargarDetallesUsuario = async (selectedUserId) => {
    try {
      const response = await axios.get(`/api/usuarios/${selectedUserId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 200) {
        setUsuarioDetalles(response.data);
      }
    } catch (error) {
      console.error('Error al obtener los detalles del usuario:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idUsuario) {
      alert("Por favor seleccione un usuario.");
      return;
    }

    cargarDetallesUsuario(idUsuario);

    try {
      
      const response = await axios.post(`/api/usuarios/${idUsuario}/desbloquear`, null, {
      headers: {
          'Authorization': `Bearer ${token}`
      },
      });

      if (response.status === 200) {
        console.log('Usuario bloqueado exitosamente');
        alert("Usuario bloqueado exitosamente.");
        // Actualizar la lista después de la eliminación
        obtenerUsuarios();
        setIdUsuario("");
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
      <AdminHeader />
      {(
        <div style={{ marginTop: '50px' }}>
          <div className="container">
            <Card title="Desbloquear Usuario">
              <div className="form-group">
                <select
                  value={idUsuario}
                  onChange={(e) => {
                    setIdUsuario(e.target.value);
                    // Al cambiar el usuario seleccionado, carga sus detalles
                    cargarDetallesUsuario(e.target.value);
                  }}
                  style={styles.selectStyle}>
                  <option value="">Seleccione un usuario</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.correo} value={usuario.correo}>
                      {usuario.nombre} {usuario.apellido ? usuario.apellido : ' '}
                    </option>
                  ))}
                </select>
              </div>
              {usuarioDetalles && (
                <div style={styles.userDetails}>
                  <h4>Detalles del Usuario</h4>
                  <p>Correo: {usuarioDetalles.correo}</p>
                  <p>Nombre: {usuarioDetalles.nombre} {usuarioDetalles.apellido ? usuarioDetalles.apellido : ' '}</p>
                </div>
              )}
              <Boton onClick={handleSubmit}>Desbloquear</Boton>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesbloquearUsuario;