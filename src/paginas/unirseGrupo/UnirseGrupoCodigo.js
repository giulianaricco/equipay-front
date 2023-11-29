import React, { useState } from 'react';
import { useAuth } from '../../contexto/AuthContext';
import Card from '../../componentes/Card';
import Boton from '../../componentes/Boton';
import InputField from '../../componentes/InputField';
import UsuarioHeader from '../../componentes/UsuarioHeader';
import axios from '../../utils/axios';

const UnirseGrupoCodigo = () => {
  const { getToken, user } = useAuth();
  const token = getToken();
  const [codGrupo, setCodigo] = useState('');

  const handleCodigoChange = (event) => {
    setCodigo(event.target.value);
  };

  const handleUnirseAGrupoClick = () => {
    const idUsuario = user.correo;

    axios.post(`/api/grupos/usuarios-codigo`, { idUsuario, codGrupo }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log('Usuario agregado al grupo con éxito:', response.data);
    })
    .catch((error) => {
      console.error('Error al agregar usuario al grupo:', error);
    });
  };

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
                value={codGrupo}
                onChange={handleCodigoChange}
                placeholder="Ingresa el código del grupo"
              />
            </div>
            <Boton onClick={handleUnirseAGrupoClick}>Unirse al Grupo</Boton>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UnirseGrupoCodigo;
