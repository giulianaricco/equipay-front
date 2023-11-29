import React from "react";
import Header from '../componentes/AdminHeader';
import Boton from '../componentes/Boton';
import Card from '../componentes/Card'; 
import InputField from '../componentes/InputField';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { useAuth } from '../contexto/AuthContext'; 


const AgregarCategoria = () => {
    const { getToken } = useAuth();
    const { user } = useAuth();
    const token = getToken();
    const [nombre, setNombre] = React.useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre) {
            alert("Por favor, tiene que introducir el nombre de la categoria");
            return;
        }

        const data = {
            nombre: nombre,
        }

        try {
            const response = await axios.post('/api/categorias/', data, {
                headers: {
                  'Authorization': `Bearer ${token}`  // Agrega el token al encabezado de autorización
                }
              });

            if (response.status === 200) {
                console.log('Categoria agregada correctamente');
                alert('Categoria agregada correctamente');
            } else if (response.status === 409) {
                console.log('Categoria ya existente');
                alert('Categoria ya existente');
            } else {
                console.error('Error inesperado:', response.statusText);
                alert('Error inesperado: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    const handleCancel = async (e) => {
        navigate('/welcome');
    }

    return (
        <div id="AgregarCategoria">
            <Header />
            <div style={{ marginTop: '50px' }}>
            <div className="container">
                <Card title="Categoria">
                    <div className="form-group">
                    <label>Nombre de la categoria:</label>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <InputField
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                    </div>

                    <Boton onClick={handleSubmit}>Agregar</Boton>
                    <Boton onClick={handleCancel}>Cancelar</Boton>
                </Card>
            </div>
            </div>
        </div>
    );
}

export default AgregarCategoria;