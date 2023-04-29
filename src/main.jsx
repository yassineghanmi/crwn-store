import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import CartProvider from "./contexts/CartContext";
import CategoriesProvider from "./contexts/CategoriesContext";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        {/*<UserProvider>
      <CategoriesProvider>
      <CartProvider>
      */}
        <App />
        {/*
      </CartProvider>
      </CategoriesProvider>
      </UserProvider>*/}
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

{
  /*
<React.StrictMode>
</React.StrictMode>*/
}
