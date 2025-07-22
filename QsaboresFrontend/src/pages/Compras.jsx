import React from 'react';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import "../styles/Gastos.css";
import makeAnimated from 'react-select/animated';
import { getProductos } from '../js/egresosService';

const animatedComponents = makeAnimated();

const Compras = ({ seleccionados, setSeleccionados, comprasData, itemEditando, datosEditados, handleChangeEdicion }) => {
    
    const [productosOptions, setProductosOptions] = useState([]);
    const [proveedoresOptions, setProveedoresOptions] = useState([]);
    const [combinedOptions, setCombinedOptions] = useState([]);
    const [headerColspan, setHeaderColspan] = useState({ proveedor: 1, detalles: 1 });

    useEffect(() => {
        // Simular carga de datos (reemplaza con tu API real)
        const loadOptions = async () => {

            if (itemEditando) {
                setHeaderColspan({ proveedor: 2, detalles: 0 });
            } else {
                setHeaderColspan({ proveedor: 1, detalles: 1 });
            }

            const productos = await getProductos();

            const productosOpts = productos.map(p => ({
                value: p.id,
                label: `${p.nombre} | ${p.proveedor.nombre}`,
                producto: p.nombre,
                proveedor: p.proveedor.nombre
            }));
            
            setProductosOptions(productosOpts);
            setCombinedOptions(productosOpts);
        };
        
        loadOptions();
    }, []);

    
    const handleSeleccion = (id) => {
        setSeleccionados(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id) 
                : [...prev, id]
        );
    };
    
    const handleCombinedChange = (selectedOption, compra) => {
    if (selectedOption) {
        handleChangeEdicion({ target: { name: 'producto', value: selectedOption.producto } });
        handleChangeEdicion({ target: { name: 'proveedor', value: selectedOption.proveedor } });
        handleChangeEdicion({ target: { name: 'idproducto', value: selectedOption.value } });

        // Aquí sí tienes acceso a la compra actual
        const detalle = compra?.detallesCompra?.[0] || null;
        handleChangeEdicion({
            target: {
                name: 'detalleCompra',
                value: detalle
                }
            });
        }
    };

    const getCurrentCombinedValue = (compra) => {
        const producto = datosEditados.producto?.nombre || compra.producto?.nombre || '';
        const proveedor = datosEditados.proveedor || compra.proveedor || compra.producto?.proveedor?.nombre || '';
        
        if (!producto && !proveedor) return null;
        
        return {
            value: datosEditados.idproducto || compra.producto?.id || '',
            label: `${producto} | ${proveedor}`,
            producto,
            proveedor
        };
    };


    return (
        <div className="gastos-tabla">
            <table className="tabla">
                <thead className='t'>
                     <tr>
                        <th></th>
                        <th colSpan={headerColspan.proveedor}>
                            {itemEditando ? 'Detalles/Proveedor' : 'Proveedor'}
                        </th>
                        {!itemEditando && <th colSpan={headerColspan.detalles}>Detalles</th>}
                        <th>Cantidad</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {comprasData && comprasData.length > 0 ? (
                        comprasData.toReversed().map((compra) => (
                            <tr key={compra.id}>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        checked={seleccionados.includes(compra.id)}
                                        onChange={() => handleSeleccion(compra.id)}
                                        disabled={itemEditando !== null && itemEditando !== compra.id}
                                    />
                                </td>
                                
                                {/* Proveedor - Se combina con Detalles solo en edición */}
                                <td>
                                    {itemEditando === compra.id ? (
                                        <div className="combined-select">
                                            <Select
                                                className="react-select-container"
                                                classNamePrefix="react-select"
                                                options={combinedOptions}
                                                value={getCurrentCombinedValue(compra)}
                                                onChange={(selectedOption) => handleCombinedChange(selectedOption, compra)}
                                                placeholder="Buscar producto/proveedor..."
                                                isSearchable
                                                noOptionsMessage={() => "No se encontraron resultados"}
                                                components={animatedComponents}
                                            />
                                        </div>
                                    ) : (
                                        compra.proveedor || compra.producto?.proveedor?.nombre || 'N/A'
                                    )}
                                </td>

                                {/* Detalles - Oculto en edición */}
                                {itemEditando !== compra.id && (
                                    <td>
                                        {compra.producto?.nombre || 'N/A'}
                                    </td>
                                )}
                                {itemEditando === compra.id && (
                                    <td style={{display: 'none'}}></td>
                                )}
                        
                                {/* Cantidad */}
                                <td>
                                    {itemEditando === compra.id ? (
                                        <input
                                            className="input-edit"
                                            type="number"
                                            name="cantidad"
                                            value={datosEditados.cantidad || compra.cantidad || ''}
                                            onChange={handleChangeEdicion}
                                            // min=""
                                        />
                                    ) : (
                                        compra.cantidad ? new Number(compra.cantidad).toLocaleString('es-CO', {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }) : 'N/A'
                                    )}
                                </td>
                                
                                {/* Precio */}
                                <td>
                                    {itemEditando === compra.id ? (
                                        <input
                                            className="input-edit"
                                            type="number"
                                            name="precio"
                                            value={datosEditados.precio || compra.precio || 0}
                                            onChange={handleChangeEdicion}
                                            min="0"
                                        />
                                    ) : (
                                        `$${Number(compra.precio || 0).toLocaleString('es-CO', {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })}`
                                    )}
                                </td>

                                {/* Fecha */}
                                <td>
                                    {itemEditando === compra.id ? (
                                        <input
                                            className="input-edit"
                                            type="date"
                                            name="fecha"
                                            value={datosEditados.fecha || compra.fecha || ''}
                                            onChange={handleChangeEdicion}
                                        />
                                    ) : (
                                        compra.fecha ? new Date(compra.fecha).toLocaleDateString('es-ES', { timeZone: 'UTC' }) : 'N/A'
                                    )}
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
        </div>
    );
};

export default Compras;