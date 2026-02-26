// src/pages/Informes.jsx
import { useState, useEffect, useRef } from "react";
import "../styles/Ventas.css";
import Button from "../components/Button";
import { ConsultarVentas } from "../js/ventas.js";
import Select from "react-select/base";
import ImprimirFacturaPOS from "../components/imprimirFactura";

const Ventas = () => {
  const [ventasData, setventasData] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true); // <-- Loader activado
  const [Panel, setPanel] = useState(false);
  const [VentaSeleccionada, setVentaSeleccionada] = useState(null);
  const [Filtracion, setFiltracion] = useState(false);
  const [SelectAll, setSelectAll] = useState(false);
  const [Seleccionados, setSeleccionados] = useState([]);
  const printRef = useRef(null);

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

  const DetallesVenta = (Venta) => {
    console.log(Venta);
    setVentaSeleccionada(Venta);
    setPanel(true);
  };

  const CambioSeleccion = (id) => {
    setSeleccionados(
      (
        items, //indicador de los items de setSeleccionados o los items de su array
      ) =>
        items.includes(id)
          ? items.filter((item) => item !== id) // si en los items esta la id entonces devuelve el array con los items menos ese id
          : [...items, id], // sino esta entonces lo añade
    );
  };

  const imprimirVenta = () => {
    if (!VentaSeleccionada) return;

    setTimeout(() => {
      if (printRef.current) {
        printRef.current.print();
      }
    }, 200);
  };

  console.log("esto es lo que agrega el state", Seleccionados);

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
      <div className="superior">
        <h1>VENTAS</h1>

        <div className="superiorBotones">
          <div
            className="BotonFiltro"
            onClick={() => setFiltracion(!Filtracion)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="icon icon-tabler icons-tabler-filled icon-tabler-calendar-week"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M16 2c.183 0 .355 .05 .502 .135l.033 .02c.28 .177 .465 .49 .465 .845v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 .514 -.874l.093 -.046l.066 -.025l.1 -.029l.107 -.019l.12 -.007q .083 0 .161 .013l.122 .029l.04 .012l.06 .023c.328 .135 .568 .44 .61 .806l.007 .117v1h6v-1a1 1 0 0 1 1 -1m3 7h-14v9.625c0 .705 .386 1.286 .883 1.366l.117 .009h12c.513 0 .936 -.53 .993 -1.215l.007 -.16z" />
              <path d="M9.015 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
              <path d="M13.015 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
              <path d="M17.02 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
              <path d="M12.02 15a1 1 0 0 1 0 2a1.001 1.001 0 1 1 -.005 -2z" />
              <path d="M9.015 16a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
            </svg>
            <p>Filtrar por Fecha</p>
          </div>

          <div
            className="BotonSeleccion"
            onClick={() => {
              if (Seleccionados.length === ventasData.length) {
                //cuando de clic si el array de seleccionados es igual al de las ventas es por que selecciono todo y quiere vaciar lo seleccionado
                setSeleccionados([]); // lo vacia
              } else {
                // sino esta todo seleccionado  cambia el state de seleccionados y le agrega todos los ids al state para que se seleccione todo
                setSeleccionados(ventasData.map((v) => v.id));
              }
              setSelectAll(!SelectAll);
            }}
          >
            <div
              className={`Cuadro ${SelectAll ? "Cuadro0" : "CuadroC"}`}
            ></div>
            <p>Seleccionar todo</p>
          </div>
        </div>
      </div>

      {error && <p className="error-msg">{error}</p>}

      <section className="TablaVentas">
        <table className="tabla">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Fecha</th>
              <th>Total Ganancia</th>
              <th>Ver más</th>
            </tr>
          </thead>

          <tbody>
            {ventasData.map((Venta, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    id="check"
                    checked={Seleccionados.includes(Venta.id)}
                    onChange={() => CambioSeleccion(Venta.id)}
                  />
                </td>
                <td>{Venta.id}</td>
                <td>{new Date(Venta.fecha).toLocaleString()}</td>
                <td>{Venta.total}</td>
                <td>
                  <button onClick={() => DetallesVenta(Venta)}>Ver mas</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={Panel ? "Cubierta" : ""}>
          {Panel && VentaSeleccionada && (
            <div className="panel panel-open">
              <div className="contenidoP">
                <div className="headerVenta">
                  <h1>Venta #{VentaSeleccionada.id}</h1>
                  <h2>{new Date(VentaSeleccionada.fecha).toLocaleString()}</h2>
                  <h2 id="Total">
                    Total <span>${VentaSeleccionada.total}</span>
                  </h2>
                </div>

                <h3>Detalles de Venta</h3>
                <ul className="ListaProductos">
                  {VentaSeleccionada.detallesVentas?.map((detalle, index) => (
                    <li key={index} className="ListaProductos_producto">
                      {detalle.producto.nombre}({detalle.cantidad}){" "}
                      <span>{detalle.producto.precio}</span>
                    </li>
                  ))}
                </ul>

                <div className="botones">
                  <button
                    className="botones_Salir"
                    onClick={() => setPanel(false)}
                  >
                    Salir
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back-up"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M9 14l-4 -4l4 -4" />
                      <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
                    </svg>
                  </button>
                  <button className="botones_Descargar" onClick={imprimirVenta}>
                    Descargar
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-download"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                      <path d="M7 11l5 5l5 -5" />
                      <path d="M12 4l0 12" />
                    </svg>
                  </button>
                  <ImprimirFacturaPOS
                    ref={printRef}
                    venta={VentaSeleccionada}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <div className={Filtracion ? "Cubierta" : ""}>
        <div className={Filtracion ? "PanelF" : "PanelO"}>
          <div className="PF_Header">
            <div className="Header_Titulo">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="icon icon-tabler icons-tabler-filled icon-tabler-calendar-week"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M16 2c.183 0 .355 .05 .502 .135l.033 .02c.28 .177 .465 .49 .465 .845v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 .514 -.874l.093 -.046l.066 -.025l.1 -.029l.107 -.019l.12 -.007q .083 0 .161 .013l.122 .029l.04 .012l.06 .023c.328 .135 .568 .44 .61 .806l.007 .117v1h6v-1a1 1 0 0 1 1 -1m3 7h-14v9.625c0 .705 .386 1.286 .883 1.366l.117 .009h12c.513 0 .936 -.53 .993 -1.215l.007 -.16z" />
                <path d="M9.015 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
                <path d="M13.015 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
                <path d="M17.02 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
                <path d="M12.02 15a1 1 0 0 1 0 2a1.001 1.001 0 1 1 -.005 -2z" />
                <path d="M9.015 16a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
              </svg>
              Filtrar por fecha
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
              id="CerrarF"
              onClick={() => setFiltracion(!Filtracion)}
            >
              <path d="M11.676 2.001l.324 -.001c7.752 0 10 2.248 10 10l-.005 .642c-.126 7.235 -2.461 9.358 -9.995 9.358l-.642 -.005c-7.13 -.125 -9.295 -2.395 -9.358 -9.67v-.325c0 -7.643 2.185 -9.936 9.676 -9.999m2.771 5.105a1 1 0 0 0 -1.341 .447l-1.106 2.21l-1.106 -2.21a1 1 0 0 0 -1.234 -.494l-.107 .047a1 1 0 0 0 -.447 1.341l1.774 3.553l-1.775 3.553a1 1 0 0 0 .345 1.283l.102 .058a1 1 0 0 0 1.341 -.447l1.107 -2.211l1.106 2.211a1 1 0 0 0 1.234 .494l.107 -.047a1 1 0 0 0 .447 -1.341l-1.776 -3.553l1.776 -3.553a1 1 0 0 0 -.345 -1.283z" />
            </svg>
          </div>

          <div className="BotonesAtajo">
            <div className="BA Bhoy">Hoy</div>
            <div className="BA Bayer">Ayer</div>
            <div className="BA B7D">Ultimos 7 dias </div>
            <div className="BA BEM">Este mes </div>
            <div className="BA BMP">Mes Pasado</div>
          </div>

          <div className="PF_Fechas">
            <div className="Fechas">
              <p>Desde</p>
              <div className="Fechas_input">
                <input className="Dinput" type="date" />
              </div>
            </div>

            <div className="Fechas">
              <p>Hasta</p>
              <div className="Fechas_input">
                <input className="Dinput" type="date" />
              </div>
            </div>
          </div>

          <div className="ButtonA">
            <button id="BAplicar">Aplicar</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ventas;
