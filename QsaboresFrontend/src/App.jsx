import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Login from './pages/Login'
import Home from './pages/Home';
import Inventario from './pages/Inventario';
import Layout from './Layouts/Layout';
import './App.css'

function App() {

  const [Autenticacion, setAutenticacion] = useState(false);  

  return (
    <>
      <div id='app'>
        <Router>
            <Routes>
              {/* Ruta de login */}
              <Route path="/login" element={<Login setAutenticacion={setAutenticacion} />} />

              {/* Rutas protegidas */}
              <Route path='/' element={Autenticacion ? <Layout /> : <Navigate to="/login" />}>
                <Route path="/" element={<Home/>} />
                <Route path="/inventario" element={<Inventario/>} />
              </Route>
            </Routes>
          </Router>
      </div>
    </>
  )
}

export default App
