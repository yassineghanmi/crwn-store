import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cartAction";
import { selectCartItems } from "../../store/cart/cartSelector";
import "./CheckoutItem.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt="name" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div
          className="arrow"
          onClick={() => {
            dispatch(removeItemFromCart(cartItems, cartItem));
          }}
        >
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div
          className="arrow"
          onClick={() => {
            dispatch(addItemToCart(cartItems, cartItem));
          }}
        >
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div
        className="remove-button"
        onClick={() => {
          dispatch(clearItemFromCart(cartItems, cartItem));
        }}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
