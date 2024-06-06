import { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { detalleDelProducto, obtenerComentarioProducto, vaciarEstados, agregarFavorito, consultaProductoFavorito, eliminarFavorito } from "../redux/actions";
import { CartContext } from "./CartContext";
import { isAuthenticated } from "../redux/actions";
import Loading from './Loading';
import swal from 'sweetalert';

import { FaArrowCircleLeft } from "react-icons/fa";

import "../styles/Detail.css";

const Detail = () => {
  const { addItemToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const detalleProducto = useSelector(state => state.detalleProducto);
  const favorito = useSelector(state => state.favorito);
  const [loaderFavorito, setLoaderFavorito] = useState(false);
  const [esFavorito, setEsFavorito] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usuario = isAuthenticated();
  const { id } = useParams();

  const agregarFavoritos = () => {
    if (usuario.usuario) {
      dispatch(agregarFavorito({ userId: usuario.usuario.id, productId: detalleProducto.id }));
      swal({
        title: "Producto agregado a favoritos",
        icon: "success",
      });
      setEsFavorito(true);
    } else {
      swal({
        title: "No se pudo agregar el producto a favoritos",
        text: "Debes estar registrado para poder agregar este producto",
        icon: "error",
        buttons: ["Cancelar", "Iniciar sesión"],
        dangerMode: true,
      }).then((willLogin) => {
        if (willLogin) {
          navigate('/login');
        }
      });
    }
  };

  const eliminarDeFavorito = () => {
    dispatch(eliminarFavorito(favorito.map(e => e.favoritos_productos.FavoritoId)));
    swal({
      title: "Producto eliminado de favoritos",
      text: "Este producto ya no está en tus favoritos",
      icon: "success",
    });
    setEsFavorito(false);
  };

  const handleAddToCart = () => {
    if (usuario.usuario) {
      addItemToCart(detalleProducto);
    } else {
      swal({
        title: "No estás autenticado",
        text: "Debes iniciar sesión para añadir productos al carrito",
        icon: "warning",
        buttons: ["Cancelar", "Iniciar sesión"],
        dangerMode: true,
      }).then((willLogin) => {
        if (willLogin) {
          navigate('/login');
        }
      });
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        await dispatch(detalleDelProducto(id));
        await dispatch(obtenerComentarioProducto(id));
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();

    return () => {
      dispatch(vaciarEstados());
      setEsFavorito(false);
      setLoaderFavorito(false);
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (usuario.usuario) {
      if (!favorito.length) {
        dispatch(consultaProductoFavorito({ userId: usuario.usuario.id, productoId: id }));
      }
    }
    if (favorito.length) {
      setEsFavorito(true);
      setTimeout(() => setLoaderFavorito(true), 100);
    } else {
      setEsFavorito(false);
      setTimeout(() => setLoaderFavorito(true), 100);
    }
  }, [favorito, esFavorito, dispatch, id, usuario.usuario]);

  useEffect(() => {
    console.log("Detalle del producto:", detalleProducto);
  }, [detalleProducto]);

  if (loading) {
    return <Loading />;
  }

  if (!detalleProducto) {
    return <div>No se encontró el producto</div>;
  }

  return (
    <div className="container mt-4">
      <Link to='/' className="text-decoration-none text-dark">
        <FaArrowCircleLeft className="back" />
      </Link>
      <div className="row" key={detalleProducto.id}>
        <div className="col-md-6">
          <div className="position-relative">
            {loaderFavorito && (
              esFavorito ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="position-absolute top-0 end-0" height="25" onClick={eliminarDeFavorito} style={{ cursor: 'pointer' }}>
                  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="position-absolute top-0 end-0" height="25" onClick={agregarFavoritos} style={{ cursor: 'pointer' }}>
                  <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
                </svg>
              )
            )}
            <img src={detalleProducto.miniatura} alt='not found' className="imagen" />
          </div>
        </div>
        <div className="col-md-6 mt-5">
          <div>
            <i>{detalleProducto.categoria}</i>
            <h1>{detalleProducto.titulo}</h1>
            <p>Disponibles: {detalleProducto.cantidadDisponible}</p>
            <p>Vendidos: {detalleProducto.cantidadVendida}</p>
            <p>Precio: ${detalleProducto.precio}</p>
            <button className="btn btn-dark" onClick={handleAddToCart} disabled={detalleProducto.cantidadDisponible === 0}>
              + Añadir al carrito
            </button>
          </div>
          <div className="mt-4">
            <h4>Envíos y devoluciones</h4>
            <p>Usted será responsable de pagar sus propios costos de envío para devolver su artículo. Los gastos de envío no son reembolsables.</p>
          </div>
        </div>
      </div>
      {/* <div className="mt-4">
        <h3>Comentarios:</h3>
        {comentarios.length ? (
          comentarios.map((comentario, index) => (
            <div key={index} className="d-flex align-items-start mt-3">
              <img src={comentario.Usuario.imagen} alt='miniatura' className="rounded-circle me-3 h-25 image" />
              <div>
                <p className="mb-0"><strong>{comentario.Usuario.nombre} {comentario.Usuario.apellido}</strong></p>
                <p>{comentario.descripcion}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Sin comentarios</p>
        )}
      </div> */}
    </div>
  );
};

export default Detail;
