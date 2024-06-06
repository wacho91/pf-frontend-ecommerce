import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerUsuarios, eliminarUsuario, buscarUsuario, actualizarUsuario, buscarUsuariosPorNombre } from '../../redux/actions';
import { isAuthenticated } from '../../redux/actions';
import Modal from '../Modal';
import swal from 'sweetalert';
import Loading from '../Loading';

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import "../../styles/Users.css";

const Users = () => {
  const adminLogueado = isAuthenticated();
  const dispatch = useDispatch();
  const usuarios = useSelector(state => state.usuarios);
  const usuario = useSelector(state => state.usuario);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({
    nombre: '',
    apellido: '',
    email: '',
    celular: '',
    is_admin: false
  });
  const [loader, setLoader] = useState(true);

  const borrarUsuario = (id) => {
    swal({
      title: "¿Estás seguro que deseas eliminar este usuario?",
      text: "Una vez eliminado, la cuenta dejará de existir",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(eliminarUsuario(id));
          swal("Usuario eliminado correctamente", {
            icon: "success",
          });
        } else {
          swal("Se ha cancelado la eliminación");
        }
      });
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleClick = (id) => {
    setIsOpen(true);
    dispatch(buscarUsuario(id));
  };

  const handleSubmit = () => {
    dispatch(actualizarUsuario(usuario.id, input));
    swal("Usuario actualizado correctamente", {
      icon: "success",
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleChangeNombre = (e) => {
    setNombreUsuario(e.target.value)
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    dispatch(buscarUsuariosPorNombre(nombreUsuario));
  };

  useEffect(() => {
    dispatch(obtenerUsuarios()).then(setLoader(false));
  }, [dispatch]);

  useEffect(() => {
    if (usuario) {
      setInput({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        celular: usuario.celular,
        is_admin: usuario.is_admin
      });
    }
  }, [usuario]);

  if (loader) {
    return <Loading />
  }

  else {
    return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-secondary" onClick={() => dispatch(obtenerUsuarios())}>Todos</button>
        <div>
          <form onSubmit={handleSubmitSearch} className="d-flex">
            <input type='text' placeholder='Buscar usuario' onChange={handleChangeNombre} className="form-control" />
            <button className="btn btn-secondary" type="submit" disabled={!nombreUsuario.length}>
              Buscar
            </button>
          </form>
        </div>
      </div>
      {usuarios.length ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className='table-dark'>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Celular</th>
                <th>Admin</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.sort((a, b) => a.id - b.id).map((usuario, index) => (
                <tr key={index}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.celular}</td>
                  <td>{`${usuario.is_admin}`}</td>
                  <td>
                    <button className="btn" onClick={() => handleClick(usuario.id)}>
                      <FaEdit />
                    </button>
                    <button className="btn" onClick={() => borrarUsuario(usuario.id)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center">
          <p>No existen usuarios registrados</p>
        </div>
      )}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} tituloModal="Usuario" despachar={handleSubmit}>
        <h2 className="mb-4">Editar usuario</h2>
        <form>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type='text' name='nombre' defaultValue={input.nombre} placeholder='Editar el nombre' className="form-control" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input type='text' name='apellido' defaultValue={input.apellido} placeholder='Editar el apellido' className="form-control" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type='email' name='email' defaultValue={input.email} placeholder='Editar el email' className="form-control" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="celular">Celular</label>
            <input type='number' name='celular' defaultValue={input.celular} placeholder='Editar el celular' className="form-control" onChange={handleChange} />
          </div>
          {adminLogueado.usuario.id === 1 && (
            <div className="form-group">
              <label htmlFor="is_admin">Admin</label>
              <select name='is_admin' className="form-control" onChange={handleChange}>
                <option hidden>{usuario.is_admin && usuario.is_admin.toString()}</option>
                <option value={false}>false</option>
                <option value={true}>true</option>
              </select>
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
}
};

export default Users;