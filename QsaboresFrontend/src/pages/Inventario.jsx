import "../styles/Inventario.css";
import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";
import Buscador from "../components/buscador";
import { consultaInventario } from "../js/inventario";
import { consultaProveedores } from "../js/proveedores";
import { consultaCategoria } from "../js/categoria";


const Inventario = () => {

    const [cargando, setCargando] = useState(true);

    const [productosData, setProductosData] = useState([]);
    const [proveedoresData, setProveedoresData] = useState([])
    const [categoriaData, setCategoriaData] = useState([])

    const [error, setError] = useState(null);

    useEffect(() => {

        const obtenerInventario = async () => {
        try {
            const data = await consultaInventario();
            if (Array.isArray(data)) {
            setProductosData(data);
            } else {
            setError("Error al acceder al inventario");
            console.error("Respuesta inesperada:", data);
            }
        } catch (err) {
            setError("Error al consultar el inventario");
            console.error("Error en la consulta:", err);
        } finally {
            setCargando(false);
        }
        };

        const obtenerProveedores =  async () => {
            try{
                const provedoresD = await consultaProveedores();
                if (Array.isArray(provedoresD)){
                    setProveedoresData(provedoresD)
                }
                else{
                    setError("Error al acceder a los proveedores");
                    console.error("Respuesta inesperada:", provedoresD);
                }
            }
            catch (error){
                setError("Error al consultar los proveedores");
                console.error("Error en la consulta:", error);
            }
        };

        const obtenerCategoria =  async () => {
            try{
                const categorias = await consultaCategoria();
                if (Array.isArray(categorias)){
                    setCategoriaData(categorias)
                }
                else{
                    setError("Error al acceder a la categoria");
                    console.error("Respuesta inesperada:", categorias);
                }
            }
            catch (error){
                setError("Error al consultar las categorias");
                console.error("Error en la consulta:", error);
            }
        };

        obtenerInventario();
        obtenerProveedores();
        obtenerCategoria();
        

    }, []);

    console.log(productosData);
    console.log("esto: ",proveedoresData);
    console.log(categoriaData);
    
    // logica para eliminar los porductos que se seleccionen

    const eliminarProdSelec = () => {
        const Productos = productosData.filter(p => !seleccionados.includes(p.id));
        setProductosData(Productos);
        cerrarModalEliminar();
    };

    // Logica para verificar los cambios del formulario

    const [datosForm, setdatosForm] = useState({
        id: "",
        nombre: "",
        precio: "",
        tope: "",
        proveedor: "",
        categoria: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdatosForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de campos
        const { nombre, precio, tope, proveedor, categoria } = datosForm;

        if (!imagen) {
            setError("Debe agregar una imagen del producto.");
            return;
        }

        if (!nombre ||  !precio || !tope || !proveedor || !categoria) {
            setError("Por favor complete todos los campos.");
            return;
        }

        // Agregar el producto a la tabla

        const nuevoProducto = {
            id: productosData.length + 1,
            nombre,
            precio,
            tope,
            proveedor,
            categoria,
            imagen
        };

        setProductosData((prev) => [...prev, nuevoProducto]);

        //Logica para el back, esperar al negro

        toast.success("¡Producto guardado exitosamente!");

        // Reset
        setdatosForm({
            nombre: "",
            precio: "",
            tope: "",
            proveedor: "",
            categoria: ""
        });
        setError("");
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
        setdatosForm({
            nombre: "",
            precio: "",
            proveedor: "",
            categoria: "",
        });
        setError("");
    };

    // Logica para el modal de eliminar

    const [showModalEliminar, setShowModalEliminar] = useState(false);

    const abrirModalEliminar = () => {
        const Seleccionados = productosData.filter(p => seleccionados.includes(p.id));
        if (Seleccionados.length === 0) {
            toast.warning("No hay ningun producto seleccionado");
        return;
        } else {
            setShowModalEliminar(true);
        }
    };

    const cerrarModalEliminar = () => {
        setShowModalEliminar(false);
    };

  // Logica para la edicion del producto

    const [seleccionados, setSeleccionados] = useState([]);

    const [edicion, setEdicion] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);
    const [datosEditados, setDatosEditados] = useState({});

    const verEdicion = () => {
        const Seleccionados = productosData.filter(p => seleccionados.includes(p.id));

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
    };

    const ocultarEdicion = () => {
        setEdicion(false);
    };

    const Editar = (producto) => {
        setProductoEditando(producto.id);
        setDatosEditados({ ...producto });
    };

    const CancelarEdicion = () => {
        setProductoEditando(null);
        setDatosEditados({});
        ocultarEdicion();
        toast.info("Cancelado con exito!");
    };

    const GuardarEdicion = () => {
        setProductosData((productosActuales) =>
            productosActuales.map((prod) =>
            prod.id === productoEditando ? datosEditados : prod
        )
        );
        setProductoEditando(null);
        setDatosEditados({});
        ocultarEdicion();
        toast.success("Guardado con exito!");
    };

    const handleChangeEdicion = (e) => {
        const { name, value } = e.target;
        setDatosEditados((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  // /////////////////////////////////////////////////////////////////////////////////////////////////////

    if (cargando) {
        return (
            <div className="modal-cargando">
                <div className="modal-contenido-c">
                    <div class='loader'></div>
                </div>
            </div>
        );
    }

  // /////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <section className="inventario">
                <h1>INVENTARIO</h1>
                <div id="cont">
                    <div className="buscador">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-search"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                            <path d="M21 21l-6 -6" />
                        </svg>
                        <input type="text" />
                    </div>
                    <div id="cont-select">
                        <select
                            id="select"
                            value={categoriaSeleccionada}
                            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        >
                            <option value="">Todas</option>
                            <option value="Ropa">Ropa</option>
                            <option value="licor">Licor</option>
                            <option value="aseo">Aseo</option>
                            <option value="mekato">Mekato</option>
                        </select>
                    </div>
                    <Button variant="rojo" onClick={abrirModalEliminar}>
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
                            className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 7l16 0" />
                            <path d="M10 11l0 6" />
                            <path d="M14 11l0 6" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                        Eliminar
                    </Button>
                    <Button variant="azul" onClick={verEdicion}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                            <path d="M16 5l3 3" />
                        </svg>
                        Editar
                    </Button>
                    <Button variant="verde" onClick={abrirModalAgregar}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-plus"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                            <path d="M15 12h-6" />
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
                                <th>Categoría</th>
                                <th>Precio Unitario</th>
                                <th>Proveedor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(categoriaSeleccionada
                                ? productosData.filter((p) => p.categoria === categoriaSeleccionada)
                                : productosData
                                ).map((producto) => 
                                    <tr key={producto.id}>
                                        <td>
                                            <input 
                                                type="checkbox" 
                                                checked={seleccionados.includes(producto.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSeleccionados([...seleccionados, producto.id]);
                                                    } else {
                                                        setSeleccionados(seleccionados.filter(id => id !== producto.id));
                                                    }
                                                }}
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
                                                        type="text"
                                                        name="categoria"
                                                        value={datosEditados.categoria}
                                                        onChange={handleChangeEdicion}
                                                    />
                                                ) 
                                                : 
                                                (producto.categoria.nombre)
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
                                                        value={datosEditados.proveedor.nombre}
                                                        onChange={handleChangeEdicion}
                                                    />
                                                ) 
                                                : 
                                                (producto.proveedor.nombre)
                                            }
                                        </td>
                                    </tr>
                                )
                            }                           
                        </tbody>
                    </table>
                </div>

                {edicion && (
                    <div id="botoness-edicion">
                        <Button variant="verde" onClick={GuardarEdicion}> Guardar </Button>
                        <Button variant="rojo" onClick={CancelarEdicion}> Cancelar </Button>
                    </div>
                )}

                {/* Modal de agregar producto */}
                {showModalAgregar && (
                    <div className="modal" onClick={cerrarModalAgregar}>
                        <div className="modal-contenedor" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-contenido">
                                <div className="image-upload" id="previewContainer"
                                    style={{
                                        backgroundImage: imagen ? `url(${imagen})` : "none",
                                        backgroundSize: imagen ? "100% 100%" : "cover",
                                    }}
                                >
                                    {!imagen && (
                                        <label htmlFor="imagenProducto" id="labelTexto">
                                        + Agregar imagen del producto.
                                        </label>
                                    )}
                                    <input
                                        type="file"
                                        id="imagenProducto"
                                        accept="image/*"
                                        ref={inputRef}
                                        onChange={handleImageChange}
                                        style={{ display: "none" }}
                                    />
                                </div>

                                <form className="formulario" onSubmit={handleSubmit}>

                                    <div className="bloque">
                                        <label>Nombre</label>
                                        <input
                                            type="text"
                                            placeholder="Nombre del producto"
                                            name="nombre"
                                            value={datosForm.nombre}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="bloque">
                                        <label>Precio Unitario</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="Precio"
                                            name="precio"
                                            value={datosForm.precio}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="bloque">
                                        <label>Tope minimo</label>
                                        <input
                                            type="number"
                                            placeholder="Cantidad minima"
                                            name="tope"
                                            value={datosForm.tope}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="bloque">
                                        <label>Proveedor</label>
                                        <div id="cont-select-form">
                                            <select
                                                id="select-form"
                                                name="proveedor"
                                                value={datosForm.proveedor.nom}
                                                onChange={handleChange}
                                            >
                                                { proveedoresData.map ((provedor) => (
                                                    <option key={provedor.id} value={provedor.id}>
                                                        {provedor.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="bloque">
                                        <label>Categoría</label>
                                        <div id="cont-select-form2">
                                            <select
                                                id="select-form"
                                                name="categoria"
                                               
                                                onChange={handleChange}
                                            >
                                                { categoriaData.map ((categoria) => (
                                                    <option key={categoria.id} value={categoria.id}>
                                                        {categoria.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {error && <p className="error">{error}</p>}

                                    <div className="botones">
                                        <Button type="submit" variant="verde" className="btn"> Guardar </Button>
                                        <Button variant="rojo" onClick={cerrarModalAgregar} className="btn"> Cancelar</Button>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {showModalEliminar && (
                    <div className="modal" onClick={cerrarModalEliminar}>
                        <div className="modal-contenedor-eliminar" onClick={(e) => e.stopPropagation()}>
                            <h2> ¿Está completamente seguro que desea eliminar el/los productos? </h2>
                            <div id="botoness">
                                <Button variant="verde" onClick={eliminarProdSelec}> Aceptar </Button>
                                <Button variant="rojo" onClick={cerrarModalEliminar}> Cancelar </Button>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <ToastContainer position="top-center" autoClose={3000} />
        </>
    );
};

export default Inventario;
