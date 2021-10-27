const initialState = {
  graph_authenticated: false,
};

export default function userReducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "CONNECT_GRAPH_FULFILLED":
      return {
        ...state,
        graph_authenticated: action.payload,
      };
    case "CONNECT_GRAPH_REJECTED":
      return {
        ...state,
        graph_authenticated: false,
      };
    case "LOGOUT_FULFILLED":
      return initialState;
    default:
      return state;
  }
}
