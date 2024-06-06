import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import swal from 'sweetalert';
import { isAuthenticated } from '../redux/actions';
import Loading from './Loading';
import { FaHome, FaTrashAlt } from 'react-icons/fa';

const CartPage = () => {
    const usuario = isAuthenticated();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { cartItems, addItemToCart2, deleteItemToCart, removeProductsCart, sendMP } = useContext(CartContext);

    const productsLength = cartItems.reduce((total, item) => total + item.amount, 0);
    const total = cartItems.reduce((total, item) => total + item.amount * item.precio, 0);

    useEffect(() => {
        setLoading(false); // Reset loading state if it was set to true previously
    }, [cartItems]);

    const handleCompra = () => {
        if (usuario.usuario) {
            swal({
                title: "¿Quieres continuar con la compra?",
                text: "Una vez confirmada, generaremos el link de pago",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willBuy) => {
                if (willBuy) {
                    setLoading(true);
                    sendMP();
                } else {
                    swal("Cancelaste tu compra", {
                        icon: "error",
                    });
                }
            });
        } else {
            swal("Debes iniciar sesión para poder comprar", {
                icon: "warning",
            });
        navigate('/login');
        }   
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container">
            <div className="d-flex align-items-center mb-4">
                <Link to="/" className="text-decoration-none me-3">
                    <FaHome style={{ fontSize: '24px', color: 'black' }} />
                </Link>
                <h1 className="fw-normal ">Carrito</h1>
            </div>
            {!productsLength ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <div>
                    {cartItems.map((producto, index) => (
                        <div key={index} className="card mb-3">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <img src={producto.miniatura} alt={producto.titulo} className="me-3" style={{ maxWidth: '80px' }} />
                                        <h5 className="mb-0">{producto.titulo}</h5>
                                    </div>
                                    <button
                                        className="btn btn-dark btn-sm"
                                        title='Eliminar producto'
                                        onClick={() => removeProductsCart(producto)}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div className="btn-group">
                                        <button className="btn btn-outline-secondary btn-sm" onClick={() => deleteItemToCart(producto)}>-</button>
                                        <span className="mx-2">{producto.amount}</span>
                                        <button className="btn btn-outline-secondary btn-sm" onClick={() => addItemToCart2(producto)}>+</button>
                                    </div>
                                    <span>${producto.precio * producto.amount}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="d-flex justify-content-between align-items-center mt-4">
                <h5 className="mb-0">Total:</h5>
                <h5 className="mb-0">${total},00</h5>
            </div>
            <div className="d-grid mt-3">
                <button
                    className="btn btn-dark"
                    onClick={handleCompra}
                    disabled={total === 0}
                >
                    Comprar
                </button>
            </div>
        </div>
    );
};

export default CartPage;