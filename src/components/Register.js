import React from "react";
import Header from './header';
import './style.css';

//faltan validaciones
//falta hacer igual figma

function Register() {

    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Evitar el envío por defecto del formulario
    
        // Aquí puedes obtener los valores de los campos del formulario
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
          // Llamada a la API con fetch (aquí deberías reemplazar 'URL_DE_TU_API' con la URL de tu API)
          const response = await fetch('/api/usuarios/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          })/*
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));*/
    
          // Manejo de la respuesta de la API
          if (response.ok) {
            // La solicitud fue exitosa
            // Aquí puedes manejar el resultado, por ejemplo, mostrar un mensaje de éxito
            console.log('Usuario registrado exitosamente');
          } else {
            // La solicitud falló
            // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error
            console.error('Error al registrar el usuario');
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