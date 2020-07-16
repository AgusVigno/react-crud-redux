import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTO,
    DESCARGA_PRODUCTO_EXITO,
    DESCARGA_PRODUCTO_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch(agregarProducto() );
        try {
            //insertar en la API
            await clienteAxios.post('/productos', producto);
            
            //si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto));

            //alerta
            Swal.fire(
                'Correcto',
                'El producto se cargo correctamente',
                'success'    
            );
        } catch (error) {
            //si hay un error, cambiar el state
            console.log(error);
            dispatch(agregarProductoError(true));

            //alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            });
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

//si el producto se guarda en la BD
const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

//si hubo un error
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});


//funcion que descarga los productos de la BD
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargarProductosExitosa(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch(descargarProductosError());
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTO,
    payload: true
});

const descargarProductosExitosa = (productos) => ({
    type: DESCARGA_PRODUCTO_EXITO,
    payload: productos
});

const descargarProductosError = () => ({
    type: DESCARGA_PRODUCTO_ERROR,
    payload: true
});

//selecciona y elimina un producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());
            
            //alerta
            Swal.fire(
                'Eliminado',
                'El producto se eliminó correctamente',
                'success'                
            )
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});