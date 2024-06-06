import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actualizarUsuario } from '../../redux/actions';
import swal from 'sweetalert';
import { FaHome } from 'react-icons/fa';
import usuarioImg from '../../images/usuario.png';
import { Cloudinary } from 'cloudinary-core';

const cloudName = "deacm87l9";
const uploadPreset = "ay7uc3m7";

const cloudinary = new Cloudinary({ cloud_name: cloudName, secure: true });

const Edit = ({ usuario }) => {
  const [input, setInput] = useState({ nombre: '', apellido: '', celular: '', imagen: '' });
  const dispatch = useDispatch();

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary.config().cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.secure_url;
  };

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const imageUrl = await uploadImageToCloudinary(imageFile);
      setInput((prevInput) => ({
        ...prevInput,
        imagen: imageUrl,
      }));
    }
  };

  const handleChange = (e) => {
    setInput((prevInput) => ({ ...prevInput, [e.target.name]: e.target.value }));
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
      setInput({ nombre: usuario.nombre, apellido: usuario.apellido, celular: usuario.celular, imagen: usuario.imagen || '' });
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
          <img src={input.imagen || usuarioImg} alt="Perfil" className="img-fluid rounded-circle" />
        </div>
        <div className="col-md-8">
          <form>
            <div className="form-group mb-3">
              <input
                type="text"
                name="nombre"
                value={input.nombre}
                onChange={handleChange}
                placeholder="Editar nombre"
                className="form-control form-control-md w-50"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                name="apellido"
                value={input.apellido}
                onChange={handleChange}
                placeholder="Editar apellido"
                className="form-control form-control-md w-50"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="phone"
                name="celular"
                value={input.celular}
                onChange={handleChange}
                placeholder="Editar celular"
                className="form-control form-control-md w-50"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="file"
                name="imagen"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                className="form-control form-control-md w-50"
              />
            </div>
          </form>
          <button className="btn btn-dark" onClick={handleSubmit}>
            Editar usuario
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
