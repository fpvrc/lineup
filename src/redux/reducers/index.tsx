import { combineReducers } from "redux";
import user from "./User";
import auth from "./Auth";
import menus from "./Menus";

export default combineReducers({
  auth,
  user,
  menus,
});
