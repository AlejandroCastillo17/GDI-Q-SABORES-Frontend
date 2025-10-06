import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ImprimirFacturaPOS({ ventas, isOpen, onClose }) {
  const venta = ventas[0]; // porque solo hay una venta

  const imprimirFactura = () => {
    if (window.print) {
      window.print();
    } else {
      generarPDF();
    }
  };

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Factura N° ${venta.id}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Fecha: ${venta.fecha}`, 10, 20);

    const columnas = ["Producto", "Cantidad", "Precio", "Subtotal"];
    const filas = venta.detallesVentas.map((d) => [
      d.producto.nombre,
      d.cantidad,
      `$${parseFloat(d.producto.precio).toLocaleString()}`,
      `$${parseFloat(d.subtotal).toLocaleString()}`,
    ]);

    doc.autoTable({
      head: [columnas],
      body: filas,
      startY: 30,
    });

    const totalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Total: $${parseFloat(venta.total).toLocaleString()}`, 10, totalY);

    doc.save(`factura_${venta.id}.pdf`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Factura POS"
      style={{
        content: {
          width: "400px",
          margin: "auto",
          borderRadius: "10px",
          padding: "20px",
        },
      }}
    >
      <h3>Factura N° {venta.id}</h3>
      <p>Fecha: {venta.fecha}</p>
      <hr />
      <ul>
        {venta.detallesVentas.map((d) => (
          <li key={d.id}>
            {d.cantidad}x {d.producto.nombre} — $
            {parseFloat(d.subtotal).toLocaleString()}
          </li>
        ))}
      </ul>
      <hr />
      <p style={{ textAlign: "right" }}>
        <strong>Total: ${parseFloat(venta.total).toLocaleString()}</strong>
      </p>

      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <button onClick={imprimirFactura} style={{ marginRight: "10px" }}>
          🖨️ Imprimir / PDF
        </button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </Modal>
  );
}
