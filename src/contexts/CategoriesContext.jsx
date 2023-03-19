import React, { createContext, useEffect, useState } from "react";

//import SHOP_DATA from "../shop-data";
import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/Firebase.utils";

export const CategoriesContext = createContext({
  categories: [],
});

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState({});
  useEffect(() => {
    //run it just for one time to add articles to the database
    //addCollectionAndDocuments("categories", SHOP_DATA);

    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategories(categoryMap);
    };
    getCategoriesMap();
  }, []);
  const value = { categories };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
