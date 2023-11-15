import React from "react";
import Header from "../componentes/Header";
import Boton from "../componentes/Boton";
import Card from "../componentes/Card";
import InputField from "../componentes/InputField";
import axios from "axios";


const ModificarPerfil = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [telefono, setTelefono] = React.useState("");
    const [imagen, setImagen] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email && !password && !telefono && !imagen) {
            alert("Por favor, tiene que introducir al menos un dato a modificar");
            return;
        }

        const data = {
            correo: email,
            password: password,
            telefono: telefono,
            imagen: imagen,
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

    const handleCancel = async (e) => {

    }

    return (
        <div id="ModificarPerfil">
            <Header />
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

                        <Boton onClick={handleSubmit}>Modificar</Boton>
                        <Boton onClick={handleCancel}>Cancelar</Boton>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ModificarPerfil;