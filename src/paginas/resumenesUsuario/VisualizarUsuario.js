import React, { useEffect } from "react";
import Boton from "../componentes/Boton";
import Card from "../componentes/Card";
import axios from '../utils/axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexto/AuthContext";
import AdminHeader from "../../componentes/AdminHeader";

const styles = {
    inputStyle: {
        width: '80%',
      backgroundColor: '#27A281', // Fondo verde
      borderRadius: '5px', // Esquinas redondeadas
      padding: '8px', // Relleno interno
      border: '1px solid white', // Borde blanco
      color: 'white', // Texto en blanco
      placeholder: 'white', // Color del marcador de posición en blanco
    },
    selectStyle: {
      width: '80%',
      backgroundColor: '#27A281', // Fondo verde
      borderRadius: '5px',
      padding: '8px',
      border: '1px solid white', // Borde blanco
      color: 'white', // Texto en blanco
      placeholder: 'white', // Color del marcador de posición en blanco
    }
  
  };

const VisualizarUsuario = () => {
    const { getToken } = useAuth();
    const token = getToken();
    const navigate = useNavigate();

    const [usuarios, setUsuarios] = React.useState([]);
    const [idUsuario, setIdUsuario] = React.useState("");
    const [pagos, setPagos] = React.useState([]);
    const [gastos, setGastos] = React.useState([]);


    const obtenerUsuarios = async () => {
        try {
            const response = await axios.get("/api/usuarios/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setUsuarios(response.data);
            }
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    }

    useEffect(() => {
        obtenerUsuarios();
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idUsuario) {
            console.error("ID de usuario no válido");
            return;
        }

        try {
            const response = await axios.get(`/api/usuarios/${idUsuario}/gastos-cubiertos`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            if (response.status === 200) {
                setGastos(response.data);
                console.log("Actividad de gastos obtenida exitosamente");
            } else {
                console.error("Error inesperado:", response.statusText);
                alert("Error inesperado: " + response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }

        try {
            const response = await axios.get(`/api/usuarios/${idUsuario}/pagos-realizados  `, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            if (response.status === 200) {
                setPagos(response.data);
                console.log("Actividad de pagos obtenida exitosamente");
            } else {
                console.error("Error inesperado:", response.statusText);
                alert("Error inesperado: " + response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }


    const handleCancel = () => {
        navigate("/welcome");
    }

return (
    <div id="visualizar-usuario" >
        <AdminHeader/>
        <div style={{ marginTop: '50px' }}>
        <div className="container">
            <Card title="Visualizar actividad">
            <div className="form-group">
                <label>Seleccione el usuario a visualizar:</label>
                <select
                    value={idUsuario}
                    onChange={(e) => setIdUsuario(e.target.value)}
                    style={styles.selectStyle}
                >
                    <option value="">Seleccione un usuario</option>
                    {usuarios.map((usuario) => (
                        <option key={usuario.correo} value={usuario.correo}>
                            {usuario.nombre} {usuario.apellido ? usuario.apellido : ' '}
                        </option>
                    ))}
                </select>
            </div>
            <Boton onClick={handleSubmit}>Visualizar</Boton>
            <Boton onClick={handleCancel}>Cancelar</Boton>
            </Card>
            <div style={{ marginTop: '30px' }}></div>
            <Card title="Gastos del usuario">
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>Descripcion</th>
                            <th>Moneda</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gastos.length > 0 ? (
                        gastos.map((gasto) => (
                        <><tr key={gasto.id}>
                                <td>{gasto.descripcion}</td>
                                <td>{gasto.moneda}</td>
                                <td>{gasto.monto}</td>
                            </tr></>
                        ))
                        ) : (
                            <tr key="sin-gastos">
                                <td colSpan={3}>No hay gastos registrados para este usuario</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>
            <div style={{ marginTop: '10px' }}></div>
            <Card title="Pagos del usuario">
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Moneda</th>
                            <th>Monto</th>
                            <th>Beneficiario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagos.length > 0 ? (
                        pagos.map((pago) => (
                        <><tr key={pago.id}>
                                <td>{pago.fecha}</td>
                                <td>{pago.moneda}</td>
                                <td>{pago.monto}</td>
                                <td>{pago.recibe.nombre} {pago.recibe.apellido}</td>
                            </tr></>
                        ))
                        ) : (
                            <tr key="sin-gastos">
                                <td colSpan={4}>No hay pagos registrados para este usuario</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>
            <div style={{ marginBottom: '30px' }}></div>
        </div>
        </div>
    </div>
    );
}

export default VisualizarUsuario;
