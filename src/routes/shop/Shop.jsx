import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/product-card/ProductCard";

import "./Shop.scss";
import { fetchCategoriesStart } from "../../store/categories/categoriesAction";
import Loader from "../../components/loader/Loader";

const Shop = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categoriesMap);
  const [searchParams] = useSearchParams();
  let searchParam = searchParams.get("title");
  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);
  const isLoading = useSelector((state) => state.categories.isLoading);

  return (
    <Fragment>
      {searchParam == null ? (
        isLoading ? (
          <Loader />
        ) : (
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
        )
      ) : (
        <Fragment>
          <h2>{searchParam.charAt(0).toUpperCase() + searchParam.slice(1)}</h2>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="products-container">
              {categories[searchParam]?.map(
                (cat) => cat && <ProductCard product={cat} key={cat.id} />
              )}
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Shop;
