// src/pages/Informes.jsx
import { useState, useEffect } from "react";
import "../styles/Ventas.css";
import Button from "../components/Button";
import { ConsultarVentas } from "../js/ventas.js";

const Ventas = () => {
  const [ventasData, setventasData] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true); // <-- Loader activado
  const [Panel, setPanel] = useState(false);
  const [VentaSeleccionada, setVentaSeleccionada] = useState(null)

  const regitroVentas = async () => {
    try {
      const response = await ConsultarVentas();
      if (Array.isArray(response)) {
        setventasData(response);
      } else {
        setError("Error: formato inesperado en ventas");
        console.error("Respuesta inesperada:", response);
      }
    } catch (err) {
      setError("Error al consultar las ventas");
      console.error("Error en la consulta:", err);
    } finally {
      setCargando(false); // <-- Desactivar loader cuando termina
    } 
  };

  const DetallesVenta = (Venta) =>{
   console.log(Venta);
   setVentaSeleccionada(Venta)
   setPanel(true)
  }

  console.log("esto es lo de ventaSeleccionada:",VentaSeleccionada)

  useEffect(() => {
    regitroVentas();
  }, []);

 //console.log("Ventas cargadas:", ventasData);


  if (cargando) {
    return (
      <div className="modal-cargando">
        <div className="modal-contenido-c">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  // ✔ Si ya cargó, se muestra la tabla
  return (
    <section className="Ventas">
      <h1>VENTAS</h1>

      {error && <p className="error-msg">{error}</p>}

      <section className="TablaVentas">
        <table className="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Total Ganancia</th>
              <th>Ver más</th>
            </tr>
          </thead>

          <tbody>
            {ventasData.map((Venta, index) => (
              <tr key={index}>
                <td>{Venta.id}</td>
                <td>{new Date(Venta.fecha).toLocaleString()}</td>
                <td>{Venta.total}</td>
                <td>
                  <button onClick={()=>DetallesVenta(Venta)}>Ver mas</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {Panel && VentaSeleccionada &&(
          <div className="panel panel-open">
          <div className="contenidoP">
            <h1>Venta #{VentaSeleccionada.id}</h1>
            <h2>{new Date(VentaSeleccionada.fecha).toLocaleString()}</h2>
            <h2>Total {VentaSeleccionada.total}</h2>
            <h3>Detalles</h3>
            <ul>
              {VentaSeleccionada.detallesVentas?.map((detalle, index)=>(
              <li key={index}>
               {detalle.producto.nombre} {detalle.cantidad}
              </li>
              ))}
            </ul> 
            <button onClick={()=> setPanel(false)}> Salir </button>
          </div>  
        </div>
        )}
      </section>
    </section>
  );
};

export default Ventas;
