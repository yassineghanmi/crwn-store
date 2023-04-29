import React, { useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/CartDropdown";
import CartIcon from "../../components/cart-icon/CartIcon";
import { SignOutUser } from "../../utils/firebase/Firebase.utils";
import "./Navigation.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../store/user/userAction";
import { setIsCartOpen } from "../../store/cart/cartAction";
import { selectIsCartOpen } from "../../store/cart/cartSelector";

const Navigation = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const onSignOut = async () => {
    await SignOutUser();
    dispatch(setCurrentUser(null));
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
