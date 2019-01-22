import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';

import {
    applyMiddleware,
    compose,
    createStore,
} from 'redux';

import reducers from './reducers/root';

//import './polyfill';

const middleware = applyMiddleware(thunk);

const enhancer = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__ ? compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__()
) : middleware;

const store = createStore(reducers, enhancer);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>, document.getElementById('root'));

registerServiceWorker();
