import { FETCH } from 'redux-effects-fetch';
import { bind as bindEffect } from 'redux-effects';
import * as types from './types';

/**
 *
 * @param {Function} success - function that is invoked after success response. Must return redux action object
 * @param {Function} failure - function that is invoked after failure response. Must return redux action object
 */
export const fetchEpisodes = (success, failure) => {
    return bindEffect(
        {
            type: FETCH,
            payload: { url: 'http://localhost:1337/episodes' },
        },
        success,
        failure
    )
}

export const storeEpisodes = (episodes) => {
    return {
        type: types.STORE_EPISODES,
        payload: episodes
    }
}

export const playEpisode = (id) => {
    return {
        type: types.PLAY_EPISODE,
        payload: id
    }
}

export const updateCurrentEpisodeTime = (time) => {
    return {
        type: types.UPDATE_CURRENT_TIME,
        payload: time
    }
}

export const updatePendingSeek = (time) => {
    return {
        type: types.UPDATE_PENDING_SEEK,
        payload: time
    }
}

export const updateJumptoTime = (time) => {
    return {
        type: types.UPDATE_JUMPTO_TIME,
        payload: time
    }
}

