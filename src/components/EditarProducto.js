import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editarProductoAction} from '../actions/productoActions';
import {useHistory} from 'react-router-dom';

const EditarProducto = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    //nuevo state del producto
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: 0
    });

    //producto a editar
    const productoeditar = useSelector(state => state.productos.productoeditar);
    
    
    //llenar el state automaticamente
    useEffect(() => {
        guardarProducto(productoeditar);
    }, [productoeditar]);
    
    //leer los datos del formulario
    const onChangeFormulario = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        });
    }

    const {nombre, precio} = producto;
    
    const submitEditarProducto = e => {
        e.preventDefault();
        
        dispatch( editarProductoAction(producto) );

        history.push('/');
    }

    return (  
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>
                        <form
                            onSubmit={ () => submitEditarProducto }
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre producto"
                                    value={nombre}
                                    className="form-control"
                                    onChange={onChangeFormulario}
                                />
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    name="precio"
                                    placeholder="Precio producto"
                                    value={precio}
                                    className="form-control"
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Guardar cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EditarProducto;