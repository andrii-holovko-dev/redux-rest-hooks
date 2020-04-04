import {combineReducers} from "redux";
import {dataReducer} from "redux-rest-hooks";

export default combineReducers({
  data: dataReducer,
});
