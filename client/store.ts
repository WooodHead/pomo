import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './common/reducers/';
import { sagas } from './common/sagas/';

const composeEnhancers = (
  process.env.NODE_ENV === 'developmenst' &&
  window && window.devToolsExtension
) || compose;

export const browserHistory = createBrowserHistory();
export const routerMiddleware = createRouterMiddleware(browserHistory);
export const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState?: any) {
  // configure middlewares
  const middlewares = [
    routerMiddleware,
    sagaMiddleware,
  ];

  const middleware = applyMiddleware(...middlewares);

  const enhancer = compose(middleware, window.devToolsExtension());

  // create store
  return createStore(connectRouter(browserHistory)(rootReducer), initialState!, enhancer);
}

// pass an optional param to rehydrate state on app start
export const store = configureStore({authentication: {isAuth: false}});

sagaMiddleware.run(sagas);

export const dispatch = store.dispatch;

// export store singleton instance
export default store;
