import ACTION_TYPES from 'src/actions/action-types';
import {
    assoc,
    append,
    filter,
} from 'ramda';

const INITIAL_APP_STATE = {
    messages: [],
};

export default (state = INITIAL_APP_STATE, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.SET_APP_STATE:
            return payload;

        case ACTION_TYPES.SHOW_NOTIFICATION_MESSAGE:
            return assoc('messages', append(payload, state.messages), state);

        case ACTION_TYPES.CLEAR_NOTIFICATION_MESSAGES:
            return assoc('messages', [], state);

        case ACTION_TYPES.HIDE_NOTIFICATION_MESSAGE:
            return assoc(
                'messages',
                filter((msg) => msg.type !== payload.target.parentElement.parentElement.getAttribute('data-type'),
                    state.messages),
                state
            );

        default:
            return state;
    }
};
