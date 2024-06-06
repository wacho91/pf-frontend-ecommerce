import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IoArrowBackCircle } from "react-icons/io5";

import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


import { login } from '../redux/actions';
import { useState } from 'react';

import style from '../styles/Login.module.css';

const Login = () => {

  const [input, setInput] = useState({
    email: '',
    contraseña: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(input.email, input.contraseña);
      navigate('/')
      setInput({
        email: '',
        contraseña: ''
      })
    } catch (error) {
      Swal({
        title: 'Error',
        text: 'Usuario o contraseña incorrectos',
        icon: 'error',
        button: 'OK'
      })
    }
  }

  return (
    <>
      <Container>
      <Row className='mt-2'>
        <Col xs={6} className='mt-5'>
          <div className={style.back2}><Link to='/' className={style.back}> <IoArrowBackCircle className={style.back2} /></Link></div>
          <h4 className={style.titulo}>Iniciar Sesión</h4>
          <form onSubmit={handleSubmit}>
            <label className={style.label0}>Email:</label>
            <input  className={style.input0} type="email" name="email" value={input.email} placeholder='Ingrese su correo electrónico' onChange={handleChange} />
            <label className={style.label1}>Contraseña:</label>
            <input className={style.input1}  type="password" name="contraseña" value={input.contraseña} placeholder='Ingrese su contraseña' onChange={handleChange} />
            <button className={style.loginBtn}>Ingresar</button>
          </form>
          <p className={style.parrafo}>¿No tienes cuneta? Registrate ingresando aqui <Link to='/register' className={style.link}> Aquí</Link></p>
        </Col>
        <Col xs={6} className='mt-5'>
          <img src="../../../public/logo1.png" alt="login"  className={style.image}/>
        </Col>
      </Row>
      </Container>
    </>
  )
}

export default Login