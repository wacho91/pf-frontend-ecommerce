import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState } from 'react';
import Swal from 'sweetalert2';

import { register } from '../redux/actions';
import { Link, useNavigate } from 'react-router-dom';

import style from '../styles/Register.module.css';
import registerImage from '../../public/register.png'; // Importa la imagen

const Register = () => {

    const [input, setInput] = useState({
        nombre: '',
        apellido: '',
        email: '',
        contraseña: '',
        celular: '',
        imagen: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const convertirBase64 = (imagen) => {
        Array.from(imagen).forEach(archivo => {
            let reader = new FileReader();
            reader.readAsDataURL(archivo);
            reader.onload = () => {
                let arrayAuxiliar = [];
                let base64 = reader.result;
                arrayAuxiliar = base64.split(',');
                setInput({
                    ...input,
                    imagen: arrayAuxiliar[1]
                });
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(input.nombre && input.apellido && input.email && input.contraseña)) {
            return Swal.fire({
                title: "Error",
                text: "Debes llenar los campos requeridos para poder registrarte",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }

        try {
            await register(input.nombre, input.apellido, input.email, input.contraseña, input.celular, input.imagen);
            Swal.fire({
                title: '¡Registro completado!',
                text: `Gracias por registrarte ${input.nombre}, te enviaremos a la página para que inicies sesión`,
                icon: "success",
                confirmButtonText: "Ok",
            });
            navigate('/login');
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "El correo que ingresó ya existe, intente nuevamente con otro",
                icon: "error",
                confirmButtonText: "Ok",
            });
        } finally {
            setInput({
                nombre: '',
                apellido: '',
                email: '',
                contraseña: '',
                celular: '',
                imagen: ''
            });
        }
    }

    return (
        <>
            <Container>
                <Row className='mt-5'>
                    <Col xs={6}>
                        <h4 className={style.titulo}>Regístrate</h4>
                        <form onSubmit={handleSubmit}>
                            <label className={style.label0}>Nombre:</label>
                            <input className={style.input0} type="text" name='nombre' value={input.nombre} placeholder='Ingrese su nombre' onChange={handleChange} />
                            <label className={style.label1}>Apellido:</label>
                            <input className={style.input1} type="text" name='apellido' value={input.apellido} placeholder='Ingrese su apellido' onChange={handleChange} />
                            <label className={style.label2}>Email:</label>
                            <input className={style.input2} type="email" name='email' value={input.email} placeholder='Ingrese su correo' onChange={handleChange} />
                            <label className={style.label3}>Contraseña:</label>
                            <input className={style.input3} type="password" name='contraseña' value={input.contraseña} placeholder='Ingrese su contraseña' onChange={handleChange} />
                            <label className={style.label4}>Celular:</label>
                            <input className={style.input4} type="tel" name='celular' value={input.celular} placeholder='Ingrese su celular' onChange={handleChange} />
                            <label className={style.label5}>Imagen:</label>
                            <input className={style.btnImg} type="file" name='imagen' accept="image/png, image/jpeg" onChange={e => convertirBase64(e.target.files)} />
                            <button className={style.registerBtn}>Registrar</button>
                        </form>
                        <p className={style.parrafo}>¿Ya tienes una cuenta? <Link to='/login' className={style.link}>Ingresa aquí</Link></p>
                    </Col>
                    <Col xs={6} className='mt-5'>
                        <img src={registerImage} alt="register" className={style.image} /> {/* Usa la imagen importada */}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Register;
