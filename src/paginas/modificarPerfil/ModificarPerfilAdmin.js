import React, { useEffect } from "react";
import AdminHeader from "../../componentes/AdminHeader";
import Boton from "../../componentes/Boton";
import Card from "../../componentes/Card";
import InputField from "../../componentes/InputField";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexto/AuthContext";

const ModificarPerfilAdmin = () => {
    const { getToken } = useAuth();
    const token = getToken();
    const [idUsuario, setIdUsuario] = React.useState("");
    const { user } = useAuth();

    const [usuarioEditado, setUsuarioEditado] = React.useState(null);


    useEffect(() => {
        if (user) {
            setIdUsuario(user.correo);
        }
    }, [user]);


    const handleModificar = async (correo) => {
        setUsuarioEditado({
            correo: correo,
            nombre: user.nombre,
            apellido: user.apellido,
            //password: user.password,
        });
    }

    const handleGuardarEdicion = async () => {
        try {
            const { nombre, apellido, password } = usuarioEditado;
            const nuevoUsuario = { nombre, apellido, password };
            const response = await axios.put(`/api/usuario/${user.correo}`, nuevoUsuario, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                console.log("Usuario modificado correctamente");
                alert("Usuario modificado correctamente");
                setIdUsuario("");
                setUsuarioEditado(null);
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
    }

    return (
        <div id="ModificarPerfil">
            <AdminHeader />
            <div style={{ marginTop: "50px" }}>
                <Card title="Perfil">
                    <table className="table-container">
                        <thead>
                           <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Password</th> 
                            <th>Modificar</th>
                           </tr>
                        </thead>
                        <tbody>
                            <tr key={user.correo}>
                            <td>
                                {usuarioEditado?.correo === user.correo ? (
                                    <InputField
                                    type="text"
                                    value={usuarioEditado.nombre}
                                    onChange={(e) => setUsuarioEditado({ ...usuarioEditado, nombre: e.target.value })}
                                    />
                                ) : (
                                    user.nombre
                                )}
                            </td>
                            <td>
                                {usuarioEditado?.correo === user.correo ? (
                                    <InputField
                                    type="text"
                                    value={usuarioEditado.apellido}
                                    onChange={(e) => setUsuarioEditado({ ...usuarioEditado, apellido: e.target.value })}
                                    />
                                ) : (
                                    user.apellido
                                )}
                            </td>
                            <td>
                                {usuarioEditado?.correo === user.correo ? (
                                    <InputField
                                    type="text"
                                    value={usuarioEditado.password}
                                    onChange={(e) => setUsuarioEditado({ ...usuarioEditado, password: e.target.value })}
                                    />
                                ) : (
                                    user.password
                                )}
                            </td>
                            <td>
                                {usuarioEditado?.correo === user.correo ? (
                                    <Boton onClick={handleGuardarEdicion}>Guardar</Boton>
                                ) : (
                                    <Boton onClick={() => handleModificar(user.correo)}>
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </Boton>                                )}
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
}

export default ModificarPerfilAdmin;
