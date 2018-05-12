import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import effects from 'redux-effects';
import fetch from 'redux-effects-fetch'
import { reducer as podcastsReducer } from './podcasts';
import { reducer as errorsReducer } from './errors'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    combineReducers({
        podcasts: podcastsReducer,
        errors: errorsReducer
      }
    ),
    composeEnhancers(applyMiddleware(effects, fetch))
);

export default store;