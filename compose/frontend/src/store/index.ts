import { applyMiddleware, createStore } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { NODE_ENV } from '../config';
import rootReducer from '../reducers';

const middleware: any[] = [thunk];
if (NODE_ENV === 'development') {
  middleware.push(reduxImmutableStateInvariant(), logger);
}

export default function configureStore(initialState: any) {
  // TODO: create interface(s) for initial state once it is known
  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
}
