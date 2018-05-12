import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';

describe('errors reducer', () => {
    it('raises error', () => {
        // arrange
        const errorMessage = 'Something went wrong';
        const initialState = [];
        const action = actions.raiseError(errorMessage);

        // act
        const state = reducer(initialState, action);
        const error = selectors.getErrors(state)[0];

        // assert
        expect(state.length).toBe(1);
        expect(error.message).toBe(errorMessage);
        expect(error.id).toBeDefined();
    })
})