// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { actualizarUsuario } from '../../redux/actions';
// import swal from 'sweetalert';
// import { FaArrowLeft } from 'react-icons/fa';
// import style from '../../styles/PanelGeneralUser.module.css';
// import usuarioImg from '../../images/usuario.png';

// const Edit = ({ usuario }) => {
//   const [input, setInput] = useState({
//     nombre: '',
//     apellido: '',
//     celular: '',
//     imagen: ''
//   });
//   const dispatch = useDispatch();

//   const convertirBase64 = (imagenes) => {
//     const promesas = Array.from(imagenes).map(archivo =>
//       new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(archivo);
//         reader.onload = () => {
//           let arrayAuxiliar = [];
//           let base64 = reader.result;
//           arrayAuxiliar = base64.split(',');
//           resolve(arrayAuxiliar[1]);
//         };
//         reader.onerror = error => reject(error);
//       })
//     );

//     Promise.all(promesas)
//       .then(resultados => {
//         setInput({
//           ...input,
//           imagen: resultados.join(',') // Unir todos los resultados en un solo string base64
//         });
//       })
//       .catch(error => console.error('Error al convertir imágenes:', error));
//   };

//   const handleChange = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     dispatch(actualizarUsuario(usuario.id, input));
//     swal("Usuario editado correctamente", {
//       icon: "success",
//     });
//     setTimeout(() => {
//       window.location.reload();
//     }, 3000);
//   };

//   useEffect(() => {
//     if (usuario) {
//       setInput({
//         nombre: usuario.nombre,
//         apellido: usuario.apellido,
//         celular: usuario.celular,
//         imagen: ''
//       });
//     }
//   }, [usuario]);

//   return (
//     <div>
//       <Link to="/" className="text-decoration-none">
//             <FaArrowLeft className='icon mt-4 mml-3rem' style={{ fontSize: '24px', color: 'black', }} />
//           </Link>
//       <div className={style.principal}>
//         <h1>Editar usuario</h1>
//       </div>
//       <div className={style.row}>
//         <div className={style.contenedorImagen2}><img src={usuario.imagen ? usuario.imagen : usuarioImg} alt='Perfil' /></div>
//         <div className={style.contenedorForm}>
//           <div className={style.margenForm}>
//             <form className={style.form} onChange={handleChange}>
//               <input type='text' name='nombre' defaultValue={input.nombre} placeholder='Editar nombre' className={style.inputStyle} />
//               <input type='text' name='apellido' defaultValue={input.apellido} placeholder='Editar apellido' className={style.inputStyle} />
//               <input type='phone' name='celular' defaultValue={input.celular} placeholder='Editar celular' className={style.inputStyle} />
//               <input type='file' name='imagen' accept="image/png, image/jpeg" onChange={e => convertirBase64(e.target.files)} className={style.inputStyle} />
//             </form>
//           </div>
//           <button className={style.button} onClick={() => handleSubmit()}>Editar usuario</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Edit;


import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actualizarUsuario } from '../../redux/actions';
import swal from 'sweetalert';
import { FaHome } from 'react-icons/fa';
import usuarioImg from '../../images/usuario.png';

const Edit = ({ usuario }) => {
  const [input, setInput] = useState({ nombre: '', apellido: '', celular: '', imagen: '' });
  const dispatch = useDispatch();

  const convertirBase64 = (imagenes) => {
    const promesas = Array.from(imagenes).map(archivo =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(archivo);
        reader.onload = () => {
          let arrayAuxiliar = [];
          let base64 = reader.result;
          arrayAuxiliar = base64.split(',');
          resolve(arrayAuxiliar[1]);
        };
        reader.onerror = error => reject(error);
      })
    );

    Promise.all(promesas)
      .then(resultados => {
        setInput({
          ...input,
          imagen: resultados.join(',') // Unir todos los resultados en un solo string base64
        });
      })
      .catch(error => console.error('Error al convertir imágenes:', error));
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(actualizarUsuario(usuario.id, input));
    swal("Usuario editado correctamente", { icon: "success" });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  useEffect(() => {
    if (usuario) {
      setInput({ nombre: usuario.nombre, apellido: usuario.apellido, celular: usuario.celular, imagen: '' });
    }
  }, [usuario]);

  return (
    <div className="container">
      <Link to="/" className="text-decoration-none d-flex justify-content-start">
        <FaHome className="mt-4 ms-3" style={{ fontSize: '24px', color: 'black' }} />
      </Link>
      <div className="d-flex justify-content-center">
        <h1>Editar usuario</h1>
      </div>
      <div className="row">
        <div className="col-md-4">
          <img src={usuario.imagen ? usuario.imagen : usuarioImg} alt="Perfil" className="img-fluid rounded-circle" />
        </div>
        <div className="col-md-8">
          <form onChange={handleChange}>
            <div className="form-group mb-3">
              <input
                type="text"
                name="nombre"
                defaultValue={input.nombre}
                placeholder="Editar nombre"
                className="form-control form-control-md w-50"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                name="apellido"
                defaultValue={input.apellido}
                placeholder="Editar apellido"
                className="form-control form-control-md w-50"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="phone"
                name="celular"
                defaultValue={input.celular}
                placeholder="Editar celular"
                className="form-control form-control-md w-50"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="file"
                name="imagen"
                accept="image/png, image/jpeg"
                onChange={(e) => convertirBase64(e.target.files)}
                className="form-control form-control-md w-50"
              />
            </div>
            <div className="form-group mb-3">
              <button className="btn btn-dark" type="button">Seleccionar archivo</button>
            </div>
          </form>
          <button className="btn btn-dark" onClick={() => handleSubmit()}>
            Editar usuario
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;