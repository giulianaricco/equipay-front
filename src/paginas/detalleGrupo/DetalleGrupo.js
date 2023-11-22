import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import Header from '../../componentes/Header';
import Boton from '../../componentes/Boton';
import Card from '../../componentes/Card';
import { useParams } from 'react-router-dom';



const GrupoDetalle = () => {
  // Obtén el valor del parámetro 'id' de la URL
  const { id } = useParams();
  const [grupo, setGrupo] = useState(id);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/grupos/${grupo}`, {
        headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJub21icmUiOiJSb21pbmEiLCJyb2wiOiJVc3VhcmlvIiwic3ViIjoicm9taW5hQG1haWwuY29tIiwiaWF0IjoxNjk5OTMzMTYxLCJleHAiOjE2OTk5MzQ5NjF9.ryJksOX0ZwPEi0ho4ubjNCT1MKrab3ql5xM_UocU36s"},
      });
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
      <Header />
      <div style={{ marginTop: '50px' }}></div>
      <Card title="Grupo">
        <table className="table-container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha de Creación</th>
              <th>ID dueño</th>
              <th>ID miembros</th>
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
              {grupo.idMiembros.map((miembro, index) => (
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
