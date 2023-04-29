import { getCategoriesAndDocuments } from "../../utils/firebase/Firebase.utils";

//categoriesAction
export const fetchCategoriesStart = () => ({
  type: "FETCH_CATEGORIES_START",
});
export const fetchCategoriesSuccess = (categoriesMap) => ({
  type: "FETCH_CATEGORIES_SUCCESS",
  payload: categoriesMap,
});
export const fetchCategoriesFailed = (error) => ({
  type: "FETCH_CATEGORIES_FAILED",
  payload: error,
});



//middleware using redux thunk easy to understand
export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());

  try {
    const categoriesArray = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categoriesArray));
  } catch (err) {
    dispatch(fetchCategoriesFailed(err));
  }
};
