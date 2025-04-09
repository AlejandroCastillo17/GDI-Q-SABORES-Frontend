import "../styles/Sidebar.css"
import logo from "../assets/qsaboreslogo.png"
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <img src={logo} alt="Q'Sabores Logo" />
                    <li><Link className="link" to="/">HOME</Link></li>
                    <li><Link className="link" to="/inventario">INVENTARIO</Link></li>
                    <li><Link className="link" to="/informes">INFORMES</Link></li>
                    <li><Link className="link" to="/egresos">EGRESOS</Link></li>
                    <li><Link className="link" to="/proveedores">PROVEEDORES</Link></li>
                </ul>
            </nav>
        </div>
    )
};

export default Sidebar;