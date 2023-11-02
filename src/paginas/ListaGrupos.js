import React, { useState, useEffect } from 'react';
import Header from '../componentes/Header';
import Boton from '../componentes/Boton';
import Card from '../componentes/Card'; // Importa el componente Card
import InputField from '../componentes/InputField';
import axios from 'axios';

const ListaGrupos = () => {
  const [grupos, setGrupos] = useState([]);
  const [grupoId, setGrupoId] = useState('');
  const [grupoEncontrado, setGrupoEncontrado] = useState(null);

  useEffect(() => {
    // Realizar una solicitud GET para obtener la lista de grupos
    axios.get('http://localhost:8080/api/grupos/')
      .then((response) => {
        setGrupos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de grupos:', error);
      });
  }, []);

  const buscarGrupoPorId = () => {
    // Realizar una solicitud GET para buscar un grupo por ID
    axios.get(`http://localhost:8080/api/grupos/${grupoId}`)
      .then((response) => {
        setGrupoEncontrado(response.data);
      })
      .catch((error) => {
        console.error('Error al buscar el grupo por ID:', error);
        setGrupoEncontrado(null); // Restablecer el resultado de la búsqueda
      });
  };

  return (
    <div>
      <Header />
      <div style={{ marginTop: '50px' }}>
      <div className="container">
        <Card title="Buscar Grupo por ID">
          <div className="form-group">
            <InputField
              value={grupoId}
              onChange={(e) => setGrupoId(e.target.value)}
              placeholder="ID del Grupo"
            />
            <Boton onClick={buscarGrupoPorId}>Buscar</Boton>
          </div>
          {grupoEncontrado && (
            <Card title="Grupo Encontrado">
              <p>ID: {grupoEncontrado.id}</p>
              <p>Nombre: {grupoEncontrado.nombre}</p>
              <p>Descripción: {grupoEncontrado.descripcion}</p>
            </Card>
          )}
        </Card>
        </div>
        <div style={{ marginTop: '50px' }}>
        <Card title="Lista de Grupos">
          <ul>
            {grupos.map((grupo) => (
              <li key={grupo.id}>
                <p>ID: {grupo.id}</p>
                <p>Nombre: {grupo.nombre}</p>
                <p>Descripción: {grupo.descripcion}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
    </div>
  );
};

export default ListaGrupos;
