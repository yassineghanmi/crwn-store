import React, { useContext } from "react";
import "./CartIcon.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/CartContext";

const CartIcon = ({ iconRef }) => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  return (
    <div
      className="cart-icon-container"
      onClick={() => {
        setIsCartOpen((prevState) => !prevState);
      }}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartItems.length}</span>
    </div>
  );
};

export default CartIcon;
