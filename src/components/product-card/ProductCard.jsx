import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import Button from "../button/Button";
import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const { imageUrl, name, price } = product;
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType={"inverted"} onClick={() => addItemToCart(product)}>
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
