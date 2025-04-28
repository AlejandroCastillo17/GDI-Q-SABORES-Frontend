import React from 'react';
import Button from '../components/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/proveedores.css';

const Proveedores = () => {

    // Lista de proveedores 
    
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        try {
            const proveedoresGuardados = localStorage.getItem('proveedores');
            if (proveedoresGuardados) {
            const proveedoresParseados = JSON.parse(proveedoresGuardados);
            if (Array.isArray(proveedoresParseados)) {
                setProveedores(proveedoresParseados);
            } else {
                console.error('Proveedores guardados no son un array');
                setProveedores([]); 
            }
            }
        } catch (error) {
            console.error('Error leyendo proveedores del localStorage:', error);
            setProveedores([]);
        }
    }, []);

    useEffect(() => {
        if (proveedores.length > 0) { 
            localStorage.setItem('proveedores', JSON.stringify(proveedores));
        } else {
            localStorage.removeItem('proveedores'); 
        }
    }, [proveedores]);

    // logica para eliminar los proveedores que se seleccionen 

    const Seleccion = (id, isChecked) => {
        setProveedores(prev =>
            prev.map(proveedor =>
                proveedor.id === id ? { ...proveedor, seleccionado: isChecked } : proveedor
            )
        );
    };    

    const eliminarProveeSelec = () => {
        const haySeleccionados = proveedores.some(p => p.seleccionado);
        if (!haySeleccionados) {
          toast.warning("No hay ningun proveedor seleccionado");
          cerrarModalEliminar();
          return;
        }
      
        const nuevosProveedores = proveedores.filter(p => !p.seleccionado);
        setProveedores(nuevosProveedores);
        cerrarModalEliminar();
    };

    // Logica para verificar los cambios del formulario 

    const [datosForm, setdatosForm] = useState({
        id: '',
        nombre: '',
        telefono: '',
        email: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdatosForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validación de campos
        const { nombre, telefono, email } = datosForm;
    
        if (!nombre || !telefono || !email) {
            setError("Por favor complete todos los campos.");
            return;
        }

        // Agregar el proveedor a la tabla 

        const nuevoProveedor = {
            id: proveedores.length + 1, 
            nombre,
            telefono,
            email,
            seleccionado: false
        };

        setProveedores(prev => [...prev, nuevoProveedor]);

        //Logica para el back, esperar al negro 

        toast.success("¡Proovedor guardado exitosamente!");
    
        // Reset
        setdatosForm({ nombre: '', telefono: '', email: '' });
        setError('');
        cerrarModalAgregar();
    };

    // Logica para el modal de agregar nuevo proveedor 

    const [showModalAgregar, setShowModalAgregar] = useState(false);
    
    const abrirModalAgregar = () => {
        setShowModalAgregar(true);
    };
    
    const cerrarModalAgregar = () => {
        setShowModalAgregar(false);
        setdatosForm({ nombre: '', telefono: '', email: '' });
        setError('');
    };

    // Logica para el modal de eliminar 

    const [showModalEliminar, setShowModalEliminar] = useState(false);

    const abrirModalEliminar = () => {
        const haySeleccionados = proveedores.some(p => p.seleccionado);
        if (!haySeleccionados) {
          toast.warning("No hay ningun proveedor seleccionado");
          return;
        }else {
            setShowModalEliminar(true);
        }
        
    }

    const cerrarModalEliminar = () => {
        setShowModalEliminar(false);
    }

    // Logica para la edicion de los proveedores

    const [edicion, setEdicion] =useState(false);
    const [proveedorEditando, setProveedorEditando] = useState(null);
    const [datosEditados, setDatosEditados] = useState({});

    const verEdicion = () => {
        const Seleccionados = proveedores.filter(p => p.seleccionado);

        if (Seleccionados.length === 0) {
            toast.warning("No hay ningun proveedor seleccionado");
            return;
        }
        
        if (Seleccionados.length > 1) {
            toast.warning("Selecciona solo un proveedor para editar");
            return;
        }

        const proveedorSeleccionado = Seleccionados[0];
  
        setEdicion(true);
        Editar(proveedorSeleccionado);
    }

    const ocultarEdicion = () => {
        setEdicion(false)
    }

    const Editar = (proveedor) => {
        setProveedorEditando(proveedor.id); 
        setDatosEditados({ ...proveedor }); 
    };
    
    const CancelarEdicion = () => {
        setProveedorEditando(null);
        setDatosEditados({});
        ocultarEdicion();
    };
    
    const GuardarEdicion = () => {
        setProveedores((proveedores) =>
            proveedores.map(
                (provee) =>
                provee.id === proveedorEditando ? datosEditados : provee
            )
        );
        setProveedorEditando(null);
        setDatosEditados({});
        ocultarEdicion();
    };
    
    const handleChangeEdicion = (e) => {
        const { name, value } = e.target;
        setDatosEditados((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <section className="proveedores">
                <h1>PROVEEDORES</h1>
                <div id="cont">
                    <div className="buscador">
                        <svg xmlns="http://www.w3.org/2000/svg"  width="25"  height="25"  viewBox="0 0 24 24"  
                            fill="none"  stroke="#000000"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
                            class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" 
                            fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" />
                        </svg>
                        <input type="search" />
                    </div>
                    <Button variant="rojo" onClick={abrirModalEliminar}>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  
                            fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
                            class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" 
                            fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                        Eliminar
                    </Button>
                    <Button variant="azul" onClick={verEdicion}>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="25"  height="25"  viewBox="0 0 24 24"  
                            fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
                            class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" 
                            fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" />
                        </svg>
                        Editar
                    </Button>
                    <Button variant="verde" onClick={abrirModalAgregar}>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="25"  height="25"  viewBox="0 0 24 24"  
                            fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
                            class="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-plus">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /><path d="M15 12h-6" />
                            <path d="M12 9v6" />
                        </svg>
                        Agregar
                    </Button>
                </div>
                <br />
                <div className="proveedores-tabla">
                    <table class="tabla">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nombre</th>
                                <th>Telefono</th>
                                <th>Email</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {proveedores.map((proveedor, index) => 
                                <tr key={proveedor.id}>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            checked={proveedor.seleccionado || false}
                                            onChange={(e) => Seleccion(proveedor.id, e.target.checked)} 
                                        />
                                    </td>
                                    <td>
                                        {proveedorEditando === proveedor.id ? 
                                            (
                                                <input
                                                    className="inputss"
                                                    type="text"
                                                    name="nombre"
                                                    value={datosEditados.nombre}
                                                    onChange={handleChangeEdicion}
                                                />
                                            ) 
                                            : 
                                            (proveedor.nombre)
                                        }
                                    </td>
                                    <td>
                                        {proveedorEditando === proveedor.id ? 
                                            (
                                                <input
                                                    className="inputss"
                                                    type="tel"
                                                    name="telefono"
                                                    value={datosEditados.telefono}
                                                    onChange={handleChangeEdicion}
                                                />
                                            ) 
                                            : 
                                            (proveedor.telefono)
                                        }
                                    </td>
                                    <td>
                                        {proveedorEditando === proveedor.id ? 
                                            (
                                                <input
                                                    className="inputss"
                                                    type="email"
                                                    name="email"
                                                    value={datosEditados.email}
                                                    onChange={handleChangeEdicion}
                                                />
                                            ) 
                                            : 
                                            (proveedor.email)
                                        }
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {edicion && (
                    <div id="botoness-edicion">
                        <Button variant="verde"  onClick={GuardarEdicion}>Guardar</Button>
                        <Button variant="rojo" onClick={CancelarEdicion} >Cancelar</Button>
                    </div>
                )}

                {/* Modal de agregar producto */}
                {showModalAgregar && (
                    <div className="modal" onClick={cerrarModalAgregar}>
                        <div className="modal-contenedor-p" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-contenido-p">
                                <form className="formulario-p" onSubmit={handleSubmit}>

                                    <div className="bloque">
                                        <label>Nombre</label>
                                        <input type="text" placeholder="Nombre del proovedor" name="nombre" value={datosForm.nombre} onChange={handleChange} />
                                    </div>
                                    
                                    <div className="bloque">
                                        <label>Telefono</label>
                                        <input type="tel" placeholder="Numero de contacto" name="telefono" value={datosForm.telefono} onChange={handleChange}  />
                                    </div>

                                    <div className="bloque">
                                        <label>Email</label>
                                        <input type="email" step="0.01" placeholder="Email del proveedor" name="email" value={datosForm.email} onChange={handleChange} />
                                    </div>

                                    {error && <p className="error-p">{error}</p>}  

                                    <div className="botones">
                                        <Button type="submit" variant="verde" class="btn">Guardar</Button>
                                        <Button variant="rojo" onClick={cerrarModalAgregar} class="btn">Cancelar</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de eliminar producto */}
                {showModalEliminar && (
                    <div className="modal" onClick={cerrarModalEliminar}>
                        <div className="modal-contenedor-eliminar-p" onClick={(e) => e.stopPropagation()}>
                            <h2>¿Esta completamente seguro que desea eliminar el/los proveedores?</h2>
                            <div id="botoness">
                                <Button variant="verde" onClick={eliminarProveeSelec}>Aceptar</Button>
                                <Button variant="rojo" onClick={cerrarModalEliminar}>Cancelar</Button>
                            </div>
                        </div>
                    </div>
                )} 

            </section>
            <ToastContainer position="top-center" autoClose={3000} />

        </>
    );
}

export default Proveedores;