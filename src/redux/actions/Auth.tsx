import { logout, connectGraph } from "../../api/Auth";

export const doConnectGraph = (user) => ({
  type: "CONNECT_GRAPH",
  payload: connectGraph(user),
});

export const doLogout = () => ({
  type: "LOGOUT",
  payload: logout(),
});
