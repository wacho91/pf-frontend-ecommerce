import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosPanel, eliminarProducto, obtenerDetalleProducto, actualizarProducto, crearProducto, filtrosProductosPanel, buscarProducto } from '../../redux/actions';
import swal from 'sweetalert';
import Modal from '../Modal';
import Loading from '../Loading';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Cloudinary } from 'cloudinary-core';


const cloud_name ="deacm87l9";
const upload_preset = "ay7uc3m7";

// Inicializa Cloudinary
const cloudinary = new Cloudinary({ cloud_name: cloud_name, secure: true });

const Products = () => {
  const productosPanel = useSelector(state => state.productosPanel);
  const detalleProducto = useSelector(state => state.detalleProducto);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(1);
  const [isOpen2, setIsOpen2] = useState(false);
  const [input, setInput] = useState({
    titulo: '',
    miniatura: '',
    cantidadDisponible: 0,
    cantidadVendida: 0,
    idCategoria: '',
    precio: 0
  });
  const [titulo, setTitulo] = useState('');

  const handleSubmitTitulo = (e) => {
    e.preventDefault();
    dispatch(buscarProducto(titulo));
  };

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', upload_preset); // Asegúrate de reemplazar esto con tu upload preset

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/image/upload`, {
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
      setInput({
        ...input,
        miniatura: imageUrl,
      });
    }
  };

  const handleChangeTitulo = (e) => {
    setTitulo(e.target.value);
  };

  const handleFetchAllProducts = () => {
    dispatch(obtenerProductosPanel());
  };

  const borrarProducto = (id) => {
    swal({
      title: "¿Estás seguro que deseas eliminar este producto?",
      text: "Una vez eliminado, desaparecerá de la página",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(eliminarProducto(id));
          swal("Producto eliminado correctamente", {
            icon: "success"
          });
        } else {
          swal("Se ha cancelado la eliminación");
        }
      });
  };

  const handleClick = (payload) => {
    setIsOpen(true);
    dispatch(obtenerDetalleProducto({ id: payload }));
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(actualizarProducto(detalleProducto.id, input));
    swal("Producto actualizado correctamente", {
      icon: "success",
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleSubmit2 = () => {
    dispatch(crearProducto(input))
    setInput({
      titulo: '',
      miniatura: '',
      cantidadDisponible: 0,
      cantidadVendida: 0,
      idCategoria: '',
      precio: 0
    });
    swal("Producto creado correctamente", {
      icon: "success",
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const filtrarProductos = (e) => {
    dispatch(filtrosProductosPanel(e.target.value));
    setOrder(e.target.value);
  };

  useEffect(() => {
    dispatch(obtenerProductosPanel());
  }, [dispatch]);

  useEffect(() => {
    if (detalleProducto) {
      setInput({
        titulo: detalleProducto.titulo,
        miniatura: '',
        cantidadDisponible: detalleProducto.cantidadDisponible,
        cantidadVendida: detalleProducto.cantidadVendida,
        idCategoria: detalleProducto.idCategoria,
        precio: detalleProducto.precio
      });
    }
  }, [detalleProducto]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <select onChange={filtrarProductos} className="form-select w-auto">
          <option hidden>Filtros</option>
          <option value='az'>A-Z</option>
          <option value='za'>Z-A</option>
          <option value='+ventas'>+ Ventas</option>
          <option value='-ventas'>- Ventas</option>
        </select>
        <div className="d-flex">
          <form onSubmit={handleSubmitTitulo} className="d-flex me-2">
            <input type='text' className="form-control" placeholder='Buscar producto' onChange={handleChangeTitulo} />
            <button className="btn btn-secondary" title='Buscar' disabled={!titulo.length}>
              <svg className="bi" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/>
              </svg>
            </button>
          </form>
          <button className="btn btn-secondary me-2" onClick={() => setIsOpen2(true)}>Crear producto</button>
          <button className="btn btn-secondary" onClick={handleFetchAllProducts}>Todos</button>
        </div>
      </div>
      <div>
        {productosPanel.length ? (
          <div>
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Disponibles</th>
                  <th>Ventas</th>
                  <th>Categoria</th>
                  <th>Precio</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {productosPanel.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.id}</td>
                    <td>{producto.titulo}</td>
                    <td>{producto.cantidadDisponible}</td>
                    <td>{producto.cantidadVendida}</td>
                    <td>{producto.categoria}</td>
                    <td>${producto.precio}</td>
                    <td>
                      <FaEdit onClick={() => handleClick(producto.id)} />
                      <MdDelete onClick={() => borrarProducto(producto.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal isOpen={isOpen2} setIsOpen={setIsOpen2} tituloModal="Producto" despachar={handleSubmit2}>
              <h2>Crear producto</h2>
              <form onChange={handleChange}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type='text' name='titulo' className="form-control" placeholder='Elige el nombre' />
                </div>
                <div className="mb-3">
                  <label className="form-label">Disponibles</label>
                  <input type='number' name='cantidadDisponible' className="form-control" placeholder='Elige la cantidad disponible' />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ventas</label>
                  <input type='number' name='cantidadVendida' className="form-control" placeholder='Elige la cantidad de ventas' />
                </div>
                <div className="mb-3">
                  <label className="form-label">Categoría</label>
                  <select name='idCategoria' className="form-select">
                    <option hidden />
                    <option value='FB100'>Jeans</option>
                    <option value='FB110'>Blusas</option>
                    <option value='FB120'>Vestidos</option>
                    <option value='FB130'>Chaquetas</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input type='number' name='precio' className="form-control" placeholder='Elige el precio' />
                </div>
                <div className="mb-3">
                  <label className="form-label">Imagen</label>
                  <input type='file' name='miniatura' className="form-control" accept="image/png, image/jpeg"  onChange={handleImageChange} />
                </div>
              </form>
            </Modal>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} tituloModal="Producto" despachar={handleSubmit}>
              <h2>Editar producto</h2>
              <form onChange={handleChange}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type='text' name='titulo' className="form-control" value={input.titulo} placeholder='Editar el nombre' />
                </div>
                <div className="mb-3">
                  <label className="form-label">Disponibles</label>
                  <input type='number' name='cantidadDisponible' className="form-control" value={input.cantidadDisponible} placeholder='Editar la cantidad disponible' />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ventas</label>
                  <input type='number' name='cantidadVendida' className="form-control" value={input.cantidadVendida} placeholder='Editar la cantidad de ventas' />
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input type='number' name='precio' className="form-control" value={input.precio} placeholder='Editar el precio' />
                </div>
                <div className="mb-3">
                  <label className="form-label">Imagen</label>
                  <img src={detalleProducto.miniatura} alt='miniatura' className="d-block mb-2 h-25 w-25" />
                  <input type='file' name='miniatura' className="form-control" accept="image/png, image/jpeg"  onChange={handleImageChange} />
                </div>
              </form>
            </Modal>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <Loading/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
