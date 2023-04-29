//___________________________________________________________________________
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};
//___________________________________________________________________________

export const setIsCartOpen = (boolean) => ({
  type: "SET_IS_CART_OPEN",
  payload: boolean,
});
//___________________________________________________________________________
export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return {
    type: "SET_CART_ITEMS",
    payload: newCartItems,
  };
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return {
    type: "SET_CART_ITEMS",
    payload: newCartItems,
  };
};

export const clearItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = clearCartItem(cartItems, cartItemToRemove);
  return {
    type: "SET_CART_ITEMS",
    payload: newCartItems,
  };
};
