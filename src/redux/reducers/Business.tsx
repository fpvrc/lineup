const initialState = {
  my_business: [],
};

export default function businessReducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "GET_MY_BUSINESS_FULFILLED":
      return {
        ...state,
        my_business: action.payload,
      };
    case "ADD_BUSINESS_FULFILLED": {
      return {
        ...state,
        my_business: [...state.my_business, action.payload],
      };
    }
    default:
      return state;
  }
}
