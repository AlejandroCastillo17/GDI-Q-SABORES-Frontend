import {Outlet} from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import "../styles/Layout.css"


const Layout = () => {
  return (
    <>
      <div id='layout'>
        <Sidebar/>
        <div className='contenido'>
          <Outlet/>
        </div>
      </div>   
    </>
  )
}

export default Layout