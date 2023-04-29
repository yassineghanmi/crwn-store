import React, { useContext } from "react";
import "./CartDropdown.scss";
import Button from "../button/Button";
import CartItem from "../cart-item/CartItem";
//import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cartSelector";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigation = useNavigate();
  const goToCheckoutHandler = () => {
    navigation("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>GO TO CHEKOUT</Button>
    </div>
  );
};

export default CartDropdown;
