import "../styles/Sidebar.css"
import { Navigate, useNavigate } from 'react-router-dom';
import logo from "../assets/qsaboreslogo.png"
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const navigate = useNavigate();

    const CerrarSesion = () => {
        navigate('/Login');
    };

    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <img src={logo} alt="Q'Sabores Logo" />
                    <li>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="40"  height="40"  viewBox="0 0 24 24"
                            fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"
                            stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-report-analytics">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                            <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                            <path d="M9 17v-5" /><path d="M12 17v-1" /><path d="M15 17v-3" />
                        </svg>
                        <Link className="link" to="/">HOME</Link>
                    </li>
                    <li>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="40"  height="40"  viewBox="0 0 24 24"
                            fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"
                            stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-report-analytics">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                            <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                            <path d="M9 17v-5" /><path d="M12 17v-1" /><path d="M15 17v-3" />
                        </svg>
                        <Link className="link" to="/inventario">INVENTARIO</Link>
                    </li>
                    <li>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="40"  height="40"  viewBox="0 0 24 24"  
                            fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  
                            stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-receipt-dollar">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2" />
                            <path d="M14.8 8a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1" />
                            <path d="M12 6v10" />
                        </svg>
                        <Link className="link" to="/informes">INFORMES</Link>
                    </li>
                    <li>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="40"  height="40"  viewBox="0 0 24 24"  
                            fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-coin">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 
                            -1 1a3 3 0 1 0 0 6v2a1.024 1.024 0 0 1 -.866 -.398l-.068 -.101a1 1 0 0 0 -1.732 .998a3 3 0 0 0
                            2.505 1.5h.161a1 1 0 0 0 .883 .994l.117 .007a1 1 0 0 0 1 -1l.176 -.005a3 3 0 0 0 -.176 
                            -5.995v-2c.358 -.012 .671 .14 .866 .398l.068 .101a1 1 0 0 0 1.732 -.998a3 3 0 0 0 -2.505 
                            -1.501h-.161a1 1 0 0 0 -1 -1zm1 7a1 1 0 0 1 0 2v-2zm-2 -4v2a1 1 0 0 1 0 -2z" />
                        </svg>
                        <Link className="link" to="/egresos">EGRESOS</Link>
                    </li>
                    <li>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="40"  height="40"  viewBox="0 0 24 24"  
                            fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  
                            stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-box">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
                            <path d="M12 12l8 -4.5" /><path d="M12 12l0 9" /><path d="M12 12l-8 -4.5" />
                        </svg>
                        <Link className="link" to="/proveedores">PROVEEDORES</Link>
                    </li>
                </ul>
            </nav>
            <br />
            <br />
            <button className="logout" onClick={CerrarSesion}>
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  
                    stroke="#338936"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-logout-2">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                    <path d="M15 12h-12l3 -3" /><path d="M6 15l-3 -3" />
                </svg>
                Cerrar Sesion
            </button>
        </div>
    )
};

export default Sidebar;