import React, { useState } from "react";
import axios from "axios";
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
      alert("Por favor nombre, email y contraseña");
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

      // Manejo de la respuesta de la API
      if (response.ok) {
        console.log('Usuario registrado exitosamente');
        alert("Usuario registrado correctamente");
        
        // Redireccionar al usuario a la página de inicio de sesión
        //setTimeout(function(){
        //  window.location.href = '/login';
        //}, 2000);
      } else {
        console.error('Error al registrar el usuario');
        alert("Error al registrar usuario");
      }
    } catch (error) {
      // Manejo de errores
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
              <InputField
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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