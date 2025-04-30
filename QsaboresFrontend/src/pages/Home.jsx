import "../styles/Home.css";
import Buscador from "../components/buscador";
import Button from "../components/Button";
import CardP from "../components/cardP";
import Alerta from "../components/AlertaCantidades";

const Home = () => {
  const productos = [
    {
      img: "https://cdn1.totalcommerce.cloud/mercadozapatoca/product-image/es/bon-bon-bum-x1u-1.webp",
      nombre: "bonbonbum",
      precio: 300,
    },
    {
      img: "https://cdn1.totalcommerce.cloud/mercadozapatoca/product-image/es/bon-bon-bum-x1u-1.webp", // ✅ URL directa de imagen (Google no sirve como fuente de imagen directa)
      nombre: "dorito",
      precio: 500,
    },
  ];
  return (
    <section className="home">
      <Alerta />
      <section className="contener-principal">
        <Buscador />

        <section className="principal_Contenido">    
        {productos.map((producto, index) => (
            <CardP
              key={index} 
              img={producto.img}
              nombre={producto.nombre}
              precio={producto.precio}
            />
          ))}
        </section>

        <section className="principal_valores">
          <label htmlFor="valorTotal">Total</label>
          <input type="number" id="valorTotal" className="input_valor" />

          <label htmlFor="valorPago">Pago</label>
          <input type="number" id="valorPago" className="input_valor" />

          <label htmlFor="devuelta">Devuelta</label>
          <input type="number" id="devuelta" className="input_valor" />
        </section>
      </section>

      <section className="principal_botones">
        <Button variant="verde" id="aceptar">
          Aceptar
        </Button>
        <Button variant="rojo" id="cancelar">
          Cancelar
        </Button>
      </section>
    </section>
  );
};

export default Home;
