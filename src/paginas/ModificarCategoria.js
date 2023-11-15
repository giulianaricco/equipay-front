import React, { useEffect } from "react";
import Header from "../componentes/Header";
import Boton from "../componentes/Boton";
import Card from "../componentes/Card";
import InputField from "../componentes/InputField";
import axios from "axios";

//falta boton cancelar

const ModificarCategoria = ({ categoryId }) => {
    const [nombre, setNombre] = React.useState("");

    useEffect(() => {
        const obtenerCategoria = async () => {
            try {
                const response = await axios.get(`/api/categoria/${categoryId}`);
                setNombre(response.data.nombre); 
            } catch (error) {
                console.error("Error: ", error);
            }
        };

        obtenerCategoria();
    }, [categoryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre) {
            alert("Por favor, tiene que introducir el nombre de la categoria");
            return;
        }

        const data = {
            nombre: nombre,
        };

        try {
            const response = await axios.put(`/api/categoria/${categoryId}`, data);

            if (response.status === 200) {
                console.log("Categoria modificada correctamente");
                alert("Categoria modificada correctamente");
            } else if (response.status === 409) {
                console.log("Categoria ya existente");
                alert("Categoria ya existente");
            } else {
                console.error("Error inesperado:", response.statusText);
                alert("Error inesperado: " + response.statusText);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <div id="ModificarCategoria">
            <Header />
            <div style={{ marginTop: "50px" }}>
                <div className="container">
                    <Card title="Categoria">
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
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    ); 
};

export default ModificarCategoria;
