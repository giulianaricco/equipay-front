import React, { useState, useEffect } from 'react';
import Header from '../componentes/Header';
import Boton from '../componentes/Boton';
import Card from '../componentes/Card'; // Importa el componente Card
import InputField from '../componentes/InputField';
import axios from 'axios';

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState(''); 

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('/api/usuarios/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsuarios();
  }, []); 

  // Ordenar la lista de grupos por fecha de creación, nombre, apellido o correo electrónico
  const ordenarUsuarios = (criterio) => {
    const sortedUsuarios = [...usuarios];
    sortedUsuarios.sort((a, b) => {
      if (criterio === 'fechaCreacion') {
        return new Date(a.fechaCreacion) - new Date(b.fechaCreacion);
      } else if (criterio === 'apellido') {
        // Ordenar por apellido y, si es nulo, por nombre
        if (a.apellido !== null && b.apellido !== null) {
          return a.apellido.localeCompare(b.apellido) || a.nombre.localeCompare(b.nombre);
        } else if (a.apellido === null && b.apellido !== null) {
          return 1; // Mover elementos con apellido nulo al final
        } else if (a.apellido !== null && b.apellido === null) {
          return -1; // Mover elementos con apellido nulo al final
        } else {
          return a.nombre.localeCompare(b.nombre); // Ordenar por nombre si ambos apellidos son nulos
        }
      } else if (criterio === 'nombre') {
        return a.nombre.localeCompare(b.nombre);
      }
      return 0;
    });
    setUsuarios(sortedUsuarios);
  };

  // Filtrar y ver los usuarios bloqueados
  const mostrarBloqueados = () => {
    const bloqueados = usuarios.filter((usuario) => usuario.bloqueado);
    setUsuarios(bloqueados);
  };

  
  const resetearListaUsuarios = async () => {
    try {
      const response = await fetch('/api/usuarios/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ marginTop: '50px', width: '100%', padding: '0 30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Boton onClick={() => ordenarUsuarios('fechaCreacion')}>Ordenar por Fecha de Creación</Boton>
          <Boton onClick={() => ordenarUsuarios('apellido')}>Ordenar por Apellido</Boton>
          <Boton onClick={() => ordenarUsuarios('nombre')}>Ordenar por Nombre</Boton>
          <Boton onClick={mostrarBloqueados}>Mostrar Bloqueados</Boton>
          <Boton onClick={resetearListaUsuarios}>Resetear Lista</Boton>
        </div>
        <Card title="Lista de Usuarios">
          <ul>
            {usuarios.map((usuario) => (
              <li key={usuario.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                <p>{usuario.correo}</p>
                <p>{usuario.nombre} {usuario.apellido ? usuario.apellido : ' '}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ListarUsuarios;
