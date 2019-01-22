import appReducer from './app-reducer';
import noop from 'src/utils/noop';

describe('appReducer', () => {
    describe('default', () => {
        test('returns the state', () => {
            const state = appReducer(noop, {
                type: 'asdf',
                payload: { test: 'test' },
            });

            expect(state).toEqual({ messages: [] });
        });
    });

    describe('SET_APPSTATE', () => {
        test('returns the payload as state', () => {
            const state = appReducer(noop, {
                type: 'SET_APP_STATE',
                payload: { test: 'test' },
            });

            expect(state).toEqual({ test: 'test' });
        });
    });
    describe('SHOW_NOTIFICATION_MESSAGE', () => {
        test('returns the state with payload appended to messages', () => {
            const state = appReducer({
                messages: ['test1'],
            }, {
                type: 'SHOW_NOTIFICATION_MESSAGE',
                payload: 'test2',
            });

            expect(state).toEqual({ messages: ['test1', 'test2'] });
        });
    });
    describe('CLEAR_NOTIFICATION_MESSAGES', () => {
        test('returns the state with messages as an empty array', () => {
            const state = appReducer({
                messages: ['test1'],
                test: 'test',
            }, {
                type: 'CLEAR_NOTIFICATION_MESSAGES',
            });

            expect(state).toEqual({ messages: [], test: 'test' });
        });
    });
    describe('HIDE_NOTIFICATION_MESSAGE', () => {
        test('returns the state with messages removed with the given payload', () => {
            const payload = {
                target: {
                    parentElement: {
                        parentElement: {
                            getAttribute: () => 'warning',
                        },
                    },
                },
            };
            const state = appReducer({
                messages: [{
                    type: 'warning',
                    msg: 'test1',
                }, {
                    type: 'error',
                    msg: 'test2',
                }],
            }, {
                type: 'HIDE_NOTIFICATION_MESSAGE',
                payload,
            });

            expect(state).toEqual({
                messages: [{
                    type: 'error',
                    msg: 'test2',
                }],
            });
        });
    });
});
