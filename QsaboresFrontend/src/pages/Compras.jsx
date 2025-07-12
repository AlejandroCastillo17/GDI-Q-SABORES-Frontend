import React from 'react';
import "../styles/Gastos.css";

const Compras = ({ seleccionados, setSeleccionados, comprasData, itemEditando, datosEditados, handleChangeEdicion }) => {
    const handleSeleccion = (id) => {
        setSeleccionados(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id) 
                : [...prev, id]
        );
    };
    
    console.log("en compras y detalles", comprasData )

    return (
        <div className="gastos-tabla">
            <table className="tabla">
                <thead className='t'>
                    <tr>
                        <th></th>
                        <th>Proveedor</th>
                        <th>Detalles</th>
                        <th>Cantidad</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {comprasData && comprasData.length > 0 ? (
                        comprasData.map((compra) => (
                            <tr key={compra.id}>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        checked={seleccionados.includes(compra.id)}
                                        onChange={() => handleSeleccion(compra.id)}
                                        disabled={itemEditando !== null && itemEditando !== compra.id}
                                    />
                                </td>
                                <td>
                                    {itemEditando === compra.id ? (
                                        <input
                                            className="input-edit"
                                            type="text"
                                            name="proveedor"
                                            value={datosEditados.subtotal || ''}
                                            onChange={handleChangeEdicion}
                                        />
                                    ) : (<ul style={{ margin: 0, padding: 0, listStyle: 'none', }}>
                                    {Array.isArray(compra.detallesCompra) ? compra.detallesCompra.map((detalle, index) => (
                                        <li key={index}>
                                        {`${detalle.producto.proveedor.nombre}`}
                                        </li>
                                    )): "Sin detalles"}
                                    </ul>
                                    )}
                                </td>
                                <td>
                                {itemEditando === compra.id ? (
                                    <input
                                    className="input-edit"
                                    type="text"
                                    name="detalles"
                                    value={datosEditados.cantidad || ''}
                                    onChange={handleChangeEdicion}
                                    />
                                ) : (
                                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                    {Array.isArray(compra.detallesCompra) && compra.detallesCompra.map((detalle, index) => (
                                        <li key={index}>
                                        {`${detalle.producto.nombre} (x${detalle.cantidad})` }
                                        </li>
                                    ))}
                                    </ul>
                                )}
                                </td>
                                <td>
                                    {itemEditando === compra.id ? (
                                        <input
                                            className="input-edit"
                                            type="number"
                                            name="subtotal"
                                            value={datosEditados.subtotal || 0}
                                            onChange={handleChangeEdicion}
                                            min="0"
                                        />
                                    ) : (
                                        `$${(compra.subtotal || 0).toLocaleString()}`
                                    )}
                                </td>
                                <td>
                                    {itemEditando === compra.id ? (
                                        <input
                                            className="input-edit"
                                            type="date"
                                            name="fecha"
                                            value={datosEditados.fecha || ''}
                                            onChange={handleChangeEdicion}
                                        />
                                    ) : (
                                        compra.fecha ? new Date(compra.fecha).toLocaleDateString() : 'N/A'
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="no-data">
                                No hay compras registradas
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Compras;