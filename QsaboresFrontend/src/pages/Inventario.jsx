import "../styles/Inventario.css"
import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "../components/Button";
import Buscador from "../components/buscador";


const Inventario = () => {

    {/* Logica para verificar los cambios del formulario */}

    const [datosForm, setdatosForm] = useState({
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

        

        toast.success("¡Producto guardado exitosamente!");
    
        console.log("Formulario válido, se puede enviar:", datosForm);
    
        // Reset
        setdatosForm({ nombre: '', cantidad: '', precio: '', proveedor: '', categoria: '' });
        setError('');
        cerrarModalAgregar();
    };

    {/* Logica para el cambio de imagen */}

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

    {/* Logica para el modal de agregar */}

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

    {/* ///////////////////////////////////////////////////////////////////////////////////////////////////// */}

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
                        <select id="select">
                            <option value="value1">Value 1</option>
                            <option value="value2">Value 2</option>
                            <option value="value3">Value 3</option>
                        </select>
                    </div>
                    <Button variant="rojo">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  
                            fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
                            class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" 
                            fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                        Eliminar
                    </Button>
                    <Button variant="azul">
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
                    <table class="tabla">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Proveedor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>BonBonBun</td>
                                <td>x3</td>
                                <td>300$</td>
                                <td>Colombina</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>Chocorramo</td>
                                <td>x12</td>
                                <td>3500$</td>
                                <td>Ramo</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>Pilsen</td>
                                <td>x30</td>
                                <td>4000$</td>
                                <td>Bavaria</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>Arepas</td>
                                <td>x23</td>
                                <td>2000$</td>
                                <td>Sonsonéa</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>DeTodito</td>
                                <td>x25</td>
                                <td>3000$</td>
                                <td>FritoLay</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                {/* Modal de agregar producto */}
                {showModalAgregar && (
                    <div className="modal" onClick={cerrarModalAgregar}>
                        <div className="modal-contenedor" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-contenido">
                            <div class="image-upload" id="previewContainer" style={{backgroundImage: imagen ? `url(${imagen})` : 'none', backgroundSize: imagen ? '100% 100%' : 'cover', }} >
                                {!imagen && (
                                    <label htmlFor="imagenProducto" id="labelTexto">
                                        + Agregar imagen del producto.
                                    </label>
                                )}
                                <input type="file" id="imagenProducto" accept="image/*" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                            </div>
                                <form class="formulario" onSubmit={handleSubmit}>

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
                                                <option value="value1">Value 1</option>
                                                <option value="value2">Value 2</option>
                                                <option value="value3">Value 3</option>
                                            </select>
                                        </div>
                                        
                                    </div>

                                    {error && <p className="error">{error}</p>}

                                    <div class="botones">
                                        <Button type="submit" variant="verde" class="btn">Guardar</Button>
                                        <Button variant="rojo" onClick={cerrarModalAgregar} class="btn">Cancelar</Button>
                                    </div>
                                </form>
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