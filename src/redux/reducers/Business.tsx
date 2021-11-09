const initialState = {
  my_business: [],
};

export default function businessReducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "GET_DATA_FULFILLED":
      return {
        ...state,
        my_business: action.payload?.my_businesses
          ? action.payload.my_businesses.map((bus) => {
              if (bus) return bus.buid;
            })
          : state.my_business,
      };
    case "GET_MY_BUSINESS_FULFILLED":
      return {
        ...state,
        my_business: action.payload,
      };
    case "ADD_BUSINESS_FULFILLED": {
      return {
        ...state,
        my_business: [
          ...state.my_business.map((bus) => {
            if ((bus as any).buid === action.payload.buid) {
              return action.payload;
            } else {
              return bus;
            }
          }),
        ],
      };
    }
    case "RENDER_BUSINESS_FULFILLED": {
      return {
        ...state,
        my_business: [...state.my_business, action.payload],
      };
    }
    case "LOGOUT_FULFILLED":
      return initialState;
    default:
      return state;
  }
}
