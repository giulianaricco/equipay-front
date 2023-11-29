import React from "react";
import UsuarioHeader from "../componentes/UsuarioHeader";
import Boton from "../componentes/Boton";
import Card from "../componentes/Card";
import InputField from "../componentes/InputField";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../contexto/AuthContext";


const ModificarPerfil = () => {
    const { getToken } = useAuth();
    const token = getToken();
    const [idUsuario, setIdUsuario] = React.useState("");

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setname] = React.useState("");
    const [lastName, setlastName] = React.useState("");
    const { user } = useAuth();

    const navigate = useNavigate();

    React.useEffect(() => {
        if (user) {
            setIdUsuario(user.correo);
            //ver Id
        }
    }, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idUsuario) {
            console.error("ID de usuario no válido");
            return;
        }

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
            const response = await axios.put(`/api/usuario/${idUsuario}`, data, {
                headers: {Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                //setUsuario(response.data);
                console.log("Usuario modificado correctamente");
                alert("Usuario modificado correctamente");
                setIdUsuario("");
                navigate('/welcome');
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

    return (
        <div id="ModificarPerfil">
            <UsuarioHeader />
            <div style={{ marginTop: "50px" }}>
                <div className="container">
                    <Card title="Perfil">
                        <div className="form-group">
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
