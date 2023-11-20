import React, { useState, useEffect } from 'react';
import Header from '../../componentes/Header';
import Boton from '../../componentes/Boton';
import Card from '../../componentes/Card';
import InputField from '../../componentes/InputField';
import axios from 'axios';
import './ListaGrupos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexto/AuthContext'; 


const ListaGrupos = () => {
  const { getToken } = useAuth();
  const token = getToken();

  const [grupos, setGrupos] = useState([]);
  const [grupoId, setGrupoId] = useState('');
  const [grupoEncontrado, setGrupoEncontrado] = useState(null);
  const [grupoEnEdicion, setGrupoEnEdicion] = useState(null);


  useEffect(() => {
    // Realizar una solicitud GET para obtener la lista de grupos
    // Agregar validacion de cuando es admin, mostrar todos los grupos
    // axios.get('http://localhost:8080/api/grupos/',  headers: {
    //     'Authorization': `Bearer ${token}`  // Agrega el token al encabezado de autorización
    //   }
    // })
    //   .then((response) => {
    //     setGrupos(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error al obtener la lista de grupos:', error);
    //   });
    const correo = 'agustin@mail.com'
    axios.get(`http://localhost:8080/api/usuarios/${correo}/grupos`, {
      headers: {
        'Authorization': `Bearer ${token}`  // Agrega el token al encabezado de autorización
      }
    })
      .then((response) => {
        setGrupos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de grupos:', error);
      });
  }, []);

  // Cuando es admin, buscar todos los grupos:
  // const buscarGrupoPorId = () => {
  //   // Realizar una solicitud GET para buscar un grupo por ID
  //   axios.get(`http://localhost:8080/api/grupos/${grupoId}`,  headers: {
    //     'Authorization': `Bearer ${token}`  // Agrega el token al encabezado de autorización
    //   }
    // })
  //     .then((response) => {
  //       setGrupoEncontrado(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error al buscar el grupo por ID:', error);
  //       setGrupoEncontrado(null); // Restablecer el resultado de la búsqueda
  //     });
  // };

  const buscarGrupoPorId = () => {
    const idBuscado = parseInt(grupoId, 10);

    const grupoEncontrado = grupos.find(grupo => grupo.id === idBuscado);

    if (grupoEncontrado != null) {
      setGrupoEncontrado(grupoEncontrado);
    } else {
      console.error('Grupo no encontrado en los resultados previos.');
      setGrupoEncontrado(null);
    }
  };

  const handleEliminar = (grupoId) => {
    // Realiza la llamada a la API para eliminar el grupo con el ID proporcionado
    axios.delete(`http://localhost:8080/api/grupos/${grupoId}`)
      .then(response => {
        // Actualiza la lista de grupos después de eliminar
        const nuevosGrupos = grupos.filter(grupo => grupo.id !== grupoId);
        setGrupos(nuevosGrupos);
      })
      .catch(error => {
        console.error('Error al eliminar el grupo:', error);
      });
  };

  const handleModificar = (grupoId) => {
    setGrupoEnEdicion(grupos.find(grupo => grupo.id === grupoId));
    // Realiza la llamada a la API para modificar el grupo con el ID proporcionado
    // const nuevoNombre = prompt('Nuevo nombre:');
    // const nuevaDescripcion = prompt('Nueva descripción:');

    // if (nuevoNombre !== null && nuevaDescripcion !== null) {
    //   axios.put(`http://localhost:8080/api/grupos/${grupoId}`, {
    //     nombre: nuevoNombre,
    //     descripcion: nuevaDescripcion
    //   })
    //     .then(response => {
    //       // Actualiza la lista de grupos después de modificar
    //       const nuevosGrupos = grupos.map(grupo =>
    //         grupo.id === grupoId ? { ...grupo, nombre: nuevoNombre, descripcion: nuevaDescripcion } : grupo
    //       );
    //       setGrupos(nuevosGrupos);
    //     })
    //     .catch(error => {
    //       console.error('Error al modificar el grupo:', error);
    //     });
    // }
  };

  const handleGuardarEdicion = () => {
    // Realiza la llamada a la API para modificar el grupo con el ID proporcionado
    const { id, nombre, descripcion } = grupoEnEdicion;
    axios.put(`http://localhost:8080/api/grupos/${id}`, { nombre, descripcion })
      .then(response => {
        // Actualiza la lista de grupos después de modificar
        const nuevosGrupos = grupos.map(grupo =>
          grupo.id === id ? { ...grupo, nombre: grupoEnEdicion.nombre, descripcion: grupoEnEdicion.descripcion } : grupo
        );
        setGrupos(nuevosGrupos);
        // Desactiva el modo de edición
        setGrupoEnEdicion(null);
      })
      .catch(error => {
        console.error('Error al modificar el grupo:', error);
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
            <div style={{ marginTop: '20px' }}></div>
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
            <table className="table-container">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th> {/* Nueva columna para los botones */}
                </tr>
              </thead>
              <tbody>
                {grupos.map((grupo) => (
                  <tr key={grupo.id}>
                    <td>{grupo.id}</td>
                    <td>
                      {/* Si está en modo de edición, muestra un campo de entrada; de lo contrario, muestra el nombre */}
                      {grupoEnEdicion?.id === grupo.id ? (
                        <InputField
                          type="text"
                          value={grupoEnEdicion.nombre}
                          onChange={(e) => setGrupoEnEdicion({ ...grupoEnEdicion, nombre: e.target.value })}
                        />
                      ) : (
                        grupo.nombre
                      )}
                    </td>
                    <td>
                      {/* Si está en modo de edición, muestra un campo de entrada; de lo contrario, muestra la descripción */}
                      {grupoEnEdicion?.id === grupo.id ? (
                        <InputField
                          type="text"
                          value={grupoEnEdicion.descripcion}
                          onChange={(e) => setGrupoEnEdicion({ ...grupoEnEdicion, descripcion: e.target.value })}
                        />
                      ) : (
                        grupo.descripcion
                      )}
                    </td>
                    <td>
                      {grupoEnEdicion?.id === grupo.id ? (
                        <Boton onClick={handleGuardarEdicion}>Guardar</Boton>
                      ) : (
                        <Boton onClick={() => handleModificar(grupo.id)}>
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </Boton>
                      )}
                        <Boton onClick={() => handleEliminar(grupo.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                        </Boton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ListaGrupos;
