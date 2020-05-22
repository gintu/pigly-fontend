import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import userReducer from "./redux/userReducer";
import authReducer from "./redux/authReducer";
import App from "./App";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../src/redux/sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({ user: userReducer, auth: authReducer });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);
