import ACTION_TYPES from 'src/actions/action-types';
import {
    assoc,
    assocPath,
    merge,
    pick,
} from 'ramda';
import { EMPTY_MODEL } from 'src/utils/constants';

const INITIAL_MODEL_STATE = {
    filteredModelId: '',
    orderBy: 'id', //['id', 'status', etc.]
    dir: 'asc', //['asc', 'desc']
    limit: 100,
    offset: 0,
    modelResults: [],
    currentModel: EMPTY_MODEL,
    productResults: [],
};

const modelReducer = (state = INITIAL_MODEL_STATE, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.SET_MODEL_FILTER:
            return assoc('filteredModelId', payload, state);

        case ACTION_TYPES.UPDATE_MODEL_RESULTS:
            return assoc('modelResults', payload, state);

        case ACTION_TYPES.SET_MODEL_PAGINATION:
            return merge(state, (pick(['orderBy', 'dir', 'offset', 'limit'], payload)));

        case ACTION_TYPES.SET_MODEL_DETAILS:
            //SET_MODEL_INSTRUCTIONS occurs before this, we need to use merge
            return assoc('currentModel', merge(state.currentModel, payload), state);

        case ACTION_TYPES.CLEAR_MODEL_DETAILS:
            return assoc('currentModel', {}, state);

        case ACTION_TYPES.SET_MODEL_INSTRUCTIONS:
            return assocPath(['currentModel', 'instructions'], payload, state);

        case ACTION_TYPES.SET_PRODUCTS:
            return assoc('productResults', payload, state);

        case ACTION_TYPES.SET_LIMIT_BY_OPTIONS:
            return assocPath(['limitBy', payload.limitBy], payload.data, state);

        default:
            return state;
    }
};

export default modelReducer;
