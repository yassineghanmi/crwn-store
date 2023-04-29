//initial state
const CART_INITIAL_STATE = {
  cartItems: [],
  cartTotal: 0,
  isCartOpen: false,
};

//cartReducer
export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_CART_ITEMS":
      return { ...state, cartItems: payload };
    case "SET_IS_CART_OPEN":
      return { ...state, isCartOpen: payload };
    default:
      return state;
  }
};
