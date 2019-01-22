import {
    handledGetFetch,
    handledPutFetch,
    handledPostFetch,
} from './api-base';

import * as R from 'ramda';

//*
const getModels = () => handledGetFetch();
const getModel = (id) => handledGetFetch(`/${ id }`);
const postModel = (payload) => handledPostFetch(`/` + R.propOr('', 'id', payload), R.omit(['id', 'created_at', 'updated_at'], payload));

/*/
//Local storage resolution
import * as tmp from './tmpdata';
const promiseResp = (data) => new Promise((res) => res(data));
const getModels = () => {
    const data = JSON.parse(localStorage.getItem('records')) || tmp.data;

    return promiseResp({
        result: 'success',
        data,
    });
}

const getModel = (id) => {
    const data = JSON.parse(localStorage.getItem('records'));

    return promiseResp({
        result: 'success',
        data: R.find(R.propEq('id', parseInt(id, 10)), data),
    });
}
//*/

//*
const putModel = (payload) => handledPutFetch(`/3/`, R.omit(['id', 'created_at', 'updated_at'], payload));
/*/
const putModel = (payload) => {
    payload.id = Math.floor(Math.random() * Math.floor(10000)); //set a random id for now and hope it doesn't collide :-P
    const load = R.omit(['id', 'created_at', 'updated_at'], payload)
    debugger;
    const newData = { [payload.id]: load };
    const oldData = JSON.parse(localStorage.getItem('records'));
    const data = window.localStorage.setItem('records', JSON.stringify(R.merge(oldData, newData)));
    return promiseResp({
        result: 'success',
        data,
    });
};
//*/

/*
const postModel = (payload) => {
    const newData = { [payload.id]: load };
    const oldData = JSON.parse(localStorage.getItem('records')) || {};
    const data = window.localStorage.setItem('records', JSON.stringify(R.merge(oldData, newData)));

    return promiseResp({
        result: 'success',
        data,
    });
};
//*/

export {
    getModels,
    getModel,
    putModel,
    postModel,
};
