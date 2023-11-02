import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header>
      <div className="logo">
        <Link to="/">Equipay</Link>
      </div>
      {/* Aquí puedes agregar otros elementos del encabezado */}
    </header>
    </div>
  );
}

export default App;
