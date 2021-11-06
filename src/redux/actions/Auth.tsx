import { logout, connectGraph, getData } from "../../api/Auth";

export const doConnectGraph = (user) => ({
  type: "CONNECT_GRAPH",
  payload: connectGraph(user),
});

export const doLogout = () => ({
  type: "LOGOUT",
  payload: logout(),
});

export const doGetData = (uid) => ({
  type: "GET_DATA",
  payload: getData(uid),
});
