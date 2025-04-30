import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Login from './pages/Login'
import Home from './pages/Home';
import Inventario from './pages/Inventario';
import Informes from './pages/Informes';
import Layout from './Layouts/Layout';
import Proveedores from './pages/proveedores';
import './App.css'
import Egresos from './pages/Egresos';
import Gastos from './pages/Gastos';
import Compras from './pages/Compras';

function App() {

  const [Autenticacion, setAutenticacion] = useState(true);//Cambiar, estaba en false el useState

  return (
    <>
      <div id='app'>
        <Router>
            <Routes>
              {/* Ruta de login */}
              <Route path="/login" element={<Login setAutenticacion={setAutenticacion} />} />

              {/* Rutas protegidas */}
              <Route path="/gastos" element={Autenticacion ? <Gastos /> : <Navigate to="/login" />} />
              <Route path="/compras" element={Autenticacion ? <Compras /> : <Navigate to="/login" />} />
              <Route path='/' element={Autenticacion ? <Layout /> : <Navigate to="/login" />}>
                <Route path="/" element={<Home/>} />
                <Route path="/inventario" element={<Inventario/>} />
                <Route path="/informes" element={<Informes/>} />
                <Route path="/proveedores" element={<Proveedores/>} />
                <Route path="/egresos" element={<Egresos/>} />
              </Route>
            </Routes>
          </Router>
      </div>
    </>
  )
}

export default App
