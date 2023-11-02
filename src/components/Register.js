import React, { useState } from "react";
import Header from './header';
import MessagePopup from "./MessagePopup";
import './style.css';

//faltan validaciones
//falta hacer igual figma

function Register() {
    
    const [message, setMessage] = useState(''); // Mensaje a mostrar
    const [messageType, setMessageType] = useState(''); // Tipo de mensaje (éxito o error)


    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Evitar el envío por defecto del formulario
    
        // obtener los valores de los campos del formulario
        const name = event.target.name.value;
        const lastName = event.target.lastName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
    
        // Objeto con los datos a enviar a la API
        const userData = {
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
            body: JSON.stringify(userData),
          });
    
          // Manejo de la respuesta de la API
          if (response.ok) {
            console.log('Usuario registrado exitosamente');
            setMessage('Usuario registrado exitosamente');
            setMessageType('success');
            
            // Redireccionar al usuario a la página de inicio de sesión
            //setTimeout(function(){
            //  window.location.href = '/login';
            //}, 2000);
          } else {
            console.error('Error al registrar el usuario');
            setMessage('Error al registrar el usuario');
            setMessageType('error');
          }
        } catch (error) {
          // Manejo de errores
          console.error('Error:', error);
        }
      };

    return(
        <div>
        <Header isLoggedIn={false} isAdmin={false} />
        <section className="vh-100 gradient-custom" style={{ height: '100vh' }}>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 h-80">
                <div className="card bg-verde text-white" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 text-center">
                    <form onSubmit={handleFormSubmit} method="post" class="mb-md-5 mt-md-4 pb-2">
                        <h3 class="fw-bold mb-4 ">Registro de usuario</h3>
                        
                        <div class="form-outline form-white mb-1">
                        <input name="name" type="text" id="name" placeholder= "Nombre" class="form-control form-control-lg" />
                        <label class="form-label" for="name"></label>
                        </div>
                        
                        <div class="form-outline form-white mb-1">
                        <input name="lastName" type="text" id="lastName" placeholder= "Apellido" class="form-control form-control-lg" />
                        <label class="form-label" for="lastName"></label>
                        </div>
        
                        <div class="form-outline form-white mb-1">
                        <input name="email" type="text" id="typeEmailX" placeholder= "Email" class="form-control form-control-lg" />
                        <label class="form-label" for="typeEmailX"></label>
                        </div>
        
                        <div class="form-outline form-white mb-1">
                        <input name="password" type="password" id="typePasswordX" placeholder= "Contraseña" class="form-control form-control-lg" />
                        <label class="form-label" for="typePasswordX"></label>
                        </div>
                        <button class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                    </form>
                    {MessagePopup}
                    {message && (
                        <div style={{ backgroundColor: messageType === 'error' ? 'red' : 'green' }}>
                        <p>{message}</p>
                        </div>
                    )}
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    </div>
    )
}

export default Register;