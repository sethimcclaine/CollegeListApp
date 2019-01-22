import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import appReducer from './app-reducer';
import modelReducer from './model-reducer';

const root = combineReducers({
    appReducer,
    modelReducer,
    routing: routerReducer,
});

export default root;
