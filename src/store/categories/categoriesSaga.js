import { all, call, put, takeLatest } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/Firebase.utils";
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./categoriesAction";

export function* fetchCategoriesAsync() {
  try {
    const categoriesMap = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(categoriesMap));
  } catch (err) {
    yield put(fetchCategoriesFailed(err));
  }
}

export function* onFetchCategories() {
  yield takeLatest("FETCH_CATEGORIES_START", fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
