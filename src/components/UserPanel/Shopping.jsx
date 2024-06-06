import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Importar el icono de Home
import { buscarOrdenesUsuario, crearComentario, comentariosDeUsuario, vaciarComentariosDeUsuario } from "../../redux/actions";
import swal from "sweetalert";

const Shopping = ({ usuario }) => {
    const ordenUsuario = useSelector(state => state.ordenUsuario);
    const comentariosUsuario = useSelector(state => state.comentariosUsuario);
    const [comentario, setComentario] = useState('');
    const [comento, setComento] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (usuario?.id) {
            dispatch(buscarOrdenesUsuario(usuario.id));
            dispatch(comentariosDeUsuario(usuario.id));
        }

        return () => {
            dispatch(vaciarComentariosDeUsuario());
        };
    }, [dispatch, usuario?.id]);

    useEffect(() => {
        if (comento) {
            dispatch(comentariosDeUsuario(usuario.id));
            setComento(false);
        }
    }, [comento, dispatch, usuario.id]);

    const handleChange = (e) => {
        setComentario(e.target.value);
    };

    const handleSubmit = (id) => {
        const comentarioExistente = comentariosUsuario.find(e => e.ProductoId === id);
        if (!comentarioExistente) {
            dispatch(crearComentario({ descripcion: comentario, id, usuarioId: usuario.id }));
            setComentario('');
            setComento(id);
        } else {
            swal("Error", "Sólo puedes dejar un comentario por producto", "error");
            setComentario('');
        }
    };

    return (
        <div>
            <Link to='/' className="d-flex align-items-center mb-3" style={{ textDecoration: 'none' }}>
                <FaHome className="me-2" style={{ fontSize: '24px', color: 'black' }} />
            </Link>
            <div className="container">
                {ordenUsuario.length ? ordenUsuario.map((orden, index) => {
                    const fechaFormateada = orden.fecha.split("-").join("/").slice(0, 10) + " " + orden.fecha.slice(11, 19);

                    return (
                        <div key={index} className="d-flex border mb-3 p-3" style={{ backgroundColor: 'white', borderRadius: '8px' }}>
                            <div className="col-6 d-flex flex-column align-items-center justify-content-center text-center">
                                <p style={{ color: 'black' }}>Estado de orden: {orden.estado}</p>
                                <p style={{ color: 'black' }}>Precio final: ${orden.precio_orden}</p>
                                <p style={{ color: 'black' }}>Fecha: {fechaFormateada}</p>
                            </div>
                            <div className="col-6 d-flex">
                                {orden.Productos?.map((producto, index) => (
                                    <div key={index} className="row w-100">
                                        <div className="col-4">
                                            <img src={producto.miniatura} alt='Producto' className="img-fluid" style={{ maxWidth: '100px' }} />
                                            <p style={{ color: 'black' }}>${producto.precio}</p>
                                        </div>
                                        <div className="col-8">
                                            <Link to={`/product/${producto.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                                <h4>{producto.titulo}</h4>
                                            </Link>
                                            {orden.estado === 'finalizada' && (!comentariosUsuario.find(el => el.ProductoId === producto.id) && !(comento === producto.id)) &&
                                                <div>
                                                    <textarea
                                                        placeholder='Deja tu comentario...'
                                                        maxLength={140}
                                                        value={comentario}
                                                        onChange={handleChange}
                                                        style={{ width: '100%', marginBottom: '10px' }}
                                                    />
                                                    <div>
                                                        <button onClick={() => handleSubmit(producto.id)} disabled={comentario.length < 4}>
                                                            Enviar
                                                        </button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }) : (
                    <div className="text-center">
                        <p>No existen órdenes registradas</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shopping;
