import React from 'react';
import "../styles/Compras.css"

const Compras = () => {
   return (
     <>
         <div className="compras-tabla">
                  <table class="tabla">
                        <thead className='t'>
                           <tr>
                              <th></th>
                              <th>Nombre</th>
                              <th>Precio</th>
                              <th>Cantidad</th>
                              <th>Proveedor</th>
                              <th>Fecha de pedido</th>
                              
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td><input type="checkbox" /></td>
                              <td>Bon bon bum</td>
                              <td>500.000</td>
                              <td>500</td>
                              <td>Colombina</td>
                              <td>01/05/2025</td>
                           </tr>
                           <tr>
                              <td><input type="checkbox" /></td>
                              <td>Bon bon bum</td>
                              <td>500.000</td>
                              <td>500</td>
                              <td>Colombina</td>
                              <td>01/05/2025</td>
                           </tr>
                           <tr>
                              <td><input type="checkbox" /></td>
                              <td>Yupi</td>
                              <td>100.000</td>
                              <td>300</td>
                              <td>Yupi</td>
                              <td>01/05/2025</td>
                           </tr>
                           <tr>
                              <td><input type="checkbox" /></td>
                              <td>Yupi</td>
                              <td>100.000</td>
                              <td>300</td>
                              <td>Yupi</td>
                              <td>01/05/2025</td>
                           </tr>
                           <tr>
                              <td><input type="checkbox" /></td>
                              <td>Chocoramo</td>
                              <td>600.000</td>
                              <td>300</td>
                              <td>Yupi</td>
                              <td>01/05/2025</td>
                           </tr>
                           <tr>
                              <td><input type="checkbox" /></td>
                              <td>Chocoramo</td>
                              <td>600.000</td>
                              <td>300</td>
                              <td>Yupi</td>
                              <td>01/05/2025</td>
                           </tr>
                           <tr>
                              <td><input type="checkbox" /></td>
                              <td>Gel Bachué</td>
                              <td>1.000.000</td>
                              <td>500</td>
                              <td>Bachué</td>
                              <td>01/05/2025</td>
                           </tr>
                           <tr>
                              <td><input type="checkbox" /></td>
                              <td>Gel Bachué</td>
                              <td>1.000.000</td>
                              <td>500</td>
                              <td>Bachué</td>
                              <td>01/05/2025</td>
                           </tr>
                        </tbody>
                  </table>
               </div>
     </>
   );
}
export default Compras;