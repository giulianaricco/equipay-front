import React from "react";
import Header from "../componentes/AdminHeader";
import Boton from "../componentes/Boton";
import Card from "../componentes/Card";
import InputField from "../componentes/InputField";
import Dropdown from "../componentes/Dropdown";

const AltaUsuario = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rol, setRol] = React.useState("");


  const handleSubmit = async (e) => {

  }

  const handleCancel = async (e) => {

  }

  return (
    <div>
    <Header/>
    <div style={{ marginTop: '50px' }}>
      <div className="container">
        <Card title="Registrar Usuario">
          <div className="form-group">
            <InputField
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <InputField
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <InputField
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
              <label style={{ marginRight: '5px' }}>Selecciona:</label>
              <Dropdown
                options={["Admin", "Usuario"]}
                value={rol}
                onChange={(value) => setRol(value)}
                placeholder="Rol"
              />
            </div>

          <Boton onClick={handleSubmit}>Agregar usuario</Boton>
          <Boton onClick={handleCancel}>Cancelar</Boton>
        </Card>
      </div>
    </div>
  </div>
  );
}

export default AltaUsuario;