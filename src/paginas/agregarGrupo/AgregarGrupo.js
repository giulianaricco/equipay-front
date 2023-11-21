import React, { useState } from 'react';
import Header from '../../componentes/Header';
import Boton from '../../componentes/Boton';
import Card from '../../componentes/Card'; 
import InputField from '../../componentes/InputField';
import axios from '../../utils/axios';
import './AgregarGrupo.css';
import { useAuth } from '../../contexto/AuthContext';
import UsuarioHeader from '../../componentes/UsuarioHeader';
import { Navigate } from 'react-router-dom';


const styles = {
  input: {
    width: '100%',
  },
  addButton: {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  roundedInput: {
    width: '100%',
    borderRadius: '5px', 
    padding: '8px', 
    border: '1px solid #27A281',
  },
};

const PaginaAgregarGrupo = () => {
  const { getToken } = useAuth();
  const { user } = useAuth();
  const token = getToken();
  const correo = user.correo;

  const [nombreGrupo, setNombreGrupo] = useState('');
  const [contacto, setContacto] = useState('');
  const [mostrarLabel, setMostrarLabel] = useState(false);
  const [mostrarBotonContinuar, setMostrarBotonContinuar] = useState(false);
  const [mostrarBotonCrearGrupo, setMostrarBotonCrearGrupo] = useState(true);
  const [amigos, setAmigos] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [grupoIdCreated, setGrupoIdCreated] = useState(null); 
  const [correosInvitados, setCorreosInvitados] = useState(new Set());
  const [redireccionar, setRedireccionar] = useState(false);


  const handleNombreGrupoChange = (event) => {
    setNombreGrupo(event.target.value);
  };

  const handleContactoChange = (event) => {
    setContacto(event.target.value);
  };

  const handleContinuarClick = () => {

    setRedireccionar(true);
  };

  if (redireccionar) {
    return <Navigate to="/listar-grupos" />;
  }

  const validarContacto = (contacto) => {
    const esEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto);

    return esEmailValido;
  };

  const handleAgregarAmigo = () => {
    if (validarContacto(contacto)) {
      if (contacto.toLowerCase() === user.correo.toLowerCase()) {
        alert('No puedes invitarte a ti mismo.');
        return; 
      }
      if (correosInvitados.has(contacto.toLowerCase())) {
        alert('Ya has enviado una invitación a este correo.');
        return; // No realizar la solicitud si el correo ya ha sido invitado
      }

      setAmigos([...amigos, contacto]);
      setCorreosInvitados(new Set(correosInvitados).add(contacto.toLowerCase()));
      setContacto('');

      axios.post(`/api/grupos/${grupoIdCreated}/invitar-amigo/${contacto}`, null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log('Amigo invitado con éxito:', response.data);
      })
      .catch((error) => {
        console.error('Error al invitar amigo:', error);
      });
    } else {
      alert('El contacto no es un email válido.');
    }
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value); // Manejar cambios en el campo de descripción
  };

  const handleCrearGrupoClick = () => {
    if (nombreGrupo.length >= 3) {
      setMostrarLabel(true);
      setMostrarBotonContinuar(true);
      setMostrarBotonCrearGrupo(false);
    } else {
      alert('El nombre del grupo debe tener al menos 3 caracteres.');
    }
      const nuevoGrupo = {
        nombre: nombreGrupo,
        descripcion: descripcion, 
        idDueño: correo, // Reemplaza con el ID adecuado del dueño
      };

      axios.post('/api/grupos/', nuevoGrupo, {
        headers: {
          'Authorization': `Bearer ${token}`  // Agrega el token al encabezado de autorización
        }
      })
      .then((response) => {
        const grupoId = response.data;
        setGrupoIdCreated(grupoId);
        console.log('Grupo creado con éxito:', response.data);
      })
      .catch((error) => {
        console.error('Error al crear el grupo:', error);
      });
  };


  return (
    <div id="AgregarGrupo">
      <UsuarioHeader />
      <div className="container">
        <Card title="Agregar Grupo">
          <div>
            <div className="form-group">
              <label>Nombre del Grupo:</label>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <InputField
                  value={nombreGrupo}
                  onChange={handleNombreGrupoChange}
                  placeholder="Nombre del Grupo"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Descripción:</label>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <InputField
                  value={descripcion}
                  onChange={handleDescripcionChange}
                  placeholder="Descripción (opcional)"
                />
              </div>
            </div>

            {mostrarBotonCrearGrupo && (
              <Boton onClick={handleCrearGrupoClick}>Crear Grupo</Boton>
            )}

            {mostrarLabel && (
              <div>
                <div className="form-group">
                  <label>Invita amigos:</label>
                  <InputField
                    value={contacto}
                    onChange={handleContactoChange}
                    placeholder="Correo"
                  />
                  <br />
                  <Boton onClick={handleAgregarAmigo} style={styles.addButton}>
                    Invitar Amigo
                  </Boton>
                </div>
                {amigos.length > 0 && (
                  <div className="form-group">
                    <label>Amigos invitados:</label>
                    <ul>
                      {amigos.map((amigo, index) => (
                        <li key={index}>{amigo}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

           {mostrarBotonContinuar && (
              <Boton onClick={handleContinuarClick}>Ver mis grupos</Boton>
            )}
          </div>
        </Card>
      </div>
    </div>
  );

}; export default PaginaAgregarGrupo;
