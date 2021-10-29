import { addMenu, getMyMenus, getMenus } from "../../api/Menus";

export const doAddMenu = (uid, formData) => ({
  type: "ADD_MENU",
  payload: addMenu(uid, formData),
});

export const doInstantRender = (menu) => ({
  type: "RENDER_MENU",
  payload: Promise.resolve(menu),
});

export const doGetMyMenus = (uid) => ({
  type: "GET_MY_MENUS",
  payload: getMyMenus(uid),
});

export const doSetActiveMenu = (menu) => ({
  type: "SET_ACTIVE_MENU",
  payload: Promise.resolve(menu),
});

export const doGetMenus = () => ({
  type: "GET_MENUS",
  payload: getMenus(),
});
