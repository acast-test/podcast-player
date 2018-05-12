import * as R from 'ramda';
import * as types from './types';
import generateUUId from 'uuid/v4';

const reducer = (state = [], action) => {
    switch (action.type) {
        case types.RAISE_ERROR:
            return R.concat(state, [{
                id: generateUUId(),
                message: action.payload
            }])

        default:
          return state;
      }
};

export default reducer;