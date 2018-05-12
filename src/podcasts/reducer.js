import * as R from 'ramda';
import * as types from './types';

const initialState = {
    episodes: [],
    currentlyPlaying: '',
    currentEpisodeTime: '',
    pendingSeek: 0,
    jumptoTime: 0
};

const reducer = (state = initialState, action) => {
    const { payload } = action;

    switch (action.type) {
        case types.STORE_EPISODES:
          return R.assoc('episodes', payload, state)
        case types.PLAY_EPISODE:
            return R.assoc('currentlyPlaying', payload, state)
        case types.UPDATE_CURRENT_TIME:
            return R.assoc('currentEpisodeTime', payload, state)
        case types.UPDATE_PENDING_SEEK:
            return R.assoc('pendingSeek', payload, state)
        case types.UPDATE_JUMPTO_TIME:
            return R.assoc('jumptoTime', payload, state)
        default:
          return state;
      }
};

export default reducer;
