import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import "./CategoryItem.scss";
const CategoryItem = ({ category }) => {
  const { id, title, imageUrl } = category;
  const navigate = useNavigate();

  const handleClickEvent = () => {
    navigate({
      pathname: "shop",
      search: createSearchParams({
        title
      }).toString(),
    });
  };
  return (
    <div
      className="category-container"
      onClick={() => {
        handleClickEvent();
      }}
    >
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
