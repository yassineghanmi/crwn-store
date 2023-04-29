const USER_INITIAL_STATE = { currentUser: null, isLoading: false, error: null };

//userReducer
export const userReducer = (state = USER_INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_CURRENT_USER":
      return { ...state, currentUser: payload };
    case "CHECK_USER_SESSION":
      return { ...state, isLoading: true };
    //SIGN_IN
    case "SIGN_IN_SUCCESS":
      return { ...state, currentUser: payload, isLoading: false };
    case "SIGN_IN_FAILED":
      return { ...state, error: payload, isLoading: false };
    //SIGN_UP
    case "SIGN_UP_FAILED":
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
