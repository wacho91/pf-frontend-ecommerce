import { FaHome } from "react-icons/fa";
import usuarioImg from '../../images/usuario.png';
import { Link } from "react-router-dom";

const Home = ({ usuario }) => {
  const { nombre, apellido, imagen, email, celular } = usuario || {};

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <Link to="/" className="text-decoration-none">
            <FaHome className='icon mt-4' style={{ fontSize: '24px', color: 'black' }} />
          </Link>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img
            src={imagen || usuarioImg}
            alt="profile"
            className="img-fluid rounded-circle my-2"
            style={{ width: '400px', height: '400px' }}
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h1 className="text-center me-5">
            ¡Hola, {`${nombre || ''} ${apellido || ''}`}!
          </h1>
          <div className="text-center">
            <p className="mb-1 me-5">
              Correo electrónico: <span>{email || 'No especificado'}</span>
            </p>
            <p className='me-5'>
              Celular: <span>{celular || 'No especificado'}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;