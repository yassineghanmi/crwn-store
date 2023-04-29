import React from "react";
import "./CartIcon.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cartAction";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cartSelector";

const CartIcon = ({ iconRef }) => {
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();
  return (
    <div
      className="cart-icon-container"
      onClick={() => {
        dispatch(setIsCartOpen(!isCartOpen));
      }}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
