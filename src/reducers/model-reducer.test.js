import modelReducer from './lab-reducer';
import noop from 'src/utils/noop';

describe('modelReducer', () => {
    describe('default', () => {
        test('returns the state', () => {
            const state = modelReducer(noop, {
                type: 'asdf',
                payload: { test: 'test' },
            });

            expect(state).toEqual({
                filteredModelId: '',
                orderBy: 'id', //['id', 'status', etc.]
                dir: 'asc', //['asc', 'desc']
                limit: 100,
                offset: 0,
                modelResults: [],
                currentModel: {},
                productResults: [],
            });
        });
    });
    describe('SET_MODEL_FILTER', () => {
        test('sets filteredModelId to payload', () => {
            const state = modelReducer(noop, {
                type: 'SET_MODEL_FILTER',
                payload: 'test',
            });

            expect(state).toEqual({
                filteredModelId: 'test',
                orderBy: 'id', //['id', 'status', etc.]
                dir: 'asc', //['asc', 'desc']
                limit: 100,
                offset: 0,
                modelResults: [],
                currentModel: {},
                productResults: [],
            });
        });
    });

    describe('UPDATE_MODEL_RESULTS', () => {
        test('sets modelResults to payload', () => {
            const state = modelReducer(noop, {
                type: 'UPDATE_MODEL_RESULTS',
                payload: ['test'],
            });

            expect(state).toEqual({
                filteredModelId: '',
                orderBy: 'id', //['id', 'status', etc.]
                dir: 'asc', //['asc', 'desc']
                limit: 100,
                offset: 0,
                modelResults: ['test'],
                currentModel: {},
                productResults: [],
            });
        });
    });

    describe('SET_MODEL_PAGINATION', () => {
        test('sets orderBy, dir, offset, limit to payload', () => {
            const state = modelReducer(noop, {
                type: 'SET_MODEL_PAGINATION',
                payload: {
                    test: 'test',
                    orderBy: 'name',
                    dir: 'desc',
                    offset: 10,
                    limit: 10,
                },
            });

            expect(state).toEqual({
                filteredModelId: '',
                orderBy: 'name', //['id', 'status', etc.]
                dir: 'desc', //['asc', 'desc']
                limit: 10,
                offset: 10,
                modelResults: [],
                currentModel: {},
                productResults: [],
            });
        });
    });

    describe('SET_MODEL_DETAILS', () => {
        test('merges payload into currentModel', () => {
            const state = modelReducer({
                currentModel: {
                    id: 'test',
                },
            }, {
                type: 'SET_MODEL_DETAILS',
                payload: {
                    test: 'test',
                    more: 'testing',
                },
            });

            expect(state).toEqual({
                currentModel: {
                    id: 'test',
                    test: 'test',
                    more: 'testing',
                },
            });
        });
    });

    describe('CLEAR_MODEL_DETAILS', () => {
        test('merges payload into currentModel', () => {
            const state = modelReducer({
                currentModel: {
                    id: 'test',
                    instructions: [1, 2, 3],
                },
            }, {
                type: 'CLEAR_MODEL_DETAILS',
            });

            expect(state).toEqual({
                currentModel: {
                    id: noop,
                    instructions: noop,
                },
            });
        });
    });

    describe('SET_MODEL_INSTRUCTIONS', () => {
        test('set instructions to payload', () => {
            const state = modelReducer({
                currentModel: {
                    id: 'test',
                    instructions: [],
                },
            }, {
                type: 'SET_MODEL_INSTRUCTIONS',
                payload: [1, 2, 3],
            });

            expect(state).toEqual({
                currentModel: {
                    id: 'test',
                    instructions: [1, 2, 3],
                },
            });
        });
    });

    describe('SET_PRODUCTS', () => {
        test('set productResult to payload', () => {
            const state = modelReducer({
                currentModel: {
                    id: 'test',
                },
                productResults: [],
            }, {
                type: 'SET_PRODUCTS',
                payload: [1, 2, 3],
            });

            expect(state).toEqual({
                currentModel: {
                    id: 'test',
                },
                productResults: [1, 2, 3],
            });
        });
    });
});
