import React, { useState, useEffect } from 'react';
import { getEgresos, deleteEgreso } from "../js/gastosService";
import { toast } from "react-toastify";
import "../styles/Compras.css";

const Compras = ({ seleccionados, setSeleccionados, itemEditando, datosEditados, handleChangeEdicion }) => {
    const [compras, setCompras] = useState([]);
    const [cargando, setCargando] = useState(true);

    const obtenerCompras = async () => {
        try {
            const res = await getEgresos("compras");
            if (Array.isArray(res)) {
                setCompras(res);
            } else {
                console.error("Respuesta no esperada:", res);
                toast.error("Formato de datos incorrecto");
            }
        } catch (error) {
            console.error("Error al cargar compras:", error);
            toast.error("Error al cargar compras");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerCompras();
    }, []);

    const handleSeleccion = (id) => {
        setSeleccionados(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const eliminarSeleccionados = async () => {
        if (seleccionados.length === 0) {
            toast.warning("No hay compras seleccionadas");
            return;
        }

        try {
            const res = await deleteEgreso("compras", { ids: seleccionados });
            if (res.status === 204) {
                toast.success("Compras eliminadas correctamente");
                obtenerCompras();
                setSeleccionados([]);
            }
        } catch (err) {
            console.error("Error al eliminar compras:", err);
            toast.error("No se pudieron eliminar las compras");
        }
    };

    if (cargando) {
        return (
            <div className="modal-cargando">
                <div className="modal-contenido-c">
                    <div className='loader'></div>
                </div>
            </div>
        );
    }

    return (
        <div className="compras-tabla">
            <table className="tabla">
                <thead>
                    <tr>
                        <th width="5%"></th>
                        <th width="10%">ID</th>
                        <th width="20%">Proveedor</th>
                        <th width="15%">Fecha</th>
                        <th width="15%">Subtotal</th>
                        <th width="35%">Productos</th>
                    </tr>
                </thead>
                <tbody>
                    {compras.length > 0 ? (
                        compras.map((compra) => (
                            <tr key={compra.id} className={seleccionados.includes(compra.id) ? 'seleccionado' : ''}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={seleccionados.includes(compra.id)}
                                        onChange={() => handleSeleccion(compra.id)}
                                        disabled={itemEditando !== null}
                                    />
                                </td>
                                <td>{compra.id}</td>
                                <td>
                                    {itemEditando === compra.id ? (
                                        <input
                                            className="input-edit"
                                            type="text"
                                            name="proveedor"
                                            value={datosEditados.proveedor?.nombre || ''}
                                            onChange={handleChangeEdicion}
                                        />
                                    ) : (
                                        compra.proveedor?.nombre || "Sin proveedor"
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
                                        compra.fecha
                                    )}
                                </td>
                                <td>
                                    {itemEditando === compra.id ? (
                                        <input
                                            className="input-edit"
                                            type="number"
                                            name="subtotal"
                                            value={datosEditados.subtotal || ''}
                                            onChange={handleChangeEdicion}
                                            min="0"
                                            step="0.01"
                                        />
                                    ) : (
                                        `$${compra.subtotal?.toLocaleString() || '0'}`
                                    )}
                                </td>
                                <td>
                                    {compra.detallesCompra?.map((detalle) => (
                                        <div key={detalle.id} className="producto-item">
                                            {itemEditando === compra.id ? (
                                                <>
                                                    <input
                                                        className="input-edit"
                                                        type="text"
                                                        name={`producto-${detalle.id}`}
                                                        value={detalle.producto?.nombre || ''}
                                                        onChange={(e) => handleChangeEdicion({
                                                            target: {
                                                                name: 'productos',
                                                                value: datosEditados.detallesCompra.map(p => 
                                                                    p.id === detalle.id ? 
                                                                    {...p, producto: {...p.producto, nombre: e.target.value}} : p
                                                                )
                                                            }
                                                        })}
                                                    />
                                                    <input
                                                        className="input-edit cantidad"
                                                        type="number"
                                                        name={`cantidad-${detalle.id}`}
                                                        value={detalle.cantidad || ''}
                                                        onChange={(e) => handleChangeEdicion({
                                                            target: {
                                                                name: 'productos',
                                                                value: datosEditados.detallesCompra.map(p => 
                                                                    p.id === detalle.id ? 
                                                                    {...p, cantidad: e.target.value} : p
                                                                )
                                                            }
                                                        })}
                                                        min="1"
                                                    />
                                                </>
                                            ) : (
                                                `${detalle.producto?.nombre || 'Producto'} x${detalle.cantidad || '0'}`
                                            )}
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="no-data">
                                No hay compras registradas
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {seleccionados.length > 0 && (
                <div className="acciones">
                    <button 
                        className="btn-eliminar"
                        onClick={eliminarSeleccionados}
                    >
                        Eliminar seleccionados
                    </button>
                </div>
            )}
        </div>
    );
};

export default Compras;