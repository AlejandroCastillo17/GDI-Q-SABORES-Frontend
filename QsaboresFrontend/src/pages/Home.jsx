import "../styles/Home.css";
import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { consultaInventario } from "../js/inventario";
import { PrefetchPageLinks } from "react-router-dom";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [sugerencia, setSugerencia] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [cantidad, setCantidad] = useState("");
  const [devuelta, setDevuelta] = useState("");
  const [pago, setPago] = useState(0);

  const devolucion = (valor) => {
    const total = calcularTotal();
    const pagoNumero = Number(valor);

    if (isNaN(pagoNumero)) {
      setDevuelta(""); // o podrías mostrar un mensaje de error
      return;
    }

    if (pagoNumero < total) {
      setDevuelta("");
      return;
    }

    setDevuelta((pagoNumero - total).toFixed(2));
  };

  const calcularTotal = () => {
    return productosSeleccionados.reduce(
      (total, producto) => total + producto.total,
      0
    );
  };

  const eliminarP = (id) => {
    const nuevosP = productosSeleccionados.filter((p) => p.id !== id);
    setProductosSeleccionados(nuevosP);
  };

  const actualizarCantidad = (id, operacion) => {
    const nuevosP = productosSeleccionados.map((p) => {
      if (p.id === id) {
        let cantidadNueva =
          operacion === "sumar" ? p.cantidad + 1 : p.cantidad - 1;
        if (cantidadNueva < 1) {
          cantidadNueva = 1;
        }
        const nuevoSubtotal = p.Precio * cantidadNueva;
        const nuevoTotal = p.Precio * cantidadNueva;
        return {
          ...p,
          cantidad: cantidadNueva,
          subtotal: nuevoSubtotal,
          total: nuevoTotal,
        };
      }
      return p;
    });
    setProductosSeleccionados(nuevosP);
  };

  const ConsultarProductos = async () => {
    try {
      const data = await consultaInventario();
      if (Array.isArray(data)) {
        setProductos(data);
      }
    } catch (error) {
      console.error("Error al consultar productos:", error);
    }
  };

  useEffect(() => {
    ConsultarProductos();
  }, []);

  const handleBusqueda = (texto) => {
    setBusqueda(texto);
    const filtracion = productos.filter((p) =>
      p.nombre.toLowerCase().includes(texto.toLowerCase())
    );
    setSugerencia(filtracion);
  };

  const handleSeleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setBusqueda(producto.nombre);
    setSugerencia([]);
  };

  const AgregarProducto = () => {
    if (productoSeleccionado && cantidad > 0) {
      const Existe = productosSeleccionados.find(
        (p) => p.id === productoSeleccionado.id
      );

      if (Existe) {
        alert("El producto ya está en la lista");
        return;
      }
      const nuevo = {
        id: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        Precio: productoSeleccionado.precio,
        cantidad: cantidad,
        subtotal: productoSeleccionado.precio * cantidad,
        total: productoSeleccionado.precio * cantidad,
      };
      setProductosSeleccionados([...productosSeleccionados, nuevo]);
      setCantidad(1);
      setProductoSeleccionado(null);
      setSugerencia([]);
    } else {
      alert("Por favor, selecciona un producto y una cantidad válida.");
    }
  };
  console.log("esta es la sugerencia", sugerencia);

  return (
    <section className="Contenedor_principal">
      <section className="Principal_contenido">
        <div className="Contenido_superior">
          <div className="Superior_busqueda">
            <label>Producto</label>
            <input
              type="text"
              value={busqueda}
              placeholder={"Buscar producto"}
              id="Busqueda_buscador"
              onChange={(e) => handleBusqueda(e.target.value)}
            />

            {sugerencia.length > 0 && (
              <div className="Sugerencia_Productos">
                {sugerencia.map((producto) => (
                  <div
                    key={producto.id}
                    onClick={() => handleSeleccionarProducto(producto)}
                  >
                    {producto.nombre}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="Superior_Cantidad">
            <label>Cantidad</label>
            <input
              type="text"
              id="Busqueda_buscador"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
            />
          </div>
          <Button variant="verde" className="homeB" onClick={AgregarProducto}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 17h-11v-14h-2" />
              <path d="M6 5l14 1l-1 7h-13" />
            </svg>
            Agregar
          </Button>
        </div>
        <div className="Contenido_Tabla">
          <table className="Tabla_productos">
            <thead>
              <tr>
                <th>Producto</th>
                <th id="c">Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productosSeleccionados.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>
                    <div className="Cantidades">
                      <div
                        className="Cantidades_A"
                        onClick={() => actualizarCantidad(p.id, "sumar")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 5l0 14" />
                          <path d="M5 12l14 0" />
                        </svg>
                      </div>

                      <input
                        type="text"
                        className="Cantidades_numero"
                        value={p.cantidad}
                        readOnly
                      />

                      <div
                        className="Cantidades_B"
                        onClick={() => actualizarCantidad(p.id, "restar")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-minus"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M5 12l14 0" />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td>{p.Precio}</td>
                  <td>{p.subtotal}</td>
                  <td>{p.total}</td>

                  <td>
                    <svg
                      onClick={() => eliminarP(p.id)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-trash-x"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7h16" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      <path d="M10 12l4 4m0 -4l-4 4" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="Principal_valores">
        <section className="labels">
          <div className="label_Contenido">
            <div className="Contenido_labels">
              <label htmlFor="">Total</label>
              <input
                type="text"
                className="Labels_input"
                value={calcularTotal().toFixed(2)}
                readOnly
              />
            </div>

            <div className="Contenido_labels">
              <label htmlFor="">Pago</label>
              <input
                type="number"
                min="0"
                className="Labels_input"
                value={pago}
                onChange={(e) => {
                  const valor = e.target.value;
                  setPago(valor);
                  devolucion(valor);
                }}
              />
            </div>

            <div className="Contenido_labels">
              <label htmlFor="">Devuelve</label>
              <input
                type="text"
                className="Labels_input"
                value={devuelta}
                readOnly
              />
            </div>
          </div>

          <div className="label_Botones">
            <Button variant="verde">Vender</Button>
            <Button variant="rojo">Cancelar</Button>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Home;
