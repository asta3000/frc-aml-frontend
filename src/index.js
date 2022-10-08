import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import UserReducer from "./reduxes/reducers/User";
import ModuleReducer from "./reduxes/reducers/Module";
import MenuReducer from "./reduxes/reducers/Menu";
import LocalReducer from "./reduxes/reducers/Local";
import DataReducer from "./reduxes/reducers/Data";
import MetaDataReducer from "./reduxes/reducers/Metadata";
import TrackReducer from "./reduxes/reducers/Track";

const reducers = combineReducers({
  UserReducer,
  ModuleReducer,
  LocalReducer,
  MenuReducer,
  DataReducer,
  MetaDataReducer,
  TrackReducer,
});

const loggerMiddleware = (store) => {
  return (next) => {
    return (action) => {
      // console.log('Logger Middleware: Dispatching -> ', action);
      // console.log("Logger Middleware: State before -> ", store.getState());
      const result = next(action);
      // console.log("Logger Middleware: State after -> ", store.getState());
      return result;
    };
  };
};

const middlewares = [loggerMiddleware, thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
