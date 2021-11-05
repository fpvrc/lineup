import { combineReducers } from "redux";
import user from "./User";
import auth from "./Auth";
import menus from "./Menus";
import business from "./Business";

export default combineReducers({
  auth,
  user,
  menus,
  business,
});
