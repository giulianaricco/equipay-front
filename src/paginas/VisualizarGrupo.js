import React from "react";
import Boton from "../componentes/Boton";
import Card from "../componentes/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexto/AuthContext";
import AdminHeader from "../componentes/AdminHeader";

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

const VisualizarGrupo = () => {
    const { getToken } = useAuth();
    const token = getToken();
    const navigate = useNavigate();

    const [grupos, setGrupos] = React.useState([]);
    const [idGrupo, setIdGrupo] = React.useState("");
    var pagos = [];
    var gastos = [];

    const obtenerGrupos = async () => {
        try {
            const response = await axios.get("/api/grupos/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setGrupos(response.data);
            }
        } catch (error) {
            console.error("Error al obtener los grupos:", error);
        }
    }

    React.useEffect(() => {
        obtenerGrupos();
        // eslint-disable-next-line
    }, []);

    const obtenerPagos = async () => {
        try {
            const response = await axios.get("/api/pagos/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].grupo === idGrupo) {
                        pagos.push(response.data[i]);
                    }
                }
            }
            return pagos;
        } catch (error) {
            console.error("Error al obtener los pagos:", error);
        }
    }

    const obtenerGastos = async () => {
        try {
            const response = await axios.get("/api/gastos/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].grupo === idGrupo) {
                        gastos.push(response.data[i]);
                    }
                }
            }
            return gastos;
        } catch (error) {
            console.error("Error al obtener los gastos:", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idGrupo) {
            console.error("ID de grupo no válido");
            return;
        }

        pagos = obtenerPagos();
        gastos = obtenerGastos();
     }

     const handleCancel = () => {
        navigate("/welcome");
    }

    return (
        <div id="visualizar-grupo" >
            <AdminHeader/>
            <div style={{ marginTop: '50px' }}>
            <div className="container">
                <Card title="Visualizar actividad">
                <div className="form-group">
                    <label>Seleccione el grupo a visualizar:</label>
                    <select
                        value={idGrupo}
                        onChange={(e) => setIdGrupo(e.target.value)}
                        style={styles.selectStyle}
                    >
                        <option value="">Seleccione un grupo</option>
                        {grupos.map((grupo) => (
                            <option key={grupo.id} value={grupo.id}>
                                {grupo.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <Boton onClick={handleSubmit}>Visualizar</Boton>
                <Boton onClick={handleCancel}>Cancelar</Boton>
                </Card>
                <div style={{ marginTop: '30px' }}></div>
                <Card title="Actividad del grupo">
                    <ul> {gastos.map((gastos) => (
                                <li key={gastos.id}>
                                    <p>Descripcion: {gastos.descripcion}</p>
                                    <p>Moneda: {gastos.moneda}</p>
                                    <p>Monto: {gastos.monto}</p>
                                    <p>Grupo: {gastos.Grupo}</p>
                                </li>
                            ))}
                    </ul>
                    <ul>{pagos.map((pagos) => (
                            <li key={pagos.id}>
                                <p>Moneda: {pagos.moneda}</p>
                                <p>Monto: {pagos.monto}</p>
                                <p>Grupo: {pagos.Grupo}</p>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
            </div>
        </div>
        );
    }
    
    export default VisualizarGrupo;