import { combineReducers } from "redux";

import filterGraphics from "./filterGraphics";
import getCities from "./getCities";

export default combineReducers({
  filterGraphics,
  getCities
});
