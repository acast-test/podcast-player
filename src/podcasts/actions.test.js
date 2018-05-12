import * as actions from './actions';
import {FETCH} from 'redux-effects-fetch';

describe('podcasts actions', () => {
    it('fetchEpisodes has correct url', () => {
        // arrange
        const noop = () => {};

        // act
        const action = actions.fetchEpisodes(noop, noop);

        // assert
        expect(action.payload.payload.url).toBe('http://localhost:1337/episodes');
    });

    it('fetchEpisodes returns `EFFECT_FETCH` action', () => {
        // arrange
        const noop = () => {};

        // act
        const action = actions.fetchEpisodes(noop, noop);

        // assert
        expect(action.payload.type).toBe(FETCH);
    });

    it('fetchEpisodes assigns success and error callbacks', () => {
        // arrange
        const SUCCESS_ACTION_TYPE = 'SUCCESS';
        const ERROR_ACTION_TYPE = 'ERROR';
        const success = () => ({type: SUCCESS_ACTION_TYPE});
        const error = () => ({type: ERROR_ACTION_TYPE});

        // act
        const action = actions.fetchEpisodes(success, error);
        const [successAction, failureAction] = action.meta.steps[0];

        expect(successAction().type).toBe(SUCCESS_ACTION_TYPE)
        expect(failureAction().type).toBe(ERROR_ACTION_TYPE)
    });
})