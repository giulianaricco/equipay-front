import React, { useEffect } from "react";
import Boton from "../../componentes/Boton";
import Card from "../../componentes/Card";
import axios from '../../utils/axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexto/AuthContext";
import UsuarioHeader from "../../componentes/UsuarioHeader";

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

  const HistoricoActividad = () => {
    const { getToken } = useAuth();
    const token = getToken();
    const navigate = useNavigate();
    const { user } = useAuth();


    const [grupos, setGrupos] = React.useState([]);
    const [grupoSeleccionado, setGrupoSeleccionado] = React.useState("");
    const [pagos, setPagos] = React.useState([]);
    const [gastos, setGastos] = React.useState([]);

    useEffect(() => {
        axios.get(`/api/usuarios/${user.correo}/grupos`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setGrupos(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener la lista de grupos:", error);
            });
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!grupoSeleccionado) {
            alert("Debe seleccionar un grupo");
            return;
        }
        try {
            const response = await axios.get(`/api/grupos/${grupoSeleccionado}/gastos`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setGastos(response.data);
            } else {
                console.error("Error al obtener los gastos");
            }
        } catch (error) {
            console.error("Error al obtener el historico de actividad:", error);
        }

        try {
            const response = await axios.get(`/api/grupos/${grupoSeleccionado}/pagos`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setPagos(response.data);
            } else {
                console.error("Error al obtener los pagos");
            }
        } catch (error) {
            console.error("Error al obtener el historico de actividad:", error);
        }
    }

    const handleCancelar = () => {
        navigate("/welcome");
    }

    return (
        <div id="historico-actividad">
            <UsuarioHeader />
            <div style={{ marginTop: '50px' }}>
            <div className="container">
            <Card title="Historico actividad">
                <div className="form-group">
                    <label>Seleccione el grupo a visualizar:</label>
                    <select
                        style={styles.selectStyle}
                        value={grupoSeleccionado}
                        onChange={(e) => setGrupoSeleccionado(e.target.value)}
                    >
                        <option value="">Seleccione un grupo</option>
                        {grupos.map((grupo) => (
                            <option key={grupo.id} value={grupo.id}>
                                {grupo.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <Boton onClick={handleSubmit}>Ver historico</Boton>
                <Boton onClick={handleCancelar}>Cancelar</Boton>
            </Card>
            <div style={{ marginTop: '30px' }}></div>
                <Card title="Gastos del grupo">
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
                                    <tr key={gasto.id}>
                                        <td>{gasto.descripcion}</td>
                                        <td>{gasto.moneda}</td>
                                        <td>{gasto.monto}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr key="sin-gastos">
                                    <td colSpan={3}>No hay gastos registrados</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Card>
                <div style={{ marginTop: '10px' }}></div>
                <Card title="Pagos del grupo">
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
                                    <tr key={pago.id}>
                                        <td>{pago.fecha}</td>
                                        <td>{pago.moneda}</td>
                                        <td>{pago.monto}</td>
                                        <td>{pago.recibe.nombre} {pago.recibe.apellido}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr key="sin-gastos">
                                    <td colSpan={4}>No hay pagos registrados</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
        </div>
    );
}

export default HistoricoActividad;

