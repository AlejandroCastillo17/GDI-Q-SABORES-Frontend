import React from 'react';
import Button from '../components/button';
import '../styles/proveedores.css';

const Proveedores = () => {
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
                        <input type="text" />
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
                    <Button variant="verde">
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
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>Colombina</td>
                                <td>23456789</td>
                                <td>colombina@gmial.com$</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>Colombina</td>
                                <td>23456789</td>
                                <td>colombina@gmial.com$</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>Colombina</td>
                                <td>23456789</td>
                                <td>colombina@gmial.com$</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>Colombina</td>
                                <td>23456789</td>
                                <td>colombina@gmial.com$</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>Colombina</td>
                                <td>23456789</td>
                                <td>colombina@gmial.com$</td>
                            </tr>
                            
                            
                        </tbody>
                    </table>
                </div>
            </section>
        </>
  );
}

export default Proveedores;