import React, { useState } from 'react';
import Header from '../../componentes/Header';
import Boton from '../../componentes/Boton';
import Card from '../../componentes/Card'; 
import InputField from '../../componentes/InputField';
import axios from '../../utils/axios';
import './AgregarGrupo.css';

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
  const [nombreGrupo, setNombreGrupo] = useState('');
  const [contacto, setContacto] = useState('');
  const [mostrarLabel, setMostrarLabel] = useState(false);
  const [mostrarBotonContinuar, setMostrarBotonContinuar] = useState(false);
  const [mostrarBotonCrearGrupo, setMostrarBotonCrearGrupo] = useState(true);
  const [amigos, setAmigos] = useState([]);
  const [descripcion, setDescripcion] = useState('');

  const handleNombreGrupoChange = (event) => {
    setNombreGrupo(event.target.value);
  };

  const handleContactoChange = (event) => {
    setContacto(event.target.value);
  };

  const handleContinuarClick = () => {
    // if (nombreGrupo.length >= 3) {
    //   setMostrarLabel(true);
    //   setMostrarBotonContinuar(false);
    //   setMostrarBotonCrearGrupo(true);
    // } else {
    //   alert('El nombre del grupo debe tener al menos 3 caracteres.');
    // }
  };

  const validarContacto = (contacto) => {
    const esEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto);

    return esEmailValido;
  };

  const handleAgregarAmigo = () => {
    if (validarContacto(contacto)) {
      setAmigos([...amigos, contacto]);
      setContacto('');
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
        idDueño: "agustin@mail.com", // Reemplaza con el ID adecuado del dueño
      };

      axios
        .post('/api/grupos/', nuevoGrupo)
        .then((response) => {
          console.log('Grupo creado con éxito:', response.data);
        })
        .catch((error) => {
          console.error('Error al crear el grupo:', error);
        });
  };


  return (
    <div id="AgregarGrupo">
      <Header />
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
              <Boton onClick={handleContinuarClick}>Continuar</Boton>
            )}
          </div>
        </Card>
      </div>
    </div>
  );

}; export default PaginaAgregarGrupo;
