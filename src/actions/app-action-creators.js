import ACTION_TYPES from './action-types';

export const setAppState = (payload) =>
    (dispatch) => dispatch({
        type: ACTION_TYPES.SET_APP_STATE,
        payload,
    });

export const notificationMessage = (payload) =>
    (dispatch) => dispatch({
        type: ACTION_TYPES.SHOW_NOTIFICATION_MESSAGE,
        payload,
    });

export const clearNotifications = () =>
    (dispatch) => dispatch({
        type: ACTION_TYPES.CLEAR_NOTIFICATION_MESSAGES,
    });

export const hideNotificationItem = (payload) =>
    (dispatch) => dispatch({
        type: ACTION_TYPES.HIDE_NOTIFICATION_MESSAGE,
        payload,
    });
