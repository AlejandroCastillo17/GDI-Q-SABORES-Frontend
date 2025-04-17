import "../styles/Home.css"
import Buscador from "../components/Buscador";
const Home = () => {
    return (
        <>
            <section className="home">
              <h1>Venta</h1>
              <section className="contener-principal">
                <Buscador/>
                <section className="principal_Contenido">
                  
                </section>
              </section>
            </section>
        </>
    )
};

export default Home;