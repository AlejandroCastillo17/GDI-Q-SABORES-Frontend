import React from 'react';
import  "../styles/Gastos.css";
import Alerta from '../components/AlertaCantidades';

const Gastos = () => {
   return (
     <>
         <section className="Gastos">
            <h1>Gastos</h1>
            <p>Esta es la página de gastos.</p>
            {/* Aquí puedes agregar más contenido relacionado con los gastos */}
            <br /><br /><br />
            <Alerta />
         </section>
     </>
   );
}
export default Gastos