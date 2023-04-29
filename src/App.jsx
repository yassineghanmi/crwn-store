import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import "./App.scss";
import Navigation from "./routes/navigation/Navigation";
import Authentication from "./routes/Authentication/Authentication";
import Shop from "./routes/shop/Shop";
import Checkout from "./routes/checkout/Checkout";
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  onAuthStateChangedListener,
} from "./utils/firebase/Firebase.utils";
import { checkUserSession } from "./store/user/userAction";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;

//run it just for one time to add articles to the database inside useEffect
//addCollectionAndDocuments("categories", SHOP_DATA);
