import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FaUser, FaBox, FaClipboardList, FaTags, FaSignOutAlt } from 'react-icons/fa'; // Importa el icono de cierre de sesión
import Categories from './Categories';
import Orders from './Orders';
import Products from './Products';
import Users from './Users';

import { isAuthenticated } from '../../redux/actions';
import { FaArrowCircleLeft } from "react-icons/fa";

import "../../styles/AdminPanel.css";


const AdminPanel = () => {
  const [valor, setValor] = useState('usuarios');
  const usuario = isAuthenticated();

  const cerrarSesion = () => {
    localStorage.removeItem('user');
    window.location.href = '/'; // Redirecciona al home
  };

  const menuItems = [
    { key: 'usuarios', label: 'Usuarios', icon: <FaUser /> },
    { key: 'productos', label: 'Productos', icon: <FaBox /> },
    { key: 'ordenes', label: 'Órdenes', icon: <FaClipboardList /> },
    { key: 'categorias', label: 'Categorías', icon: <FaTags /> },
  ];

  return (
    <Container fluid className="bg-white min-vh-100">
      <Row className="p-3">
        <Col>
          <Link to="/" className="text-dark text-decoration-none">
            <FaArrowCircleLeft className='arrow'/>
          </Link>
        </Col>
      </Row>
      <Row className="min-vh-100">
        <Col md={3} className="bg-white p-3 border-end">
          {usuario.usuario && usuario.usuario.is_admin && (
            <h2 className="text-center mt-3">Panel de Administración</h2>
          )}
          <ListGroup variant="flush" className="h-100">
            {menuItems.map((item) => (
              <ListGroup.Item
                key={item.key}
                action
                onClick={() => setValor(item.key)}
                className={`d-flex align-items-center border-0 p-2 ${
                  valor === item.key ? 'active' : ''
                } hide-text`}
                style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e9ecef')}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = valor === item.key ? '#495057' : 'transparent')
                }
              >
                <span className="me-2 fs-4">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={9} className="p-3 bg-white">
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-dark d-flex align-items-center" onClick={cerrarSesion}>
              <FaSignOutAlt className="me-2" /> Cerrar Sesión
            </button>
          </div>
          <div className="p-3 rounded">
            {valor === 'usuarios' && <Users />}
            {valor === 'productos' && <Products />}
            {valor === 'ordenes' && <Orders />}
            {valor === 'categorias' && <Categories />}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
