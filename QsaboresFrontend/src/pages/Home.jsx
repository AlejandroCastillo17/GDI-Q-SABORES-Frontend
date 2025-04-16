import "../styles/Home.css"
import Buscador from "../components/buscador";
import Button from "../components/Button";
const Home = () => {
    return (
        <>
            <section className="home">
              <h1>Venta</h1>
              <section className="contener-principal">
                <Buscador/>
                
                <section className="principal_Contenido">
                  <h1>aca van los productos</h1>
                </section>

                <section className="principal_valores">
                    <label htmlFor="valorTotal">Total</label>
                    <input type="number" id="total" className="input_valor"/>

                    <label htmlFor="valorPago">Pago</label>
                    <input type="number" id="pago" className="input_valor"/>

                    <label htmlFor="devuelta">Devuelta</label>
                    <input type="number" id="devuelta" className="input_valor"/>
                </section>

                <section className="principal_botones">
                    <Button variant="verde" id="aceptar">Aceptar</Button>
                    <Button variant="rojo" id="cancelar">Cancelar</Button>
                </section>

                
              </section>
            </section>
        </>
    )
};

export default Home;