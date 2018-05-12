import * as types from './types';

/**
 * 
 * @param {string} error - error message
 */
export const raiseError = (error) => {
    return {
        type: types.RAISE_ERROR,
        payload: error
    }
}