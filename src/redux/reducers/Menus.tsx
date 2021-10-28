const initialState = {
  my_menus: [],
  loading: false,
};

export default function menusReducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "ADD_MENU_FULFILLED":
      return {
        ...state,
        loading: false,
        my_menus: [
          ...state.my_menus.map((menu: any) => {
            if (menu.muid === action.payload.muid) {
              return {
                ...menu,
                _id: action.payload._id,
                uid: action.payload.uid,
              };
            } else {
              return menu;
            }
          }),
        ],
      };
    case "GET_MY_MENUS_FULFILLED":
      return {
        ...state,
        my_menus: action.payload,
      };
    case "RENDER_MENU_FULFILLED":
      return {
        ...state,
        my_menus: [action.payload, ...state.my_menus],
      };
    case "ADD_MENU_PENDING":
      return {
        ...state,
        loading: true,
      };
    case "LOGOUT_FULFILLED":
      return initialState;
    default:
      return state;
  }
}
