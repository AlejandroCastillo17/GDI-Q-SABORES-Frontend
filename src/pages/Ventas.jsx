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

  useEffect(() => {
    regitroVentas();
  }, []);

  console.log("Ventas cargadas:", ventasData);

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
                  <button onClick={()=> setPanel(true)}>Ver mas</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={Panel ? "panel panel-open" : "panel panel-closed"}>
          <div className="contenidoP">
            <p>funciono</p>
            <button onClick={()=> setPanel(false)}> Salir </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Ventas;
