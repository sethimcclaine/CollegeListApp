import ACTION_TYPES from './action-types';

import {
    getModel,
    getModels,
    putModel,
    postModel,
} from 'src/utils/api';
//import { history } from 'src/utils/history';
//import { PATH } from 'src/constants';
//import { dateOr } from 'src/utils/format-date';

import {
    //merge,
    forEachObjIndexed,
} from 'ramda';

export const upsertModel = (payload) => {
    /*
    payload = merge(payload, {
        live_event_start: dateOr(payload.live_event_start),
        live_event_end: dateOr(payload.live_event_end),
    });
    */
    const action = payload.id ? postModel : putModel;

    return (dispatch) => action(payload)
        .then((resp) => {
            const { result, data } = resp;
            debugger;
            if (result === 'success') {
                //Clear the model items so home will fetch new results when it loads
                dispatch({
                    type: ACTION_TYPES.UPDATE_MODEL_RESULTS,
                    payload: [],
                });
                debugger; //@TODO
                //history.push(PATH.home);
            } else {
                forEachObjIndexed((value, key) =>
                    dispatch({
                        type: ACTION_TYPES.SHOW_NOTIFICATION_MESSAGE,
                        payload: { type: 'danger', message: `${key}: ${value}` },
                    }),
                data);
                window.scrollTo(0, 0); //If we like doing this it should be moved into the action
            }
        });
};

export const fetchModelItems = (payload) =>
    (dispatch) => {
        dispatch({
            type: ACTION_TYPES.SET_MODEL_FILTER,
            payload: '',
        });

        getModels().then((data) => {
            dispatch({
                type: ACTION_TYPES.UPDATE_MODEL_RESULTS,
                payload: data,
            });
        }, () => {
            dispatch({
                type: ACTION_TYPES.UPDATE_MODEL_RESULTS,
                payload: [],
            });
        });
    };

export const fetchModelDetails = (id) =>
    (dispatch) => getModel(id).then((data) => {
        dispatch({
            type: ACTION_TYPES.SET_MODEL_FILTER,
            payload: id,
        });

        dispatch({
            type: ACTION_TYPES.SET_MODEL_DETAILS,
            payload: data,
        });
    }, (err) => dispatch({
        type: ACTION_TYPES.SET_MODEL_DETAILS_FAILED,
        payload: err,
    }));
