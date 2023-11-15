import React from "react";
import Header from "../componentes/UsuarioHeader";
import Boton from "../componentes/Boton";
import Card from "../componentes/Card";
import InputField from "../componentes/InputField";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexto/AuthContext";


const ModificarPerfil = () => {
    const { getToken } = useAuth();
    const token = getToken();
    const { id } = useParams();
    const [usuario, setUsuario] = React.useState(null);
    const [usuarios, setUsuarios] = React.useState([]);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setname] = React.useState("");
    const [lastName, setlastName] = React.useState("");
    const { user } = useAuth();

    const navigate = useNavigate();

    /*const obtenerUsuarios = async () => {
        try {
            console.log("por entrar")
            console.log("token", token)
          const response = await axios.get('/api/usuarios/detalles', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          console.log("response", response)

          if (response.status === 200) { 
            // Filtra solo el usuario logeado
            const usuarioLogeado = response.data.find(usuario => usuario.correo === user.correo);
            console.log("user", user)
            console.log("logeado", usuarioLogeado);
            
            // Si el usuario logeado existe, actualiza el estado solo con ese usuario
            if (usuarioLogeado) {
              setUsuarios([usuarioLogeado]);
            } else {
              // Si el usuario logeado no existe, puedes manejarlo según tus necesidades
              console.error('Usuario logeado no encontrado');
            }
          }
        } catch (error) {
          console.error('Error al obtener las categorías:', error);
        }
      };


      React.useEffect(() => {
        // Llamar a obtenerUsuarios al montar el componente
        obtenerUsuarios();
      }, []); // Sin dependencias, se ejecutará solo una vez al montar el componente */   

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email && !password && !name && !lastName) {
            alert("Por favor, tiene que introducir al menos un dato a modificar");
            return;
        }

        const data = {
            correo: email,
            password: password,
            name: name,
            lastName: lastName,
        };

        try {
            const response = await axios.put(`/api/usuario/${usuario}`, data, {
                headers: {Authorization: `Bearer ${token}`
                },
            })


            if (response.status === 200) {
                setUsuario(response.data);
                console.log("Usuario modificado correctamente");
                alert("Usuario modificado correctamente");
            } else if (response.status === 409) {
                console.log("Usuario ya existente");
                alert("Usuario ya existente");
            } else {
                console.error("Error inesperado:", response.statusText);
                alert("Error inesperado: " + response.statusText);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const handleCancel = async (e) => {
        navigate('/welcome');
    }

    /*React.useEffect(() => {
        const obtenerUsuario = async () => {
          try {
            const response = await axios.get(`/api/usuarios/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
    
            if (response.status === 200) {
              setUsuario(response.data);
            } else {
              console.error("Error al obtener el usuario:", response.statusText);
            }
          } catch (error) {
            console.error("Error: ", error);
          }
        };
    
        obtenerUsuario();
      }, [id, token]);*/


    const handleCancel = async (e) => {

    }

    return (
        <div id="ModificarPerfil">
            <Header />
            <div style={{ marginTop: "50px" }}>
                <div className="container">
                    <Card title="Perfil">
                        <div className="form-group">
                            <p>Id: {usuario}</p>
                            <label>Email:</label>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <InputField
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Contraseña:</label>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <InputField
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <InputField
                                    value={name}
                                    onChange={(e) => setname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Apellido:</label>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <InputField
                                    value={lastName}
                                    onChange={(e) => setlastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Telefono:</label>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <InputField
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Imagen:</label>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <InputField
                                    value={imagen}
                                    onChange={(e) => setImagen(e.target.value)}
                                />
                            </div>
                        </div>

                        <Boton onClick={handleSubmit} >Modificar</Boton>
                        <Boton onClick={handleCancel}>Cancelar</Boton>
                        <Boton onClick={handleSubmit}>Modificar</Boton>
                        <Boton onClick={handleCancel}>Cancelar</Boton>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ModificarPerfil;