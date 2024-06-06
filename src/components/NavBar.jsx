import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { isAuthenticated , buscarProducto } from '../redux/actions';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import UserContext from './UserContent';

import { FaSearch } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";

import style from '../styles/NavBar.module.css';



const NavBar = () => {

  const [input, setInput] = useState('');
  const [usuarioActual, setUsuarioActual] = useState(UserContext);
  const [buscar, setBuscar] = useState(false);
  const dispatch = useDispatch();
  const usuario = isAuthenticated();

  const cerrarSesion = () => {
    localStorage.removeItem('user');
    setUsuarioActual({});
    localStorage.clear();
    window.location.reload();
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(buscarProducto(input));
  }

  return (
    <>
        <Navbar className="bg-body-tertiary p-0">
            <Container className='mt-0'>
              <Navbar.Brand href="/">
                <img src="./logo1.png" width="37" height="37" className="d-inline-block align-top" alt="Logo Fashion B"/>
              </Navbar.Brand>
              <Nav className={style.contenedorNavbar}>
                <Link to='/favorites'>
                  <MdOutlineFavoriteBorder className={style.fav}/>
                </Link>

                <Link to='/cart' className={style.cart}>
                  <FaOpencart />
                </Link>
               
                {
                  buscar &&
                  <form onSubmit={handleSubmit}>
                    <input className={style.inputSearch} type="text" value={input} placeholder='Buscar Producto' onChange={handleChange} />
                  </form>
                }
                <FaSearch className={style.icon} onClick={() => buscar ? setBuscar(false) : setBuscar(true)}/>

                {
                  usuario.usuario && usuario.usuario.is_admin &&
                  <Link to={`/panel/admin/${usuario.usuario.id}`}>
                      <MdOutlineAdminPanelSettings to="/panel/admin/:id"  className={style.panelAdmin}/>
                  </Link>
                }
                
                {
                  usuario.token ?
                  <>
                    <Nav.Link href={`panel/user/${usuario.usuario.id}`}>
                      <p className={style.parrafoNombre}> {usuario.usuario.nombre} {usuario.usuario.apellido} </p>
                    </Nav.Link>
                    <p className={style.parrafo} onClick={cerrarSesion}><MdOutlineLogout /></p>
                  </>
                  :
                  <Nav.Link href='/login'>
                      <p className={style.login}><MdAccountCircle/></p>
                  </Nav.Link>
                }
              </Nav>
            </Container>
        </Navbar>
    </>
  )
}

export default NavBar