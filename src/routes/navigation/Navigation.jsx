import React, { createContext, useContext, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/CartDropdown";
import CartIcon from "../../components/cart-icon/CartIcon";
import { UserContext } from "../../contexts/UserContext";
import { CartContext } from "../../contexts/CartContext";
import { SignOutUser } from "../../utils/firebase/Firebase.utils";

import "./Navigation.scss";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  const onSignOut = async () => {
    await SignOutUser();
    setCurrentUser(null);
  };
  const iconRef = useRef();
  return (
    <div>
      <div className="navigation">
        <Link className="logo-container" to={"/"}>
          <Logo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to={"/shop"}>
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" to={"/auth"} onClick={onSignOut}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to={"/auth"}>
              SIGN IN
            </Link>
          )}
          <CartIcon iconRef={iconRef} />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
