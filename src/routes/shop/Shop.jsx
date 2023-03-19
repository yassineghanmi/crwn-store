import React, { Fragment, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/product-card/ProductCard";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import "./Shop.scss";

const Shop = () => {
  const { categories } = useContext(CategoriesContext);
  const [searchParams] = useSearchParams();
  let searchParam = searchParams.get("title");

  return (
    <Fragment>
      {searchParam == null ? (
        <Fragment>
          {Object.keys(categories).map((title) => (
            <Fragment key={title}>
              <h2>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
              <div className="products-container">
                {categories[title].map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </Fragment>
          ))}
        </Fragment>
      ) : (
        <Fragment>
          <h2>{searchParam.charAt(0).toUpperCase() + searchParam.slice(1)}</h2>
          <div className="products-container">
            {categories[searchParam]?.map(
              (cat) => cat && <ProductCard product={cat} key={cat.id} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Shop;
