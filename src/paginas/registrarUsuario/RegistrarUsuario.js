import React, { useState } from "react";
import Boton from '../../componentes/Boton';
import Card from '../../componentes/Card'; // Importa el componente Card
import InputField from '../../componentes/InputField';
import PublicHeader from "../../componentes/PublicHeader";
import { useNavigate } from 'react-router-dom';
import toastr from "../../componentes/Toastr";


function RegistrarUsuario() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toastr.error("Por favor complete nombre, email y contraseña.");
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
      const response = await fetch('http://localhost:8080/api/auth/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        console.log('Usuario registrado exitosamente');
        toastr.success("Usuario registrado correctamente.");
        navigate('/welcome');
      } else if (response.status === 401) {
        console.log('Ya existe un usuario con el correo ingresado');
        toastr.error('Ya existe un usuario con el correo ingresado.');
      } else {
        console.error('Error inesperado:', response.statusText);
        toastr.error('Error inesperado: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = async (e) => {
      e.preventDefault();
      navigate('/');
  }

  return (
    <div>
      <PublicHeader />
      <div style={{ marginTop: '50px' }}>
        <div className="container">
          <Card title="Registro de Usuario">
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Boton onClick={handleSubmit}>Registrarse</Boton>
              <Boton onClick={handleCancel}>Cancelar</Boton>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RegistrarUsuario;
