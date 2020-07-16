import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const store = createStore(
    reducer,
    compose(
        //se requiere applyMiddleware porque usamos Thunk, sino no se requiere.
        applyMiddleware(thunk),
        //react developer tools no nos sirve para redux, por lo que instalamos esa herramienta.
        typeof window === 'object' && 
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;