import "../styles/Inventario.css"
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "../components/Button";
import Buscador from "../components/buscador";


const Inventario = () => {

    // Lista de productos para dinamizar la tabla 

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        try {
          const productosGuardados = localStorage.getItem('productos');
          if (productosGuardados) {
            const productosParseados = JSON.parse(productosGuardados);
            if (Array.isArray(productosParseados)) {
              setProductos(productosParseados);
            } else {
              console.error('Productos guardados no son un array');
              setProductos([]); 
            }
          }
        } catch (error) {
          console.error('Error leyendo productos del localStorage:', error);
          setProductos([]);
        }
    }, []);

    useEffect(() => {
        if (productos.length > 0) { 
          localStorage.setItem('productos', JSON.stringify(productos));
        } else {
          localStorage.removeItem('productos'); 
        }
    }, [productos]);

    // logica para eliminar los porductos que se seleccionen 

    const Seleccion = (id, isChecked) => {
        setProductos(prev =>
            prev.map(producto =>
                producto.id === id ? { ...producto, seleccionado: isChecked } : producto
            )
        );
    };    

    const eliminarProdSelec = () => {
        const haySeleccionados = productos.some(p => p.seleccionado);
        if (!haySeleccionados) {
          toast.warning("No hay ningun producto seleccionado");
          cerrarModalEliminar();
          return;
        }
      
        const nuevosProductos = productos.filter(p => !p.seleccionado);
        setProductos(nuevosProductos);
        cerrarModalEliminar();
    };

    // Logica para verificar los cambios del formulario 

    const [datosForm, setdatosForm] = useState({
        id: '',
        nombre: '',
        cantidad: '',
        precio: '',
        proveedor: '',
        categoria: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdatosForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validación de campos
        const { nombre, cantidad, precio, proveedor, categoria } = datosForm;
    
        if (!imagen) {
            setError("Debe agregar una imagen del producto.");
            return;
        }
    
        if (!nombre || !cantidad || !precio || !proveedor || !categoria) {
            setError("Por favor complete todos los campos.");
            return;
        }

        // Agregar el producto a la tabla 

        const nuevoProducto = {
            id: productos.length + 1, 
            nombre,
            cantidad,
            precio,
            proveedor,
            categoria,
            imagen,
            seleccionado: false
        };

        setProductos(prev => [...prev, nuevoProducto]);

        //Logica para el back, esperar al negro 

        toast.success("¡Producto guardado exitosamente!");
    
        // Reset
        setdatosForm({ nombre: '', cantidad: '', precio: '', proveedor: '', categoria: '' });
        setError('');
        cerrarModalAgregar();
    };

    // Logica para el cambio de imagen 
    

    const inputRef = useRef(null);
    const [imagen, setImagen] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagen(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Logica para el modal de agregar 

    const [showModalAgregar, setShowModalAgregar] = useState(false);
  
    const abrirModalAgregar = () => {
        setShowModalAgregar(true);
    };
  
    const cerrarModalAgregar = () => {
        setShowModalAgregar(false);
        setImagen(null);
        inputRef.current.value = null;
        setdatosForm({ nombre: '', cantidad: '', precio: '', proveedor: '', categoria: '' });
        setError('');
    };

    // Logica para el modal de eliminar 

    const [showModalEliminar, setShowModalEliminar] = useState(false);

    const abrirModalEliminar = () => {
        const haySeleccionados = productos.some(p => p.seleccionado);
        if (!haySeleccionados) {
          toast.warning("No hay ningun producto seleccionado");
          return;
        }else {
            setShowModalEliminar(true);
        }
        
    }

    const cerrarModalEliminar = () => {
        setShowModalEliminar(false);
    }

    // Logica para la edicion del producto

    const [edicion, setEdicion] =useState(false);
    const [productoEditando, setProductoEditando] = useState(null);
    const [datosEditados, setDatosEditados] = useState({});

    const verEdicion = () => {
        const Seleccionados = productos.filter(p => p.seleccionado);

        if (Seleccionados.length === 0) {
            toast.warning("No hay ningun producto seleccionado");
            return;
        }
        
        if (Seleccionados.length > 1) {
            toast.warning("Selecciona solo un producto para editar");
            return;
        }

        const productoSeleccionado = Seleccionados[0];
  
        setEdicion(true);
        Editar(productoSeleccionado);
    }

    const ocultarEdicion = () => {
        setEdicion(false)
    }

    const Editar = (producto) => {
        setProductoEditando(producto.id); 
        setDatosEditados({ ...producto }); 
    };
    
    const CancelarEdicion = () => {
        setProductoEditando(null);
        setDatosEditados({});
        ocultarEdicion();
    };
    
    const GuardarEdicion = () => {
        setProductos((productosActuales) =>
            productosActuales.map(
                (prod) =>
                prod.id === productoEditando ? datosEditados : prod
            )
        );
        setProductoEditando(null);
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

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

    // ///////////////////////////////////////////////////////////////////////////////////////////////////// 

    return (
        <>
            <section className="inventario">
                <h1>INVENTARIO</h1>
                <div id="cont">
                    <div className="buscador">
                        <svg xmlns="http://www.w3.org/2000/svg"  width="25"  height="25"  viewBox="0 0 24 24"  
                            fill="none"  stroke="#000000"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
                            class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" 
                            fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" />
                        </svg>
                        <input type="text" />
                    </div>
                    <div id="cont-select">
                        <select id="select" value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
                            <option value="">Todas</option>
                            <option value="Licores">Licores</option>
                            <option value="Tabaco">Tabaco</option>
                            <option value="Gaseosas">Gaseosas</option>
                        </select>
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
                <div className="inventario-tabla">
                    <table className="tabla">
                        <thead className="t">
                            <tr>
                                <th></th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Proveedor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(categoriaSeleccionada
                                    ? productos.filter((p) => p.categoria === categoriaSeleccionada)
                                    : productos
                                ).map((producto, index) => 
                                    <tr key={producto.id}>
                                        <td>
                                            <input 
                                                type="checkbox" 
                                                checked={producto.seleccionado || false} 
                                                onChange={(e) => Seleccion(producto.id, e.target.checked)}
                                            />
                                        </td>
                                        <td>
                                            {productoEditando === producto.id ? 
                                                (
                                                    <input
                                                        className="inputs"
                                                        type="text"
                                                        name="nombre"
                                                        value={datosEditados.nombre}
                                                        onChange={handleChangeEdicion}
                                                    />
                                                ) 
                                                : 
                                                (producto.nombre)
                                            }
                                        </td>
                                        <td>
                                            {productoEditando === producto.id ? 
                                                (
                                                    <input
                                                        className="inputs"
                                                        type="number"
                                                        name="cantidad"
                                                        value={datosEditados.cantidad}
                                                        onChange={handleChangeEdicion}
                                                    />
                                                ) 
                                                : 
                                                (producto.cantidad)
                                            }
                                        </td>
                                        <td>
                                            {productoEditando === producto.id ? 
                                                (
                                                    <input
                                                        className="inputs"
                                                        type="number"
                                                        name="precio"
                                                        value={datosEditados.precio}
                                                        onChange={handleChangeEdicion}
                                                    />
                                                ) 
                                                : 
                                                (producto.precio)
                                            }
                                        </td>
                                        <td>
                                            {productoEditando === producto.id ? 
                                                (
                                                    <input
                                                        className="inputs"
                                                        type="text"
                                                        name="proveedor"
                                                        value={datosEditados.proveedor}
                                                        onChange={handleChangeEdicion}
                                                    />
                                                ) 
                                                : 
                                                (producto.proveedor)
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
                        <div className="modal-contenedor" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-contenido">
                                <div className="image-upload" id="previewContainer" style={{backgroundImage: imagen ? `url(${imagen})` : 'none', backgroundSize: imagen ? '100% 100%' : 'cover', }} >
                                    {!imagen && (
                                        <label htmlFor="imagenProducto" id="labelTexto">
                                            + Agregar imagen del producto.
                                        </label>
                                    )}
                                    <input type="file" id="imagenProducto" accept="image/*" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                                </div>
                                <form className="formulario" onSubmit={handleSubmit}>

                                    <div className="bloque">
                                        <label>Nombre</label>
                                        <input type="text" placeholder="Nombre del producto" name="nombre" value={datosForm.nombre} onChange={handleChange} />
                                    </div>
                                    
                                    <div className="bloque">
                                        <label>Cantidad</label>
                                        <input type="number" placeholder="Cantidad" name="cantidad" value={datosForm.cantidad} onChange={handleChange}  />
                                    </div>

                                    <div className="bloque">
                                        <label>Precio Unitario</label>
                                        <input type="number" step="0.01" placeholder="Precio" name="precio" value={datosForm.precio} onChange={handleChange} />
                                    </div>
                                    
                                    <div className="bloque">
                                        <label>Proveedor</label>
                                        <div id="cont-select-form">
                                            <select id="select-form" name="proveedor" value={datosForm.proveedor} onChange={handleChange}>
                                                <option value="value1">Value 1</option>
                                                <option value="value2">Value 2</option>
                                                <option value="value3">Value 3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="bloque">
                                        <label>Categoría</label>
                                        <div id="cont-select-form2">
                                            <select id="select-form" name="categoria" value={datosForm.categoria} onChange={handleChange}>
                                                <option value="Licores">Licores</option>
                                                <option value="Tabaco">Tabaco</option>
                                                <option value="Gaseosas">Gaseosas</option>
                                            </select>
                                        </div>
                                        
                                    </div>

                                    {error && <p className="error">{error}</p>}

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
                        <div className="modal-contenedor-eliminar" onClick={(e) => e.stopPropagation()}>
                            <h2>¿Esta completamente seguro que desea eliminar el/los productos?</h2>
                            <div id="botoness">
                                <Button variant="verde" onClick={eliminarProdSelec}>Aceptar</Button>
                                <Button variant="rojo" onClick={cerrarModalEliminar}>Cancelar</Button>
                            </div>
                        </div>
                    </div>
                )} 

            </section>
            <ToastContainer position="top-center" autoClose={3000} />
        </>
    )
};

export default Inventario;