import React from "react";
import AdminHeader from "../../componentes/AdminHeader";
import Boton from "../../componentes/Boton";
import Card from "../../componentes/Card";
import InputField from "../../componentes/InputField";
import Dropdown from "../../componentes/Dropdown";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexto/AuthContext';

const AltaUsuario = () => {
  const { getToken } = useAuth();
  const token = getToken();

  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rol, setRol] = React.useState("");

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !lastName || !email || !password || !rol) {
      alert("Por favor complete todos los campos.");
      return;
    }

    const data = {
      nombre: name,
      apellido: lastName,
      correo: email,
      password: password,
      rol: rol,
    };

    var response = null;

    if (data.rol === "Admin") {
      try {
        response = await fetch('/api/admins', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      try {
        response = await fetch('/api/auth/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
      
    if (response.ok) {
      console.log('Usuario registrado exitosamente');
      alert("Usuario registrado correctamente.");
      navigate('/welcome');
    } else if (response.status === 409) {
      console.log('Ya existe un usuario con el correo ingresado');
      alert('Ya existe un usuario con el correo ingresado.');
    } else {
      console.error('Error inesperado:', response.statusText);
      alert('Error inesperado: ' + response.statusText);
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    navigate('/welcome');
  }

  return (
    <div>
    <AdminHeader/>
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
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          <div className="form-group">
              <label style={{ marginRight: '5px' }}>Selecciona:</label>
              <Dropdown
                options={["Admin", "Usuario"]}
                value={rol}
                onChange={(value) => setRol(value)}
                placeholder="Rol"
              />
            </div>

          <Boton onClick={handleSubmit}>Agregar usuario</Boton>
          <Boton onClick={handleCancel}>Cancelar</Boton>
        </Card>
      </div>
    </div>
  </div>
  );
}

export default AltaUsuario;