import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import sliceReducer from "./sliceReducers";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  slice: sliceReducer,
});

export default createRootReducer;
