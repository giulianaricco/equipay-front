import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const InvitarAmigo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extraer los parámetros de la URL
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    const groupId = searchParams.get('groupId');

    // Hacer la llamada a la API con Axios
    if (userId && groupId) {
      unirse(userId, groupId);
    }
  }, [location.search]);

  const unirse = async (userId, groupId) => {
    console.log({
      userId,
      groupId
    })

    navigate('/detalle-grupo/1');
    return 

    // llamas al back
    /*await axios.get(`http://localhost:8080/api/usuarios/${correo}/grupos`)
      .then((response) => {
        // redirecciono si todo fue ok
        navigate('/detalle-grupo/1');
      })
      .catch((error) => {
        console.error('Error al unirse al grupo', error);
      });*/
  };

  return (
    <div>Uniendo...</div>
  );

}; export default InvitarAmigo;
