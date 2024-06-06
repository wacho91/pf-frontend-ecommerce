import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerProductos } from "../redux/actions";

import Carrusel from "./Carrusel";
import FeaturedProducts from "./FeaturedProducts";
import NavBar from "./NavBar";
import Paginated from "./Paginated";
import Loading from "./Loading";
import Card from "./Card";
import Filter from "./Filter";

import style from "../styles/Home.module.css";
import Footer from "./Footer";

const Home = () => {

  const productos = useSelector(state => state.productos);
  const dispatch = useDispatch();
  const [order, setOrder] = useState(1);
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtros, setFiltros] = useState(false);
  const productosPorPagina = 8;
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const recortarProductos = productos.slice(indicePrimerProducto, indiceUltimoProducto);

  const paginado = (numero) => {
    setPaginaActual(numero);
  };


  useEffect(() => {
    !productos.length && dispatch(obtenerProductos());
  }, [dispatch]);

  return (
    <div>
      <NavBar  setPaginaActual={setPaginaActual}  className='mt-0'/>
      <Carrusel autoplay={true} />
      <div className={style.divFiltroPaginadoRangoPrecio}>
        <Filter setPaginaActual={setPaginaActual} />
      </div>
      <div className={style.contenedorCard}>
        {
          productos.length ?
            <Card productos={recortarProductos} setPaginaActual={setPaginaActual} filtros={filtros} /> : <Loading />
        }
      </div>

      <Paginated
          productos={productos.length}
          paginado={paginado}
          paginaActual={paginaActual}
      />
        
      {productos.length &&
        <FeaturedProducts />
      }

      <Footer />
    </div>
  )
}

export default Home