import React, { useState } from "react";
import Header from "../componentes/Header";
import Boton from "../componentes/Boton";
import Card from "../componentes/Card";
import InputField from "../componentes/InputField";

function IniciarSesion() {
    //falt recuperar contraseña 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
          alert("Por favor, tiene que introducir email y contraseña");
          return;
        }

        const data = {
            correo: email,
            password: password,
        }

        try {
            const response = await fetch('/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Usuario logeado correctamente');
                alert('Usuario logeado correctamente');
            } else if (response.status === 404) {
                console.log('Usuario no encontrado');
                alert('Usuario no encontrado');
            } else {
                console.error('Error inesperado:', response.statusText);
                alert('Error inesperado: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return (
        <div>
            <Header isLoggedIn={false} /*isAdmin={false}*/ />
            <div style={{ marginTop: '50px' }}>
                <div className="container">
                    <Card title="Iniciar sesion">
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

                        <Boton onClick={handleSubmit}>Iniciar sesion</Boton>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default IniciarSesion;
