import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';

describe('podcasts reducer', () => {
    it('stores episodes', () => {
        // arrange
        const episodes = [{id: 'short'}];
        const action = actions.storeEpisodes(episodes);

        // act
        const state = reducer({}, action);

        // assert
        expect(state.episodes).toEqual(episodes);
    });

    it('plays episode', () => {
        // arrange
        const episodeId = 'short';
        const action = actions.playEpisode(episodeId);

        // act
        const state = reducer({}, action);

        // assert
        expect(state.currentlyPlaying).toBe(episodeId);
    });

    it('updates current time of currently playing episode', () => {
        // arrange
        const time = 10;
        const action = actions.updateCurrentEpisodeTime(time);

        // act
        const state = reducer({}, action);

        // assert
        expect(state.currentEpisodeTime).toBe(time);
    });

    it('updates pending seek time', () => {
        // arrange
        const pendingSeek = 20;
        const action = actions.updatePendingSeek(pendingSeek);

        // act
        const state = reducer({}, action);

        // assert
        expect(state.pendingSeek).toBe(pendingSeek);
    });

    it('updates time to be jumped to', () => {
        // arrange
        const jumptoTime = 20;
        const action = actions.updateJumptoTime(jumptoTime);

        // act
        const state = reducer({}, action);

        // assert
        expect(state.jumptoTime).toBe(jumptoTime);
    });

    it('returns defined state if passed state is undefined', () => {
        // arrange
        const initialState = undefined;
        const action = {type: 'ANY'};

        // act
        const state = reducer(undefined, action);

        // assert
        expect(state).toBeDefined();
    });
});

