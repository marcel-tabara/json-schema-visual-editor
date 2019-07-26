import { combineReducers } from "redux";
import mainReducer from "../../services/mainService/reducer";

export default () =>
  combineReducers({
    mainReducer
  });
