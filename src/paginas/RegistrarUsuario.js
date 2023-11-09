import React, { useState } from "react";
import Header from '../componentes/Header';
import Boton from '../componentes/Boton';
import Card from '../componentes/Card'; // Importa el componente Card
import InputField from '../componentes/InputField';

function RegistrarUsuario() {

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Por favor complete nombre, email y contraseña.");
      return;
    }

    const data = {
      nombre: name,
      apellido: lastName,
      correo: email,
      password: password,
    };

    try {
      // Llamada a la API con fetch
      const response = await fetch('/api/usuarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        console.log('Usuario registrado exitosamente');
        alert("Usuario registrado correctamente.");
      } else if (response.status === 409) {
        console.log('Ya existe un usuario con el correo ingresado');
        alert('Ya existe un usuario con el correo ingresado.');
      } else {
        console.error('Error inesperado:', response.statusText);
        alert('Error inesperado: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Header /*isLoggedIn={false} isAdmin={false} *//>
      <div style={{ marginTop: '50px' }}>
        <div className="container">
          <Card title="Registrar Usuario">
            <div className="form-group">
              <InputField
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <InputField
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <InputField
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className='placeholder-white'
                style={{
                  backgroundColor: '#27A281', // Fondo verde
                  borderRadius: '5px', // Esquinas redondeadas
                  padding: '8px', // Relleno interno
                  border: '1px solid white', // Borde blanco
                  color: 'white', // Texto en blanco
                  placeholder: 'white', // Color del marcador de posición en blanco
                }}
              />
            </div>

            <Boton onClick={handleSubmit}>Registrarse</Boton>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RegistrarUsuario;