import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../../componentes/InputField';
import Boton from '../../componentes/Boton';
import PublicHeader from '../../componentes/PublicHeader';
import Card from '../../componentes/Card';

const RecuperarContrasena = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRecuperarContrasenaClick = () => {
    // Validar que el correo electrónico no esté vacío
    if (email.trim() === '') {
      setMensaje('Por favor, ingrese su correo electrónico.');
      return;
    }

    // Realizar la solicitud POST al endpoint con el correo electrónico proporcionado
    axios
      .post(`http://localhost:8080/api/auth/contrasena?idUsuario=${email}`)
      .then((response) => {
        // Manejar la respuesta del servidor
        setMensaje('Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña.');
      })
      .catch((error) => {
        // Manejar errores de la solicitud
        setMensaje('Error al intentar recuperar la contraseña. Por favor, inténtelo de nuevo.');
      });
  };

  return (
    <div>
      <PublicHeader />
      <div style={{ marginTop: '50px' }}></div>
      <Card title="Recuperar contraseña">
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <InputField type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <Boton onClick={handleRecuperarContrasenaClick} className="btn btn-primary">
            Recuperar Contraseña
          </Boton>
        </div>
        {mensaje && <p>{mensaje}</p>}
      </Card>
    </div>
  );
};


export default RecuperarContrasena;
