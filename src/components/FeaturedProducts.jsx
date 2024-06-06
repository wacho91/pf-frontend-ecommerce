import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { productosMasVendidos } from "../redux/actions";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import izquierda from "../images/svg/flechaizquierda.svg";
import derecha from "../images/svg/flechaderecha.svg";
import '../styles/FeaturedProducts.css';  // CSS personalizado

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const productosDestacados = useSelector(state => state.productosDestacados);
  const [paginaProductos, setPaginaProductos] = useState(1);
  const productosPorSeccion = 4;
  const indiceUltimoProducto = paginaProductos * productosPorSeccion;
  const indicePrimerProducto = indiceUltimoProducto - productosPorSeccion;
  const masVendidos = productosDestacados.slice(indicePrimerProducto, indiceUltimoProducto);

  const paginado = (numeroDePagina) => {
    setPaginaProductos(numeroDePagina);
  };

  useEffect(() => {
    dispatch(productosMasVendidos());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Productos destacados</h2>
      <div className="d-flex justify-content-between mb-4">
        {paginaProductos !== 1 && (
          <img
            className="svgIzq"
            src={izquierda}
            alt="Anterior"
            style={{ cursor: 'pointer' }}
            onClick={() => paginado(paginaProductos - 1)}
          />
        )}
        {paginaProductos !== 6 && (
          <img
            className="svgDer"
            src={derecha}
            alt="Siguiente"
            style={{ cursor: 'pointer' }}
            onClick={() => paginado(paginaProductos + 1)}
          />
        )}
      </div>
      <div className="row justify-content-center">
        {masVendidos.length ? masVendidos.map((destacado, index) => (
          <div key={index} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <Card className="h-100 text-center card-hover">
              <Link to={`/product/${destacado.id}`} className="text-decoration-none text-dark">
                <div className="image-container">
                  <Card.Img variant="top" src={destacado.miniatura} alt="Miniatura" className="card-image" />
                </div>
                <Card.Body>
                  <Card.Title className="card-title">{destacado.titulo}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item className="card-ventas">Ventas: {destacado.cantidadVendida}</ListGroup.Item>
                </ListGroup>
              </Link>
            </Card>
          </div>
        )) : (
          <div className="d-flex justify-content-center w-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="spinner">
              <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="4"></circle>
              <path fill="black" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
