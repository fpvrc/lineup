const initialState = {
  my_menus: [],
};

export default function menusReducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "ADD_MENU_FULFILLED":
      return {
        ...state,
        my_menus: [action.payload, ...state.my_menus],
      };
    case "LOGOUT_FULFILLED":
      return initialState;
    default:
      return state;
  }
}
