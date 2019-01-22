import { assoc } from 'ramda';
import { handleError } from './handle-error';
import iFetch from 'isomorphic-fetch';
if (!window.fetch) {
    window.fetch = iFetch;
}

const hostname = window.location.hostname.split('-').join('.').split('.')[1] || 'localhost';
const API_BASE = 'https://interview-fe-challenge.grapenuts.flytedesk.com/interview_schools';
const API_CREDENTIALS = hostname === 'localhost' ? 'same-origin' : 'include';
const baseConfig = {
    //credentials: API_CREDENTIALS,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

const baseGetConfig = assoc('method', 'GET', baseConfig);
const basePostConfig = assoc('method', 'POST', baseConfig);
const basePutConfig = assoc('method', 'PUT', baseConfig);
const baseDeleteConfig = assoc('method', 'Delete', baseConfig);

/**
 * default for handling api responses
 * @param  {object} response
 * @return {object} response.json()
 */
const handleResponse = (response) => {
    if (!response.ok) {
        //@TODO - remove
        debugger;
        handleError(response.statusText);
    }
    return response.json();
};

/**
  * @private
  * @name getFetch
  * @description Initiates a GET fetch request using default options
  * @param  {string}  url The URL to GET
  * @return {Promise}     A fetch Promise
  */
/*
const getFetch = (url) =>
    fetch(url, baseGetConfig);
*/

export const handledGetFetch = (path = '') =>
    fetch(API_BASE + path, baseGetConfig)
        .then(handleResponse);

/**
  * @private
  * @name postFetch
  * @description Initiates a POST fetch request using default options
  * @param  {string} url  The URL to POST to
  * @param  {object} body The POST body to send
  * @return {Promise}     A fetch Promise
  */
const postFetch = (url, body) =>
    fetch(url, assoc('body', JSON.stringify(body), basePostConfig));

export const handledPostFetch = (url, body) =>
    postFetch(API_BASE + url, body)
        .then(handleResponse);

/**
  * @private
  * @name putFetch
  * @description Initiates a POST fetch request using default options
  * @param  {string} url  The URL to POST to
  * @param  {object} body The POST body to send
  * @return {Promise}     A fetch Promise
  */
const putFetch = (url, body) =>
    fetch(url, assoc('body', JSON.stringify(body), basePutConfig));

export const handledPutFetch = (url, body) =>
    putFetch(API_BASE + url, body)
        .then(handleResponse);
