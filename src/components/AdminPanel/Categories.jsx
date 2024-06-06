import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductos, eliminarProductosCategoria } from '../../redux/actions';

import swal from 'sweetalert';
import Loading from '../Loading';

import { MdDelete } from "react-icons/md";

const Categories = () => {
  const dispatch = useDispatch();
  const productos = useSelector(state => state.productos);
  const data = [
    { id: 'FB100', categoria: 'Jeans' },
    { id: 'FB110', categoria: 'Blusas' },
    { id: 'FB120', categoria: 'Vestidos' },
    { id: 'FB130', categoria: 'Chaquetas' }
  ];

  const eliminarProductosDeCategoria = (id) => {
    swal({
      title: "¿Estás seguro?",
      text: "Se eliminarán todos los productos de la categoría seleccionada",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(eliminarProductosCategoria(id));
          swal("Productos eliminados correctamente", {
            icon: "success",
          });
        } else {
          swal("Se ha cancelado la eliminación");
        }
      });
  }

  useEffect(() => {
    dispatch(obtenerProductos());
  }, [dispatch]);

  if (!productos.length) {
    return <Loading/>;
  }

  return (
    <div className="container mt-5">
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Categoría</th>
            <th>Cantidad productos</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, index) => {
            const cantidadProductos = productos.filter(producto => producto.idCategoria === e.id).length;
            return (
              <tr key={index}>
                <td>{e.id}</td>
                <td>{e.categoria}</td>
                <td>{cantidadProductos}</td>
                <td>
                  <button className="btn ml-2" onClick={() => eliminarProductosDeCategoria(e.id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
