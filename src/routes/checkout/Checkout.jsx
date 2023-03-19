import React, { useContext, useEffect, useState } from "react";
import CheckoutItem from "../../components/checkout-item/CheckoutItem";
import { CartContext } from "../../contexts/CartContext";
import "./Checkout.scss";

const Checkout = () => {
  const { cartItems, total } = useContext(CartContext);

  console.log(total);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
      })}
      {cartItems.length !== 0 && <span className="total">Total: {total}</span>}
    </div>
  );
};

export default Checkout;
