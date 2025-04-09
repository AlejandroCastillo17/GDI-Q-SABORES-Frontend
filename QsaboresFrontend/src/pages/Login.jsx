import { useState } from "react";
import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import logo from "../assets/qsaboreslogo.png"
import bosque from "../assets/bosque.png"
import '../styles/Login.css'

const Login = ({setAutenticacion}) => {

    const navigate = useNavigate();

    const ValidacionLogin = () => {
        
        setAutenticacion(true);
        navigate('/');
    };

    const [verContraseña, setverContraseña] = useState(false);

    return (
        <section className="login">
            <div className="cont-img">
                <img src={bosque} alt="Imagen de Fondo" />
            </div>
            <div className="cont-rest">
                <img src={logo} alt="Logo de Q'SaboresS" />
                <br />
                <h1>Bienvenido de nuevo!</h1>
                <br />
                <p>Contraseña</p>
                <div className="contraseña-vision">
                    <input
                        type={verContraseña ? "text" : "password"}
                        placeholder="Contraseña"
                    />
                    <span
                        className="icono"
                        onClick={() => setverContraseña(!verContraseña)}
                        >
                        {verContraseña ? "( X )" : "( O )"}
                    </span>
                </div>
                <br />
                <button onClick={ValidacionLogin}>Iniciar Sesion</button>
            </div>
        </section>
    );
};

export default Login;