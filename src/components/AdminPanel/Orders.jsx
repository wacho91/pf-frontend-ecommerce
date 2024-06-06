import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerOrdenes, eliminarOrden, obtenerDetalleOrden, actualizarOrden, obtenerOrdenesPorId, filtrosOrdenesPanel } from '../../redux/actions';
import swal from 'sweetalert';
import Modal from '../Modal';
import Loading from '../Loading';

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



const Orders = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(1);
  const [input, setInput] = useState('');
  const [idOrden, setIdOrden] = useState('');
  const [loader, setLoader] = useState(true);

  const ordenes = useSelector(state => state.ordenes);
  const orden = useSelector(state => state.orden);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerOrdenes()).then(() => setLoader(false));
  }, [dispatch]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const borrarOrden = (id) => {
    swal({
      title: "¿Estás seguro que deseas eliminar esta orden?",
      text: "Una vez eliminada, desaparecerá del registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(eliminarOrden(id));
        swal("Orden eliminada correctamente", { icon: "success" });
      } else {
        swal("Se ha cancelado la eliminación");
      }
    });
  };

  const handleChangeFilter = (e) => {
    dispatch(filtrosOrdenesPanel(e.target.value));
    setOrder(e.target.value);
  };

  const handleSubmitId = (e) => {
    e.preventDefault();
    dispatch(obtenerOrdenesPorId(idOrden));
  };

  const handleChangeId = (e) => {
    setIdOrden(e.target.value);
  };

  const handleClick = (payload) => {
    setIsOpen(true);
    dispatch(obtenerDetalleOrden(payload));
  };

  const handleSubmit = () => {
    dispatch(actualizarOrden(orden.id, input));
    swal("Orden actualizada correctamente", { icon: "success" });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  if (loader) {
    <Loading />
  } else {

    return (
        <div className="container mt-5">
        <div className="d-flex justify-content-between mb-3">
            <select className="form-select w-50" onChange={handleChangeFilter}>
            <option hidden>Órdenes</option>
            <option value='todas'>Todas</option>
            <option value='cancelada'>Canceladas</option>
            <option value='pendiente'>Pendientes</option>
            <option value='finalizada'>Finalizadas</option>
            </select>
            <form className="d-flex">
            <input type="text" className="form-control me-2" placeholder="Buscar orden" onChange={handleChangeId} />
            <button className="btn btn-secondary" title="Buscar" disabled={!idOrden.length} onClick={handleSubmitId}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" /></svg>
            </button>
            </form>
        </div>
        {ordenes.length ? (
            <div>
            <table className="table table-striped  table-bordered">
                <thead className="table-dark">
                <tr>
                    <th>Id orden</th>
                    <th>Usuario</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Valor</th>
                    <th>Acción</th>
                </tr>
                </thead>
                <tbody>
                {ordenes.map((orden, index) => {
                    const hora = orden.fecha.split("-").join("/").slice(0, 10);
                    const horaFinal = `${hora} ${orden.fecha.slice(11, 19)}`;
                    return (
                    <tr key={index}>
                        <td>{orden.id}</td>
                        <td>{orden.Usuarios.map(usuario => usuario.email).join(", ")}</td>
                        <td>{orden.estado}</td>
                        <td>{horaFinal}</td>
                        <td>${orden.precio_orden}</td>
                        <td>
                        <FaEdit onClick={() => handleClick(orden.id)} />
                        <MdDelete onClick={() => borrarOrden(orden.id)} />
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} tituloModal="Orden" despachar={handleSubmit}>
                <h2>Editar orden</h2>
                <form>
                <div className="form-group">
                    <label>Id</label>
                    <input type="text" className="form-control" value={orden.id} disabled />
                </div>
                <div className="form-group">
                    <label>Estado</label>
                    <select className="form-control" onChange={handleChange}>
                    <option hidden>{orden.estado}</option>
                    <option value='cancelada'>cancelada</option>
                    <option value='pendiente'>pendiente</option>
                    <option value='finalizada'>finalizada</option>
                    </select>
                </div>
                </form>
            </Modal>
            </div>
        ) : (
            <div className="alert alert-warning">
            <p>No existen órdenes registradas</p>
            </div>
        )}
        </div>
    );
    }
};

export default Orders;
