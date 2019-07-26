import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import createRootReducer from "./reducers";
import sagas from "./sagas/index";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState) {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(),
    preloadedState,
    composeEnhancer(applyMiddleware(sagaMiddleware, logger))
  );

  sagaMiddleware.run(sagas);

  return store;
}
