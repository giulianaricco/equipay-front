import React from "react";
import Header from './header';
import './style.css';

//faltan validaciones
//falta hacer igual figma

function Register() {
    return(
        <div>
        <Header isLoggedIn={false} isAdmin={false} />
        <section className="vh-100 gradient-custom" style={{ height: '100vh' }}>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 h-80">
                <div className="card bg-verde text-white" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 text-center">
                    <form method="post" class="mb-md-5 mt-md-4 pb-2">
                        <h3 class="fw-bold mb-4 ">Registro de usuario</h3>
                        
                        <div class="form-outline form-white mb-1">
                        <input name="name" type="text" id="name" placeholder= "Nombre completo" class="form-control form-control-lg" />
                        <label class="form-label" for="name"></label>
                        </div>
        
                        <div class="form-outline form-white mb-1">
                        <input name="username" type="text" id="typeEmailX" placeholder= "Email" class="form-control form-control-lg" />
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