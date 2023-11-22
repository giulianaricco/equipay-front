import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { useAuth } from '../../contexto/AuthContext';

const UnirseGrupoLink = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const token = getToken();

  const [estadoUniendo, setEstadoUniendo] = useState('Uniendo...');

  useEffect(() => {
    const unirseAlGrupo = async () => {
      const searchParams = new URLSearchParams(location.search);
      const userId = searchParams.get('userId');
      const groupId = searchParams.get('groupId');

      if (userId && groupId) {
        try {
          const response = await axios.post(`/api/grupos/${groupId}/usuarios-link?idUsuario=${userId}`, null, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          console.log('Usuario agregado al grupo con éxito:', response.data);

          setEstadoUniendo('Unión exitosa. Redirigiendo...');

          setTimeout(() => {
            navigate('/listar-grupos');
          }, 2000);
        } catch (error) {
          console.error('Error al agregar usuario al grupo:', error);
          setEstadoUniendo('Error al unirse al grupo.');
          setTimeout(() => {
            navigate('/listar-grupos');
          }, 2000)
        }
      }
    };

    unirseAlGrupo();
  }, [location.search, navigate, token]);

  return <div>{estadoUniendo}</div>;
};

export default UnirseGrupoLink;


