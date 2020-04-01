import { combineReducers } from "redux";
import district from "./district";
import states from "./state";
import news from "./news";
export default combineReducers({
  DistrictData: district,
  StateData: states,
  News: news
});