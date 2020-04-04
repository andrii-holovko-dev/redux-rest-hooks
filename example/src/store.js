import { createStore, applyMiddleware, compose } from 'redux';
import {makeRootSaga} from 'redux-rest-hooks';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';

import * as album from './sagas/album';
import * as comment from './sagas/album';
import * as user from './sagas/album';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
export default function configureStore() {
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(makeRootSaga({album, comment, user}));
    return store;
}


