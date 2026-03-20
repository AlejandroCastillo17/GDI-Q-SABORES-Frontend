import { useReactToPrint } from "react-to-print";
import { useRef, forwardRef, useImperativeHandle } from "react";
import "/src/styles/ImprimirFactura.css";

const ImprimirFacturaPOS = forwardRef(({ venta }, ref) => {
  const contentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Factura_${venta.id}_${venta.fecha}_${venta.hora}`,
  });

  // Permite ejecutar desde el padre con printRef.current.print()
  useImperativeHandle(ref, () => ({
    print: handlePrint,
  }));

  return (
    <div style={{ 
      position: "absolute",
      left: "-9999px",
      top: "0" ,
      width: "58mm"    // MUY IMPORTANTE
    }}>
      {/* Contenido a imprimir (oculto visualmente) */}
      <div ref={contentRef} className="factura-container">
        {/* Encabezado */}
        <div className="factura-header">
          <img
            src="/src/assets/images/qsaboreslogo.png" // cambia a tu logo real
            alt="Q'Sabores"
            className="factura-logo"
          />
          <h2>Q'SABORES</h2>
          <p className="factura-slogan">
            TODO LO QUE NECESITAS, SIEMPRE CERCA
          </p>
          <hr />
          <p className="factura-info">
            <strong>NIT EMPRESA Q'SABORES:</strong> 1094430725-9
            <br />
            <strong>Direccion:</strong> Carrera 32 # 76 - 30 Medellin
            <br />
            <strong>Factura N°:</strong> {venta.id}
            <br />
            <strong>Fecha:</strong> {venta.fecha}
            <br />
            <strong>Hora:</strong> {venta.hora}
          </p>
        </div>

        {/* Detalles */}
        <table className="factura-tabla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cant.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {venta.detallesVentas.map((d) => (
              <tr key={d.id}>
                <td>{d.producto.nombre}</td>
                <td className="centro">{d.cantidad}</td>
                <td className="derecha">
                  ${parseFloat(d.subtotal).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="factura-total">
          Total: ${parseFloat(venta.total).toLocaleString()}
        </div>

        {/* Pie */}
        <div className="factura-footer">
          <hr />
          ¡Gracias por su compra! 🌿
        </div>
      </div>
    </div>
  );
});

export default ImprimirFacturaPOS;
