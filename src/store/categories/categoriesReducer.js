const CATEGORIES_INITIAL_STATE = {
  categoriesMap: {},
  isLoading: false,
  error: null,
};

//categoriesReducer
export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_CATEGORIES_START":
      return { ...state, isLoading: true };
    case "FETCH_CATEGORIES_SUCCESS":
      return { ...state, categoriesMap: payload, isLoading: false };
    case "FETCH_CATEGORIES_FAILED":
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};
