import React, { useEffect } from "react";
import AdminHeader from "../../componentes/AdminHeader";
import Boton from "../../componentes/Boton";
import Card from "../../componentes/Card";
import InputField from "../../componentes/InputField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexto/AuthContext";

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


const ModificarCategoria = () => {
    const { getToken } = useAuth();
    const token = getToken();
    const navigate = useNavigate();

    const [categorias, setCategorias] = React.useState([]);
    const [idCategoria, setIdCategoria] = React.useState("");
    const [nombre, setNombre] = React.useState("");

    const obtenerCategorias = async () => {
        try {
            const response = await axios.get("/api/categorias/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setCategorias(response.data);
            }
        } catch (error) {
            console.error("Error al obtener las categorias:", error);
        }
    }

    useEffect(() => {
        obtenerCategorias();
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idCategoria) {
            alert("Por favor seleccione una categoría.");
            return;
          }

        if (!nombre) {
        alert("Por favor, tiene que introducir el nombre de la categoria");
        return;
        }

        const data = {
            id: idCategoria,
            nombre: nombre,
        };

        try {
            const response = await axios.put(`/api/categorias/${idCategoria}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                });

            if (response.status === 200) {
                console.log("Categoria modificada exitosamente");
                alert("Categoria modificada exitosamente");
                obtenerCategorias();
                setIdCategoria("");
            } else {
                console.error("Error inesperado:", response.statusText);
                alert("Error inesperado: " + response.statusText);
            } 
        } catch (error) {
            console.error("Error:", error);
        }
    };  

    const handleCancel = async (e) => {
        e.preventDefault();
        navigate('/welcome');
    }

    return (
        <div id="ModificarCategoria">
            <AdminHeader /> {/* falta validacion */}
            <div style={{ marginTop: "50px" }}>
                <div className="container">
                    <Card title="Modificar Categoria">
                        <div className="form-group">
                            <label>Seleccione la categoria a modificar:</label>
                            <select
                                value={idCategoria}
                                onChange={(e) => setIdCategoria(e.target.value)}
                                style={styles.selectStyle}
                            >
                                <option value="">Seleccione una categoria</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Nombre de la categoria:</label>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <InputField
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Boton onClick={handleSubmit}>Modificar</Boton>
                            <Boton onClick={handleCancel}>Cancelar</Boton>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ModificarCategoria;
