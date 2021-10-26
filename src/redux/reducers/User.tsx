const initialState = {
  user: null,
};

export default function userReducer(
  state = initialState,
  action: {type: string; payload: any},
) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT_FULFILLED':
      return initialState;
    default:
      return state;
  }
}
