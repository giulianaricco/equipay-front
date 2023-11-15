import React from "react";
import Header from "../componentes/Header";
import Boton from "../componentes/Boton";
import Card from "../componentes/Card";
import InputField from "../componentes/InputField";
import axios from "axios";

//falta boton cancelar

const ModificarPerfil = () => {
    const [nombre, setNombre] = React.useState("");
    const [apellido, setApellido] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre && !apellido && !email && !password) {
            alert("Por favor, tiene que introducir al menos un dato a modificar");
            return;
        }

        const data = {
            nombre: nombre,
            apellido: apellido,
            correo: email,
            password: password,
        };

        try {
            const response = await axios.put(`/api/usuario/`, data);

            if (response.status === 200) {
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

    return (
        <div id="ModificarPerfil">
            <Header />
            <div style={{ marginTop: "50px" }}>
                <div className="container">
                    <Card title="Perfil">
                        <div className="form-group">
                            <label>Nombre:</label>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <InputField
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Apellido:</label>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <InputField
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                />
                            </div>
                        </div>
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

                        <Boton onClick={handleSubmit}>Modificar</Boton>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ModificarPerfil;