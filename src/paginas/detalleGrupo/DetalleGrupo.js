import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import UsuarioHeader from '../../componentes/UsuarioHeader';
import Boton from '../../componentes/Boton';
import Card from '../../componentes/Card';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexto/AuthContext';

const GrupoDetalle = () => {
  const { getToken } = useAuth();
  const { user } = useAuth();
  const token = getToken();

  // Obtén el valor del parámetro 'id' de la URL
  const { id } = useParams();
  const [grupo, setGrupo] = useState(id);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/grupos/${grupo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setGrupo(response.data);
    } catch (error) {
      console.error('Error al obtener los datos del grupo:', error);
    }
  };

  fetchData();
}, [grupo]);

if (!grupo) {
  return <p>Cargando...</p>;
}

const idMiembros = grupo.idMiembros || [];

  return (
    <>
      <UsuarioHeader />
      <div style={{ marginTop: '50px' }}></div>
      <Card title="Grupo">
        <table className="table-container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha de Creación</th>
              <th>Dueño</th>
              <th>Miembros</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{grupo.id}</td>
              <td>{grupo.nombre}</td>
              <td>{grupo.descripcion}</td>
              <td>{grupo.fechaCreacion}</td>
              <td>{grupo.idDueño}</td>
              <td>
              {grupo.idMiembros && grupo.idMiembros.map((miembro, index) => (
  <div key={index}>{miembro}</div>
))}

            </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default GrupoDetalle;
