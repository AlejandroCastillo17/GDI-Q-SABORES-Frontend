// src/pages/Informes.jsx
import { useRef, useState } from "react";
import "../styles/Informes.css";
import Button from "../components/Button";

const Informes = () => {
  const [fechaF,setFechaF] =useState("Fecha Final")
  const calendarF= useRef(null)
  const [fecha,setFecha] =useState("Fecha Inicio")
  const calendar= useRef(null)

  const abrirCalendario=(tipo) =>{
    if (tipo === "Inicio") {
      calendar.current.showPicker();
    }
    else{
        calendarF.current.showPicker();
    }
  }
  const cambiarFecha=(e)=>{
     const fechaActual =  e.target.value;
     if (e.target.name === 'Inicio') {
        setFecha(fechaActual);
      } else {
        setFechaF(fechaActual);
      }
  }

  return (
    <section className="informes">
     <section className="Botones">
     <section className="contenedor_inputs" onClick={()=> abrirCalendario("Inicio")}>
        <p>{fecha}</p>
        <span>▼</span>
        <input type="date" name="Inicio" className="fechaInicio" ref={calendar} onChange={cambiarFecha}/>
      </section>

      <section className="contenedor_inputs" onClick={()=> abrirCalendario("Fin")}>
        <p>{fechaF}</p>
        <span>▼</span>
        <input type="date" name="Fin" className="fechaFin" ref={calendarF} onChange={cambiarFecha}/>
      </section>
      <Button variant="verde" id="aceptar"  icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" stroke-width="2"> <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path> <path d="M7 11l5 5l5 -5"></path> <path d="M12 4l0 12"></path> </svg> }> Descargar</Button>
     </section>

     <section className="TablaInformes">
        <table className="tabla">
            <thead>
                <th></th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>tendencia</th>
                <th>Proveedor</th>
            </thead>
            <tbody>
                <tr>
                 <td><input type="checkbox" /></td>
                    <td>BonBon Bun</td>
                    <td>x3</td>
                    <td>Verde</td>
                    <td>Colombina</td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>Chocorramo</td>
                    <td>x12</td>
                    <td>Roja</td>
                    <td>Ramo</td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>Pilsen</td>
                    <td>x30</td>
                    <td>Roja</td>
                    <td>Bavaria</td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>Arepas</td>
                    <td>x23</td>
                    <td>roja</td>
                    <td>Sonsonéa</td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>BonBon Bun</td>
                    <td>x3</td>
                    <td>Verde</td>
                    <td>Colombina</td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>Chocorramo</td>
                    <td>x12</td>
                    <td>Roja</td>
                    <td>Ramo</td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>Pilsen</td>
                    <td>x30</td>
                    <td>Roja</td>
                    <td>Bavaria</td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>Arepas</td>
                    <td>x23</td>
                    <td>roja</td>
                    <td>Sonsonéa</td>
                </tr>
            </tbody>
        </table>

     </section>
    </section>
  );    
};

export default Informes;
