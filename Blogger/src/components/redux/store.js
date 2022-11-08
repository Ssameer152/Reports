import { applyMiddleware, legacy_createStore } from "redux";
import rootReducer from "./reducers";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...legacy_createStore(rootReducer, applyMiddleware(sagaMiddleware)),
    runSaga: sagaMiddleware.run(rootSaga),
  };
};

export default configureStore;
