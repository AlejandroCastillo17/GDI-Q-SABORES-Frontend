// src/pages/Informes.jsx
import { useRef, useState, useEffect } from "react";
import "../styles/Informes.css";
import Button from "../components/Button";
import { ConsultarInformes } from "../js/informes.js";

const Informes = () => {
  const [fechaF, setFechaF] = useState("Fecha Final");
  const calendarF = useRef(null);
  const [fecha, setFecha] = useState("Fecha Inicio");
  const calendar = useRef(null);
  const [informesData, setinformesData] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  const abrirCalendario = (tipo) => {
    if (tipo === "Inicio") {
      calendar.current.showPicker();
    } else {
      calendarF.current.showPicker();
    }
  };
  const cambiarFecha = (e) => {
    const fechaActual = e.target.value;
    if (e.target.name === "Inicio") {
      setFecha(fechaActual);
    } else {
      setFechaF(fechaActual);
    }
  };

  const consultarInformes = async () => {
    try {
      const response = await ConsultarInformes();
      if (response.success && Array.isArray(response.data)) {
        setinformesData(response.data);
      } else {
        setError("Error al acceder al inventario");
        console.error("Respuesta inesperada:", response.data);
      }
    } catch (err) {
      setError("Error al consultar el inventario", err);
      console.error("Error en la consulta:", error);
    } finally {
      setCargando(false);
    }
  };
  console.log(informesData);
  useEffect(() => {
    consultarInformes();
  }, []);

  if (cargando) {
    return (
      <div className="modal-cargando">
        <div className="modal-contenido-c">
          <div class="loader"></div>
        </div>
      </div>
    );
  }
  const asignarColor = (estado) => {
    if (estado <= 30) {
      return "red";
    } else if (estado > 30 && estado <= 70) {
      return "orange";
    } else {
      return "green";
    }
  };
  return (
    <section className="informes">
      <section className="Botones">
        <section
          className="contenedor_inputs"
          onClick={() => abrirCalendario("Inicio")}
        >
          <p>{fecha}</p>
          <span>▼</span>
          <input
            type="date"
            name="Inicio"
            className="fechaInicio"
            ref={calendar}
            onChange={cambiarFecha}
          />
        </section>

        <section
          className="contenedor_inputs"
          onClick={() => abrirCalendario("Fin")}
        >
          <p>{fechaF}</p>
          <span>▼</span>
          <input
            type="date"
            name="Fin"
            className="fechaFin"
            ref={calendarF}
            onChange={cambiarFecha}
          />
        </section>
        <Button
          variant="verde"
          id="aceptar"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              width="20"
              height="20"
              stroke-width="2"
            >
              {" "}
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>{" "}
              <path d="M7 11l5 5l5 -5"></path> <path d="M12 4l0 12"></path>{" "}
            </svg>
          }
        >
          {" "}
          Descargar
        </Button>
      </section>

      <section className="TablaInformes">
        <table className="tabla">
          <thead>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Proveedor</th>
          </thead>
          <tbody>
            {informesData.map((informe, index) => (
              <tr key={index}>
                <td>{informe.nombre}</td>
                <td>{informe.cantidad_actual}</td>
                <td
                  style={{
                    backgroundColor: asignarColor(informe.estado),
                    Color:
                      informe.estado > 30 && informe.estado < 70
                        ? "white"
                        : "black",
                  }}
                >
                  {informe.estado}%
                </td>
                <td>{informe.proveedor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default Informes;
