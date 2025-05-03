import React from 'react';
import Alerta from '../components/AlertaCantidades';
//import  "../styles/Gastos.css";

const Gastos = () => {
   return (
     <>
         <div className="egresos-tabla-section">
                  <h2>GASTOS</h2>
                  <table class="egresos-tabla">
                        <thead>
                           <tr>
                              <th></th>
                              <th>Nombre</th>
                              <th>Precio</th>
                              <th>Estado</th>
                              <th>Fecha de pago</th>
                              
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td><input type="checkbox" /></td>
                              <td>Arriendo</td>
                              <td>500.000</td>
                              <td>Fijo</td>
                              <td>01/05/2025</td>
                           </tr>
                           <tr>
                              <td><input type="checkbox" /></td>
                              <td>Arriendo</td>
                              <td>500.000</td>
                              <td>Fijo</td>
                              <td>01/05/2025</td>
                           </tr>
                           <tr>
                              <td><input type="checkbox" /></td>
                              <td>Servicios</td>
                              <td>80.000</td>
                              <td>Fijo</td>
                              <td>01/05/2025</td>
                           </tr>
                           <tr>
                              <td><input type="checkbox" /></td>
                              <td>Arreglo PC</td>
                              <td>500.000</td>
                              <td>Variable</td>
                              <td>01/05/2025</td>
                           </tr>
                           <tr>
                              <td><input type="checkbox" /></td>
                              <td>Arriendo</td>
                              <td>500.000</td>
                              <td>Fijo</td>
                              <td>01/05/2025</td>
                           </tr>
                           <tr>
                              <td><input type="checkbox" /></td>
                              <td>Arriendo</td>
                              <td>500.000</td>
                              <td>Fijo</td>
                              <td>01/05/2025</td>
                           </tr>
                           <tr>
                              <td><input type="checkbox" /></td>
                              <td>Servicios</td>
                              <td>80.000</td>
                              <td>Fijo</td>
                              <td>01/05/2025</td>
                           </tr>
                           <tr>
                              <td><input type="checkbox" /></td>
                              <td>Arreglo PC</td>
                              <td>500.000</td>
                              <td>Variable</td>
                              <td>01/05/2025</td>
                           </tr>
                        </tbody>
                  </table>
               </div>
     </>
   );
}
export default Gastos;