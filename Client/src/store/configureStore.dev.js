import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {

    const logger = createLogger();

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, logger, reduxImmutableStateInvariant())
    );
}
