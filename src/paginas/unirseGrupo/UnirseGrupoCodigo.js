import React, { useState } from 'react';
import { useAuth } from '../../contexto/AuthContext';
import Card from '../../componentes/Card';
import Boton from '../../componentes/Boton';
import InputField from '../../componentes/InputField';
import UsuarioHeader from '../../componentes/UsuarioHeader';
import axios from '../../utils/axios';
import { useNavigate } from "react-router-dom";

const UnirseGrupoCodigo = () => {
  const { getToken, user } = useAuth();
  const token = getToken();
  const [codigo, setCodigo] = useState('');
  const navigate = useNavigate();

  const handleCodigoChange = (event) => {
    setCodigo(event.target.value);
  };

  const handleUnirseAGrupoClick = () => {
    const idUsuario = user.correo; // Asegúrate de ajustar esto según tu implementación real

    // Llama al backend para unirse al grupo con el código
    axios.post(`/api/grupos/${idUsuario}/usuarios-codigo?codigo=${codigo}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log('Usuario agregado al grupo con éxito:', response.data);
      // Agrega aquí la lógica para manejar el éxito, redireccionar, etc.
    })
    .catch((error) => {
      console.error('Error al agregar usuario al grupo:', error);
      // Agrega aquí la lógica para manejar el error, mostrar mensajes, etc.
    });
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    navigate('/welcome');
  }

  return (
    <div id="UnirseAGrupoCodigo">
            <UsuarioHeader />
      <div style={{ marginTop: '50px' }} />
      <div className="container">
        <Card title="Unirse a Grupo por Código">
          <div>
            <div className="form-group">
              <label>Código del Grupo:</label>
              <InputField
                value={codigo}
                onChange={handleCodigoChange}
                placeholder="Ingresa el código del grupo"
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Boton onClick={handleUnirseAGrupoClick}>Unirse al Grupo</Boton>
              <Boton onClick={handleCancel}>Cancelar</Boton>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UnirseGrupoCodigo;
