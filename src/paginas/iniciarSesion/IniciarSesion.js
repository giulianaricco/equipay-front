import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PublicHeader from "../../componentes/PublicHeader";
import Boton from "../../componentes/Boton";
import Card from "../../componentes/Card";
import InputField from "../../componentes/InputField";
import { useAuth } from '../../contexto/AuthContext';
import { Link } from 'react-router-dom';
import toastr from "../../componentes/Toastr";

function IniciarSesion() {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [expoPushToken, setExpoPushToken] = useState("");
    // Obtener la función de navegación
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            toastr.error("Por favor, tiene que introducir email y contraseña");
          return;
        }


        const data = {
            correo: email,
            password: password,
            expoPushToken: expoPushToken,
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Almacenar el token
                const token = await response.text();
                if (token === 'El usuario o la contraseña ingresada no son correctos, vuelva a intentarlo.') {
                    toastr.error('El usuario o la contraseña ingresada no son correctos, vuelva a intentarlo.')
                    setPassword("");
                    return;
                }
                login(token);
              
                console.log('Usuario logeado correctamente');
                console.log('Token JWT:', token);
                
                toastr.success('Usuario logeado correctamente');
                

                // Redirigir a la página "welcome"
                navigate('/welcome');
                            
            } else if (response.status === 401) {
                console.log('Credenciales incorrectas');
                toastr.error('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
            } else if (response.status === 404) {
                console.log('Usuario no encontrado');
                toastr.error('Usuario no encontrado');
            } else {
                console.error('Error inesperado:', response.statusText);
                toastr.error('Error inesperado: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error: ', error);
            console.error(error.response); 
        }
    };

    const handleCancel = async (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <div>
            <PublicHeader /*isLoggedIn={false} isAdmin={false} *//>
            <div style={{ marginTop: '50px' }}>
                <div className="container">
                    <Card title="Iniciar Sesión" style={{ alignItems: 'center' }}>
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

                        <Boton onClick={handleSubmit}>Iniciar sesión</Boton>
                        <Link to="/recuperar-contrasena">
                            <Boton>Recuperar contraseña</Boton>
                        </Link>
                        <Boton onClick={handleCancel}>Cancelar</Boton>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default IniciarSesion;
