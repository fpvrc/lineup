import { logout, connectGraph } from "../../api/Auth";

export const doConnectGraph = (user: any) => ({
  type: "CONNECT_GRAPH",
  payload: connectGraph(user),
});

export const doLogout = () => ({
  type: "LOGOUT",
  payload: logout(),
});
