import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from './reducers';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  // const middlewares = [routerMiddleware(history), thunkMiddleware, loggerMiddleware]
  // const middlewareEnhancer = applyMiddleware(...middlewares)

  // const enhancers = [middlewareEnhancer]
  // const composedEnhancers = compose(...enhancers)

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(routerMiddleware(history), thunkMiddleware, loggerMiddleware)
    )
  );

  return store
}