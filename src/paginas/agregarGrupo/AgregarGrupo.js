import React, { useState } from 'react';
import Header from '../../componentes/Header';
import Boton from '../../componentes/Boton';
import Card from '../../componentes/Card'; // Importa el componente Card
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
    borderRadius: '5px', // Aplicar esquinas redondeadas
    padding: '8px', // Ajusta el relleno
    border: '1px solid #27A281', // Agrega un borde
  },
};

const PaginaAgregarGrupo = () => {
  const [nombreGrupo, setNombreGrupo] = useState('');
  const [contacto, setContacto] = useState('');
  const [mostrarLabel, setMostrarLabel] = useState(false);
  const [mostrarBotonContinuar, setMostrarBotonContinuar] = useState(true);
  const [mostrarBotonCrearGrupo, setMostrarBotonCrearGrupo] = useState(false);
  const [amigos, setAmigos] = useState([]);
  const [descripcion, setDescripcion] = useState('');

  const handleNombreGrupoChange = (event) => {
    setNombreGrupo(event.target.value);
  };

  const handleContactoChange = (event) => {
    setContacto(event.target.value);
  };

  const handleContinuarClick = () => {
    if (nombreGrupo.length >= 3) {
      setMostrarLabel(true);
      setMostrarBotonContinuar(false);
      setMostrarBotonCrearGrupo(true);
    } else {
      alert('El nombre del grupo debe tener al menos 3 caracteres.');
    }
  };

  const validarContacto = (contacto) => {
    const esEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto);
    const esTelefonoValido = /^[0-9]+$/.test(contacto) && contacto.length >= 9;

    return esEmailValido || esTelefonoValido;
  };

  const handleAgregarAmigo = () => {
    if (validarContacto(contacto)) {
      setAmigos([...amigos, contacto]);
      setContacto('');
    } else {
      alert('El contacto no es un email válido ni un número de teléfono válido.');
    }
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value); // Manejar cambios en el campo de descripción
  };

  const handleCrearGrupoClick = () => {
    if (nombreGrupo.length >= 3) {
      const nuevoGrupo = {
        nombre: nombreGrupo,
        descripcion: descripcion, // Asegúrate de obtener la descripción desde el estado
        idDueño: "agustin@mail.com", // Reemplaza con el ID adecuado del dueño
      };

      axios
        .post('/api/grupos/', nuevoGrupo)
        .then((response) => {
          console.log('Grupo creado con éxito:', response.data);
          // Realiza cualquier acción adicional después de crear el grupo
        })
        .catch((error) => {
          console.error('Error al crear el grupo:', error);
          // Maneja los errores de manera adecuada
        });
    } else {
      alert('El nombre del grupo debe tener al menos 3 caracteres.');
    }
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


            {mostrarBotonContinuar && (
              <Boton onClick={handleContinuarClick}>Continuar</Boton>
            )}

            {mostrarLabel && (
              <div>
                <div className="form-group">
                  <label>Invita amigos:</label>
                  <InputField
                    value={contacto}
                    onChange={handleContactoChange}
                    placeholder="Correo o teléfono"
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

            {mostrarBotonCrearGrupo && (
              <Boton onClick={handleCrearGrupoClick}>Crear Grupo</Boton>
            )}
          </div>
        </Card>
      </div>
    </div>
  );

}; export default PaginaAgregarGrupo;
