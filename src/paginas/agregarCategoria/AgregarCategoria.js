import React from "react";
import AdminHeader from '../../componentes/AdminHeader';
import Boton from '../../componentes/Boton';
import Card from '../../componentes/Card'; 
import InputField from '../../componentes/InputField';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexto/AuthContext";
import toastr from "../../componentes/Toastr";


const AgregarCategoria = () => {
    const { getToken } = useAuth();
    const token = getToken();
    const navigate = useNavigate();


    const [nombre, setNombre] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre) {
            toastr.error("Por favor, tiene que introducir el nombre de la categoria");
            return;
        }

        const data = {
            nombre: nombre,
        }

        try {
            console.log('token: ', token)
            console.log('data: ', data)
            const response = await axios.post('/api/categorias/', data, {
                headers: {
                  'Authorization': `Bearer ${token}` 
                }
              });

              console.log('response: ', response)

            if (response.status === 200) {
                console.log('Categoria agregada correctamente');
                toastr.success('Categoria agregada correctamente');
            } else if (response.status === 409) {
                console.log('Categoria ya existente');
                toastr.error('Categoria ya existente');
            } else {
                console.error('Error inesperado:', response.statusText);
                toastr.error('Error inesperado: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    const handleCancel = async (e) => {
        e.preventDefault();
        navigate('/welcome');
    }

    return (
        <div id="AgregarCategoria">
            <AdminHeader />
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