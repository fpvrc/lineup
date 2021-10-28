import { addMenu } from "../../api/Menus";

export const doAddMenu = (uid, menu_name, photo_uri) => ({
  type: "ADD_MENU",
  payload: addMenu(uid, menu_name, photo_uri),
});
